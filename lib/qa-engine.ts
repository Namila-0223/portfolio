// lib/qa-engine.ts
import { QA_DATA, QAItem } from "@/data/qa";

const STOPWORDS = new Set(["i", "me", "my", "we", "our", "you", "your", "he", "she", "it", "they", "them", "the", "a", "an", "and", "or", "but", "if", "is", "are", "was", "were", "be", "been", "to", "of", "in", "on", "for", "with", "as", "at", "by", "from", "about", "that", "this", "which", "when", "where", "who", "whom", "why"]);

// REMOVED "how", "what" from stopwords to help with questions like "How are you"
// REMOVED "where", "who" - wait, let's keep it simple. Only remove words that truly add no value.
// "Hi", "Hello" are not stopwords.

function tokenize(text: string) {
  return text.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).map(t => t.trim()).filter(Boolean).filter(t => !STOPWORDS.has(t));
}

export function findTopicMatch(query: string): QAItem | null {
  if (!query || !query.trim()) return null;

  // Normalization for exact match check
  const qLower = query.trim().toLowerCase();

  const tokens = tokenize(query);

  let best = { item: null as QAItem | null, score: 0 };

  for (const item of QA_DATA) {
    let score = 0;
    const topic = item.topic.toLowerCase();

    // 1. EXACT PHRASE MATCH IN KEYWORDS (Highest Priority)
    // If the user's full query matches a keyword phrase exactly
    for (const kw of item.keywords) {
      const k = kw.toLowerCase();
      if (qLower === k) {
        score += 200; // Highest boost for exact match
      } else if (qLower.includes(k) && k.split(' ').length > 1) {
        // Multi-word keyword found in query (e.g., "design steps" in "what are your design steps")
        score += 100;
      } else if (k.includes(qLower) && qLower.split(' ').length > 1) {
        // User's multi-word query found in keyword
        score += 90;
      }
    }

    // 2. TOKEN MATCHING (Lower priority than phrase matching)
    if (tokens.length > 0) {
      for (const t of tokens) {
        if (topic === t) score += 30;
        if (topic.startsWith(t)) score += 10;
        if (topic.includes(t)) score += 6;
      }

      for (const kw of item.keywords) {
        const k = kw.toLowerCase();
        const kwTokens = k.split(' ');

        // Boost score if multiple tokens match the same keyword
        let matchCount = 0;
        for (const t of tokens) {
          if (k === t) {
            score += 40;
            matchCount++;
          } else if (k.startsWith(t) || t.startsWith(k)) {
            score += 18;
            matchCount++;
          } else if (k.includes(t) || t.includes(k)) {
            score += 8;
            matchCount++;
          }
        }

        // Bonus for matching multiple words in a keyword phrase
        if (matchCount > 1 && kwTokens.length > 1) {
          score += matchCount * 15;
        }
      }

      const answerLower = item.answer.toLowerCase();
      for (const t of tokens) if (answerLower.includes(t)) score += 3;
    }

    if (score > best.score) best = { item, score };
  }

  // Require at least 20 score to be considered a match
  return best.score >= 20 ? best.item : null;
}

export function getTopicSuggestions(query: string, limit = 6) {
  const q = (query || "").trim().toLowerCase();
  const tokens = tokenize(q);
  // Use the first keyword as the display text for better UX and matching
  const formatSuggestion = (item: QAItem) => {
    const text = item.keywords[0];
    return { id: item.id, text: text.charAt(0).toUpperCase() + text.slice(1) };
  };

  const scored = QA_DATA.map(item => {
    let score = 0; const topic = item.topic.toLowerCase();
    if (topic.includes(q)) score += 6;
    for (const t of tokens) {
      if (topic === t) score += 20;
      if (topic.startsWith(t)) score += 10;
      if (topic.includes(t)) score += 6;
    }
    for (const kw of item.keywords) {
      const k = kw.toLowerCase();
      for (const t of tokens) {
        if (k === t) score += 50;
        else if (k.startsWith(t) || t.startsWith(k)) score += 20;
        else if (k.includes(t) || t.includes(k)) score += 8;
      }
    }
    return { item, score };
  });

  const results = scored.filter(s => s.score > 0).sort((a, b) => b.score - a.score).slice(0, limit).map(s => formatSuggestion(s.item));

  if (results.length === 0) return QA_DATA.slice(0, limit).map(i => formatSuggestion(i));

  return results;
}
