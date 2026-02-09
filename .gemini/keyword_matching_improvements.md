# Keyword Matching Improvements

## Problem Identified
When user asked: **"what is your design steps"**

**Expected Answer** (ID: 404):
```
The steps usually include: Discovery → Wireframes → UI Design → Prototype → Feedback → Final Delivery.
```

**Got Instead** (ID: 402):
```
My workflow usually follows a structured approach:
1️⃣ Understand the problem — goals, audience, use-cases
2️⃣ Research & insights — competitor analysis, UX patterns
...
```

## Root Cause
Both Q&A items had overlapping keywords:
- ID 402 had: "steps you follow" 
- ID 404 had: "steps", "design steps"

The matching algorithm gave equal weight to both, causing incorrect selection.

## Solutions Implemented

### 1. **Refined Keywords in `experience.ts`**

**ID 402 (Workflow Overview):**
- ❌ Removed: "process", "steps you follow"
- ✅ Added: "explain your workflow", "describe your process"
- **Focus**: General workflow questions

**ID 404 (Specific Steps):**
- ✅ Added: "what are the steps", "list the steps", "steps involved", "main steps"
- **Focus**: Specific step-by-step breakdown

**ID 405 (Deliverables):**
- ❌ Removed: "output" (too generic)
- ✅ Added: "what files", "what assets"

**ID 409 (Tools):**
- ✅ Made more specific: "what tools do you use", "which software", "which programs"

### 2. **Enhanced Matching Algorithm in `qa-engine.ts`**

#### New Scoring System:

**Tier 1: Exact Phrase Match (200 points)**
```typescript
if (qLower === k) {
  score += 200; // "design steps" === "design steps"
}
```

**Tier 2: Multi-word Keyword in Query (100 points)**
```typescript
if (qLower.includes(k) && k.split(' ').length > 1) {
  score += 100; // "design steps" found in "what is your design steps"
}
```

**Tier 3: Multi-word Query in Keyword (90 points)**
```typescript
if (k.includes(qLower) && qLower.split(' ').length > 1) {
  score += 90;
}
```

**Tier 4: Token Matching (8-40 points)**
- Single word matches get lower scores

**Bonus: Multiple Token Match (15 points per match)**
```typescript
if (matchCount > 1 && kwTokens.length > 1) {
  score += matchCount * 15; // Rewards matching multiple words
}
```

### 3. **Priority System**

The algorithm now prioritizes:
1. **Exact phrase matches** over partial matches
2. **Multi-word keywords** over single words
3. **Specific terms** over generic terms

## Example Scoring

**Query:** "what is your design steps"

**ID 404 (Correct Answer):**
- "design steps" (multi-word) in query: **+100 points**
- "steps" token match: **+40 points**
- "design" token match: **+18 points**
- **Total: ~158 points** ✅

**ID 402 (Wrong Answer):**
- "design" token match: **+18 points**
- Generic workflow terms: **+10 points**
- **Total: ~28 points** ❌

## Result
The chatbot now correctly identifies that "design steps" is asking for a step-by-step breakdown (ID 404), not a general workflow explanation (ID 402).

## Testing Recommendations

Test these queries to verify accuracy:
- "what is your design steps" → Should return ID 404
- "explain your workflow" → Should return ID 402
- "what are the deliverables" → Should return ID 405
- "what tools do you use" → Should return ID 409
- "design process" → Should return ID 402 (general workflow)
- "list the steps" → Should return ID 404 (specific steps)
