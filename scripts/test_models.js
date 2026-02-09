const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = "AIzaSyCc_Vn2FJJNy27N4vqZgjGB4omvTXIqYXU";

async function listModels() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    try {
        // Note: listing models is not directly exposed mainly on the helper, but we can try a direct fetch or try a known model.
        // Actually the SDK doesn't have listModels on the instance easily.
        // We will just try to generate content with 'gemini-1.5-flash' and print exact error.
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
        const result = await model.generateContent("Hello");
        console.log(result.response.text());
    } catch (error) {
        console.error("Error with gemini-3-flash-preview:", error.message);

        try {
            const model2 = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result2 = await model2.generateContent("Hello");
            console.log("gemini-pro worked:", result2.response.text());
        } catch (e) {
            console.error("Error with gemini-pro:", e.message);
        }
    }
}

listModels();
