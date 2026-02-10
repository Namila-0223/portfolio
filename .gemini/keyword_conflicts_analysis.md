# Keyword Conflict Analysis - All Data Files

## Critical Conflicts Found

### 1. **"design process" / "design steps"**
**Conflict between:**
- `tools.ts` (ID 204): keywords: ["ux process", "ui ux", **"design process"**, "how you design"]
- `experience.ts` (ID 402): keywords: ["your workflow", "work process", "how you work", **"design process"**]
- `aboutYou.ts` (ID 10): keywords: ["your workflow", **"design approach"**]

**Solution:**
- `tools.ts` ID 204: Focus on "ux process", "ux methodology", "ux phases"
- `experience.ts` ID 402: Focus on "your workflow", "work methodology"
- `aboutYou.ts` ID 10: Keep "design approach"

---

### 2. **"design system" / "component library"**
**Conflict between:**
- `tools.ts` (ID 205): keywords: [**"design system"**, "ui kit", **"component library"**]
- `projects.ts` (ID 112): keywords: [**"design system"**, **"component library"**, "ui kit"]

**Solution:**
- `tools.ts` ID 205: "building design systems", "creating design systems", "design system workflow"
- `projects.ts` ID 112: "design system project", "design system example", "show design system"

---

### 3. **"prototyping" / "prototype"**
**Conflict between:**
- `tools.ts` (ID 212): keywords: ["prototyping tools", **"prototyping"**]
- `projects.ts` (ID 110): keywords: [**"prototype"**, "interactive prototype", **"prototyping"**]

**Solution:**
- `tools.ts` ID 212: "prototyping tools", "tools for prototyping", "prototype software"
- `projects.ts` ID 110: "show prototype", "prototype example", "prototype project"

---

### 4. **"tools" / "your tools"**
**Conflict between:**
- `tools.ts` (ID 200): keywords: [**"tools you use"**, **"your tools"**, "what tools"]
- `aboutYou.ts` (ID 17): keywords: [**"what tools you use"**, **"your tools"**]
- `experience.ts` (ID 409): keywords: [**"tools you use in workflow"**]

**Solution:**
- `tools.ts` ID 200: "what tools", "design tools", "main tools", "tools list"
- `aboutYou.ts` ID 17: Remove (redundant with tools.ts)
- `experience.ts` ID 409: "workflow tools", "tools in your process"

---

### 5. **"certifications" / "certificates"**
**Conflict between:**
- `tools.ts` (ID 217): keywords: [**"certifications"**, "design certificates"]
- `education.ts` (ID 601): keywords: [**"certifications"**, **"certificates"**, "courses"]

**Solution:**
- `tools.ts` ID 217: Remove (redundant with education.ts)
- `education.ts` ID 601: Keep all certification keywords

---

### 6. **"can you code" / "do you code"**
**Conflict between:**
- `tools.ts` (ID 219): keywords: [**"do you code"**, **"can you code"**]
- `aboutYou.ts` (ID 12): keywords: ["designer or developer", "both", "ui or frontend", "are you designer", "are you developer", **"design and code"**, **"can you code"**, **"do you code"**]

**Solution:**
- `tools.ts` ID 219: "coding languages", "programming languages", "what languages you code"
- `aboutYou.ts` ID 12: Keep "can you code", "do you code", "both designer and developer"

---

### 7. **"workflow" (Generic term appears everywhere)**
**Appears in:**
- `aboutYou.ts` (ID 10): "your workflow", "design approach"
- `experience.ts` (ID 402): "your workflow", "work process"
- `tools.ts` (ID 184): "your workflow tools"

**Solution:**
- Make each more specific to context
- `aboutYou.ts`: "workflow overview", "general workflow"
- `experience.ts`: "detailed workflow", "workflow explanation", "workflow breakdown"
- `tools.ts`: "workflow tools", "tools for workflow"

---

## Recommended Fixes by File

### `tools.ts` - Remove/Modify:
1. **ID 204** - Change "design process" → "ux methodology", "ux design phases"
2. **ID 205** - Change "design system" → "building design systems", "design system creation"
3. **ID 212** - Change "prototyping" → "prototyping tools", "tools for prototyping"
4. **ID 217** - REMOVE (duplicate of education.ts)
5. **ID 219** - Change "do you code" → "coding languages", "programming skills"

### `projects.ts` - Modify:
1. **ID 112** - Change "design system" → "design system project", "design system example"
2. **ID 110** - Change "prototype" → "prototype project", "show prototype"

### `aboutYou.ts` - Remove:
1. **ID 17** - REMOVE "tools" keywords (duplicate of tools.ts)
2. **ID 10** - Keep but make more specific

### `experience.ts` - Already Fixed ✅

### `education.ts` - Keep as is ✅

### `contact.ts` - Keep as is ✅

### `fun.ts` - Keep as is ✅

---

## Priority Actions

1. ✅ **High Priority**: Fix "design process" conflicts
2. ✅ **High Priority**: Fix "tools" conflicts  
3. ✅ **Medium Priority**: Fix "design system" conflicts
4. ✅ **Medium Priority**: Fix "prototyping" conflicts
5. ✅ **Low Priority**: Remove duplicate certifications entry
