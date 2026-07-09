# Interactive Developer Portfolio

A high-fidelity, premium developer portfolio site built using **Next.js**, **Three.js (WebGL)**, and **Framer Motion**. It showcases projects using a 3D interactive card carousel and features smooth, native browser page transitions.

## 🚀 Tech Stack
- **Framework**: Next.js 14 (App Router)
- **3D Graphics**: Three.js (via custom WebGL canvas integrations)
- **Animations**: Framer Motion & CSS Transitions
- **Styling**: Tailwind CSS & Vanilla CSS
- **Typography**: Geist Sans & Anton

---

## ✨ Core Features
1. **Interactive 3D WebGL Carousel**: Displays projects on a 3D cylindrical carousel that responds to mouse dragging, trackpad scrolling, and keyboard arrow keys.
2. **Native View Transitions**: Navigates from 3D WebGL cards to dynamic 2D project detail pages by smoothly morphing the image layout across routes.
3. **Responsive Grid**: Built for all device ranges from mobile mockups to desktop displays.
4. **Scroll-triggered Revealing**: Dynamic layout entry animations triggered as elements enter the viewport.

---

## 🛠️ Recent Updates (`2026-v1` Branch)

We have restructured the project details layout and upgraded the transition pipeline to deliver an extremely polished, high-performance experience:

### 1. Visual-First 8-Section Layout
Restructured the dynamic project details page (`/works/[id]`) into a visual-first layout:
- **Hero**: Full-bleed parallax-scrolled device mockup with dynamic metadata (Role, Timeline, Industry).
- **Overview**: Under-100-words concise summary.
- **Challenge & Solution**: Clean 2-column problem/resolution split.
- **Process Snapshot**: 3-column graphic pipeline displaying User Flow, Wireframes, and Design System.
- **Final UI Showcase**: A dedicated showcase taking up 50% of the page length, displaying mockups, desk setups, and typographic styles.
- **Key Results**: Staggered cards displaying project metrics.
- **Behance CTA**: Glow-on-hover card linking to full external case studies.
- **Simple Footer Navigation**: Seamless wrap-around navigation to the next project.

### 2. High-Fidelity View Transitions
- **WebGL-to-DOM Morphing**: Integrated the native browser **View Transitions API** to seamlessly scale and morph the 3D works card directly into the details page parallax hero background.
- **Aspect Ratio Protection**: Applied `object-fit: cover` and custom scaling overrides to the transition pseudo-elements (`::view-transition-old` and `::view-transition-new`) to eliminate the "taffy" stretching distortion.
- **Zero-Lag Triggering**: Replaced React rendering queue delays with synchronous DOM injection on card clicks, initiating the transition instantly without input lag.

### 3. Route Change Synchronization
- **Navigation Lifecycle Hooking**: Intercepted route changes using a custom Promise structure in the global router. The transition callback awaits page mounting before completing, ensuring the browser captures the correct destination DOM state.
- **Entrance Animation Delaying**: Delayed header texts, back buttons, and gradient overlays to slide/fade in gently *after* the `0.75s` morph transition completes, preventing overlapping visual clutter.

### 4. Interactive Details Animations
- Added viewport-triggered entries (`whileInView`) to all details page sections so elements rise and fade in progressively as the user scrolls.
- Combined the hero image and gradient shadow overlay into a single view transition container, so they animate together as a unified visual layer.

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```
