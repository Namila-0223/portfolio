# Fix Markdown to HTML in Data Files

## Problem
Predefined answers are using Markdown syntax `**text**` for bold, but the frontend renders HTML.
Users see the asterisks instead of bold text.

## Solution
Replace all `**text**` with `<b>text</b>` in all data files.

## Files to Fix

### 1. `data/aboutYou.ts`
Lines with `**text**`:
- Line 15: `**UI/UX, interaction design, and modern frontend engineering**`
- Line 21: `**3+ years of experience**`
- Line 27: `**Sri Lanka 🇱🇰**`
- Line 39: `**minimal, functional, and aesthetic UI/UX**`
- Line 45: `**design and frontend engineering**`
- Line 51: `**clarity, subtle details, and meaningful user journeys**`
- Line 99: `**English**` and `**Sinhala**`
- Line 135: `**usability, clarity, and real user behavior**`

### 2. `data/companyRole.ts`
Lines with `**text**`:
- Line 31: `**UI/UX Designer & Frontend Developer**`
- Line 39: `**UI/UX Design**` and `**Frontend Development**`
- Line 74: `**UI/UX Designer**` and `**Frontend Developer**`

### 3. `data/education.ts`
Lines with `**text**`:
- Line 13: `**BSc (Hons) in Information Technology**` and `**2020 to 2024**`

### 4. `data/experience.ts`
Lines with `**text**`:
- Line 38: Multiple instances in workflow steps
- Line 106: `**Photoshop**`, `**Illustrator**`, `**Angular**`, `**Next.js**`, `**TypeScript**`, `**Tailwind CSS**`

## Quick Fix Command (PowerShell)

Run this in your project root to replace all instances:

```powershell
# Fix aboutYou.ts
(Get-Content "data\aboutYou.ts") -replace '\*\*([^*]+)\*\*', '<b>$1</b>' | Set-Content "data\aboutYou.ts"

# Fix companyRole.ts
(Get-Content "data\companyRole.ts") -replace '\*\*([^*]+)\*\*', '<b>$1</b>' | Set-Content "data\companyRole.ts"

# Fix education.ts
(Get-Content "data\education.ts") -replace '\*\*([^*]+)\*\*', '<b>$1</b>' | Set-Content "data\education.ts"

# Fix experience.ts
(Get-Content "data\experience.ts") -replace '\*\*([^*]+)\*\*', '<b>$1</b>' | Set-Content "data\experience.ts"
```

## Manual Fix Example

**Before:**
```typescript
answer: "I'm from **Sri Lanka 🇱🇰**, working globally..."
```

**After:**
```typescript
answer: "I'm from <b>Sri Lanka 🇱🇰</b>, working globally..."
```

## Verification

After fixing, search for `**` in all data files - there should be ZERO results!

```powershell
Select-String -Path "data\*.ts" -Pattern '\*\*'
```

If this returns nothing, you're good! ✅
