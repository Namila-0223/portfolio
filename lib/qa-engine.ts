// // /lib/qa-engine.ts
// import { QA_DATA, QAItem } from "@/data/qa";

// /**
//  * Find best topic-based match for a query.
//  * Returns QAItem or null.
//  */
// export function findTopicMatch(query: string): QAItem | null {
//   if (!query || !query.trim()) return null;
//   const q = query.toLowerCase();

//   let best: { item: QAItem | null; score: number } = { item: null, score: 0 };

//   for (const item of QA_DATA) {
//     let score = 0;

//     // exact topic match
//     if (item.topic.toLowerCase() === q) score += 40;

//     // keywords
//     for (const kw of item.keywords) {
//       const k = kw.toLowerCase();
//       if (q.includes(k)) score += 30;        // contains keyword
//       else if (k.startsWith(q) || q.startsWith(k)) score += 12; // partial start match
//       else if (k.includes(q) || q.includes(k)) score += 6;     // fuzzy
//     }

//     // small boost if query words appear in answer
//     if (item.answer.toLowerCase().includes(q)) score += 4;

//     if (score > best.score) best = { item, score };
//   }

//   // threshold prevents weak matches
//   return best.score >= 20 ? best.item : null;
// }

// /**
//  * Suggestions while typing (topic names)
//  */
// export function getTopicSuggestions(query: string, limit = 6) {
//   const q = (query || "").toLowerCase().trim();
//   if (!q) {
//     return QA_DATA.slice(0, limit).map((i) => ({ id: i.id, text: i.topic, topic: i.topic }));
//   }

//   const scored = QA_DATA.map((item) => {
//     let score = 0;
//     if (item.topic.toLowerCase().startsWith(q)) score += 30;
//     if (item.topic.toLowerCase().includes(q)) score += 12;
//     for (const kw of item.keywords) {
//       const k = kw.toLowerCase();
//       if (k.startsWith(q)) score += 10;
//       if (k.includes(q)) score += 5;
//       if (q.includes(k)) score += 20;
//     }
//     return { item, score };
//   })
//     .filter((s) => s.score > 0)
//     .sort((a, b) => b.score - a.score)
//     .slice(0, limit)
//     .map((s) => ({ id: s.item.id, text: s.item.topic, topic: s.item.topic }));

//   return scored;
// }

// /lib/qa-engine.ts
// import { QA_DATA, QAItem } from "@/data/qa";

// /* small stopword set */
// const STOPWORDS = new Set([
//   "i","me","my","we","our","you","your","he","she","it","they","them",
//   "the","a","an","and","or","but","if","is","are","was","were","be","been","to","of","in","on","for","with","as","at","by","from","about","that","this","what","which","when","where","who","why","how"
// ]);

// function tokenize(text: string) {
//   return text
//     .toLowerCase()
//     .replace(/[^\w\s]/g, " ")
//     .split(/\s+/)
//     .map(t => t.trim())
//     .filter(Boolean)
//     .filter(t => !STOPWORDS.has(t));
// }

// export function findTopicMatch(query: string): QAItem | null {
//   if (!query || !query.trim()) return null;
//   const tokens = tokenize(query);
//   if (tokens.length === 0) return null;

//   let best = { item: null as QAItem | null, score: 0 };

//   for (const item of QA_DATA) {
//     let score = 0;
//     const topic = item.topic.toLowerCase();
//     for (const t of tokens) {
//       if (topic === t) score += 30;
//       if (topic.startsWith(t)) score += 10;
//       if (topic.includes(t)) score += 6;
//     }
//     for (const kw of item.keywords) {
//       const k = kw.toLowerCase();
//       for (const t of tokens) {
//         if (k === t) score += 40;
//         else if (k.startsWith(t) || t.startsWith(k)) score += 18;
//         else if (k.includes(t) || t.includes(k)) score += 8;
//       }
//     }
//     const answerLower = item.answer.toLowerCase();
//     for (const t of tokens) {
//       if (answerLower.includes(t)) score += 3;
//     }
//     if (score > best.score) best = { item, score };
//   }

//   return best.score >= 20 ? best.item : null;
// }

// export function getTopicSuggestions(query: string, limit = 6) {
//   const q = (query || "").trim().toLowerCase();
//   if (!q) return QA_DATA.slice(0, limit).map(i => ({ id: i.id, text: i.topic }));

//   const tokens = tokenize(q);
//   if (tokens.length === 0) return QA_DATA.slice(0, limit).map(i => ({ id: i.id, text: i.topic }));

//   const scored = QA_DATA.map(item => {
//     let score = 0;
//     const topic = item.topic.toLowerCase();
//     if (topic.includes(q)) score += 6;
//     for (const t of tokens) {
//       if (topic === t) score += 20;
//       if (topic.startsWith(t)) score += 10;
//       if (topic.includes(t)) score += 6;
//     }
//     for (const kw of item.keywords) {
//       const k = kw.toLowerCase();
//       for (const t of tokens) {
//         if (k === t) score += 50;
//         else if (k.startsWith(t) || t.startsWith(k)) score += 20;
//         else if (k.includes(t) || t.includes(k)) score += 8;
//       }
//     }
//     return { item, score };
//   });

//   const results = scored
//     .filter(s => s.score > 0)
//     .sort((a, b) => b.score - a.score)
//     .slice(0, limit)
//     .map(s => ({ id: s.item.id, text: s.item.topic }));

//   if (results.length === 0) return QA_DATA.slice(0, limit).map(i => ({ id: i.id, text: i.topic }));
//   return results;
// }


// lib/qa-engine.ts
import { QA_DATA, QAItem } from "@/data/qa";

const STOPWORDS = new Set(["i","me","my","we","our","you","your","he","she","it","they","them","the","a","an","and","or","but","if","is","are","was","were","be","been","to","of","in","on","for","with","as","at","by","from","about","that","this","what","which","when","where","who","whom","why","how"]);

function tokenize(text: string) {
  return text.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).map(t => t.trim()).filter(Boolean).filter(t => !STOPWORDS.has(t));
}

export function findTopicMatch(query: string): QAItem | null {
  if (!query || !query.trim()) return null;
  const tokens = tokenize(query);
  if (tokens.length === 0) return null;
  let best = { item: null as QAItem | null, score: 0 };
  for (const item of QA_DATA) {
    let score = 0;
    const topic = item.topic.toLowerCase();
    for (const t of tokens) {
      if (topic === t) score += 30;
      if (topic.startsWith(t)) score += 10;
      if (topic.includes(t)) score += 6;
    }
    for (const kw of item.keywords) {
      const k = kw.toLowerCase();
      for (const t of tokens) {
        if (k === t) score += 40;
        else if (k.startsWith(t) || t.startsWith(k)) score += 18;
        else if (k.includes(t) || t.includes(k)) score += 8;
      }
    }
    const answerLower = item.answer.toLowerCase();
    for (const t of tokens) if (answerLower.includes(t)) score += 3;
    if (score > best.score) best = { item, score };
  }
  return best.score >= 20 ? best.item : null;
}

export function getTopicSuggestions(query: string, limit = 6) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return QA_DATA.slice(0, limit).map(i => ({ id: i.id, text: i.topic }));
  const tokens = tokenize(q);
  if (tokens.length === 0) return QA_DATA.slice(0, limit).map(i => ({ id: i.id, text: i.topic }));
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
  const results = scored.filter(s => s.score > 0).sort((a,b) => b.score - a.score).slice(0, limit).map(s => ({ id: s.item.id, text: s.item.topic }));
  if (results.length === 0) return QA_DATA.slice(0, limit).map(i => ({ id: i.id, text: i.topic }));
  return results;
}
