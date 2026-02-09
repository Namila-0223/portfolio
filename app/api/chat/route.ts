import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { QA_DATA } from "@/data/qa";
import fs from "fs";
import path from "path";

const API_KEY = "AIzaSyCc_Vn2FJJNy27N4vqZgjGB4omvTXIqYXU";

export async function POST(req: NextRequest) {
    if (!API_KEY) {
        return NextResponse.json(
            { error: "API Key not configured on server" },
            { status: 500 }
        );
    }

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        // Using gemini-2.5-flash-lite as requested
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const { message } = await req.json();

        // Path to the resume Markdown
        const resumePath = path.join(process.cwd(), "public", "documents", "namila-cv.md");

        let resumeText = "";
        try {
            if (fs.existsSync(resumePath)) {
                resumeText = fs.readFileSync(resumePath, 'utf-8');
            } else {
                console.warn("Resume Markdown not found at:", resumePath);
                resumeText = "Resume details are currently unavailable.";
            }
        } catch (error) {
            console.error("Error reading resume file:", error);
            resumeText = "Error reading resume file.";
        }

        const prompt = `
          System: You are Namila Preshan, a UI/UX Designer & Frontend Developer. You are answering questions directly as yourself in a casual, friendly chat.
          
          Here is your Resume Content (Source of Truth):
          ${resumeText}
          
          Context from QA Data: ${JSON.stringify(QA_DATA.map(i => ({ t: i.topic, a: i.answer.replace(/<[^>]*>?/gm, '') })))}
          
          User Question: ${message}

          CRITICAL Instructions:
          1. **First Person ONLY**: ALWAYS respond in first person (I, my, me, mine). NEVER use third person (Namila, he, his, him).
             ❌ WRONG: "Namila's workflow is...", "He ensures...", "Namila specializes in..."
             ✅ CORRECT: "My workflow is...", "I ensure...", "I specialize in..."
          
          2. **Be CONCISE**: Keep answers SHORT and conversational (2-4 sentences max). This is a chat, not an essay.
             ❌ WRONG: Long paragraphs with nested bullet points
             ✅ CORRECT: "I handle UI/UX design, wireframing, prototyping, and frontend development. I work across the full pipeline from concept to code."
          
          3. **Natural Tone**: Talk like a real person in a casual conversation, not a formal interview.
             ❌ WRONG: "I specialize in user-centric design, which involves understanding user needs..."
             ✅ CORRECT: "I design user interfaces and build them with React/Next.js. Pretty much the full stack of UI work."
          
          4. **CRITICAL - HTML ONLY, NO MARKDOWN**: 
             The frontend renders HTML. You MUST use HTML tags, NOT Markdown.
             
             ❌ ABSOLUTELY WRONG - DO NOT USE MARKDOWN:
             "I use **Figma** and **React**"
             "Here are my skills:\n- Design\n- Development"
             
             ✅ CORRECT - USE HTML:
             "I use <b>Figma</b> and <b>React</b>"
             "Here are my skills:<br/>• Design<br/>• Development"
             
             HTML Tags You Can Use:
             - <b>text</b> for bold (NOT **text**)
             - <br/> for line breaks (NOT \n)
             - <ul><li>item</li></ul> for lists (ONLY if 3+ items)
             - NO nested lists, NO divs, NO complex formatting
          
          5. **Length Limits**:
             - Simple questions: 1-2 sentences
             - Detailed questions: 3-4 sentences max
             - Lists: Maximum 5 items
          
          6. **Unknowns**: If you don't know, say "I don't have that info right now, but feel free to ask about my projects or skills!"
          
          7. **Personality**: Be friendly, approachable, and human. Use casual language like "pretty much", "basically", "yeah".
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Split long responses into multiple messages (2-3 parts)
        const splitResponse = (text: string): string[] => {
            // If response is short (< 300 chars), return as single message
            if (text.length < 300) {
                return [text];
            }

            // If response has natural breaks (paragraphs, lists), split there
            const parts: string[] = [];

            // Try splitting by double line breaks first
            const paragraphs = text.split(/\n\n+/);

            if (paragraphs.length >= 2) {
                // Group paragraphs into 2-3 messages
                const chunkSize = Math.ceil(paragraphs.length / Math.min(3, paragraphs.length));
                for (let i = 0; i < paragraphs.length; i += chunkSize) {
                    parts.push(paragraphs.slice(i, i + chunkSize).join('\n\n').trim());
                }
            } else {
                // Split by sentences if no paragraphs
                const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
                const chunkSize = Math.ceil(sentences.length / Math.min(3, sentences.length));
                for (let i = 0; i < sentences.length; i += chunkSize) {
                    parts.push(sentences.slice(i, i + chunkSize).join(' ').trim());
                }
            }

            // Limit to max 3 parts
            return parts.slice(0, 3);
        };

        const messages = splitResponse(text);

        return NextResponse.json({
            reply: messages[0],
            additionalMessages: messages.length > 1 ? messages.slice(1) : undefined
        });

    } catch (error: any) {
        console.error("Gemini API Error:", error);

        return NextResponse.json({
            reply: "I'm having trouble connecting to my brain right now. Please check my API key configuration."
        });
    }
}
