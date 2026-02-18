# Spider-Man Themed Portfolio Template

A premium, cinematic portfolio template with Spider-Man/Spiderverse inspiration. Built with modern web technologies and designed for creative developers and designers.

## 🎨 Features

### Design & Theme
- **Dark, premium aesthetic** with deep reds, electric blues, and neon accents
- **Glassmorphism elements** with backdrop blur effects
- **Web patterns & halftone textures** for comic-inspired visual flair
- **Diagonal panels & asymmetric layouts** for modern, dynamic sections
- **Professional Spider-Man inspiration** - not childish, high-end creative portfolio

### Animations & Interactions
- **Framer Motion powered** smooth, spring-based animations
- **Scroll-triggered reveals** with staggered section appearances
- **Parallax backgrounds** with subtle movement
- **Advanced hover effects**:
  - Card tilt & scale
  - Glowing borders & shadows
  - Animated web-line underlines
  - Button ripple/pulse effects
- **Text animations**: letter-by-letter reveals, word stagger, glitch effects
- **Reduced-motion support** for accessibility

### Sections Included
1. **Header** - Sticky glass blur nav with active section tracking
2. **Hero** - Cinematic intro with animated stats, CTAs, and background effects
3. **About** - Identity card layout with story and trait highlights
4. **Skills** - Web-grid layout with power meter progress bars
5. **Experience** - Timeline designed as swinging web path
6. **Projects** - Filterable cards with premium modal detail view
7. **Contact** - Modern form with validation and social links
8. **Footer** - Clean footer with back-to-top button

### Technical Highlights
- ✅ **Fully responsive** - Mobile, tablet, laptop, desktop, ultra-wide optimized
- ✅ **TypeScript** - Type-safe with proper interfaces
- ✅ **Clean component structure** - Reusable, maintainable code
- ✅ **Template-based** - All content from single data file
- ✅ **Accessibility** - Keyboard navigation, focus states, ARIA support
- ✅ **Performance optimized** - Lightweight, no unnecessary libraries

## 🚀 Quick Start

### Installation

```bash
# The project is already initialized!
# Dependencies are already installed

# Start development server (already running on port 5173)
npm run dev
```

The portfolio should now be running at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
port-demo/
├── src/
│   ├── components/
│   │   ├── sections/          # Main page sections
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/                # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Modal.tsx
│   │       └── RevealText.tsx
│   ├── data/
│   │   └── profileData.ts     # 🎯 YOUR DATA GOES HERE
│   ├── utils/
│   │   └── hooks.ts           # Custom React hooks
│   ├── App.tsx                # Main app component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles + Tailwind
├── tailwind.config.js        # Tailwind configuration
├── index.html               # HTML entry
└── package.json
```

## 🎯 How to Customize with Your Data

### Step 1: Edit `src/data/profileData.ts`

This is the **ONLY** file you need to edit to personalize the portfolio. All sections pull data from here.

```typescript
export const profileData: ProfileData = {
  personal: {
    name: 'Your Name',              // ← Change this
    role: 'Your Job Title',         // ← Change this
    tagline: 'Your tagline here',   // ← Change this
    location: 'Your Location',      // ← Change this
  },
  // ... continue editing all sections
}
```

### Step 2: Update Each Section

The `profileData` object contains:

- **personal** - Name, role, tagline, location
- **hero** - Stats (projects count, years experience, clients) and CTA button text
- **about** - Your story paragraphs and trait cards
- **skills** - Categories with skill items and proficiency levels (0-100)
- **experience** - Work history with company, role, period, descriptions, tags
- **projects** - Portfolio items with descriptions, tech stack, links
- **contact** - Email, phone, social media links

### Step 3: Add Your Images (Optional)

Replace placeholder SVG icons with real images:

1. Add images to `public/` folder
2. Update `profileData.ts` with image paths:
   ```typescript
   personal: {
     avatar: '/avatar.jpg',
   }
   projects: [{
     image: '/project-1.jpg',
     // ...
   }]
   ```

### Step 4: Customize Colors (Optional)

Edit `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  spiderman: {
    red: '#E62429',           // ← Change primary red
    darkRed: '#8B0000',       // ← Change dark red
    blue: '#0066CC',          // ← Change blue
    electricBlue: '#00D9FF',  // ← Change accent blue
    dark: '#0A0A0F',          // ← Change background
    darker: '#050508',        // ← Change darker background
  },
}
```

## 🎨 Component Overview

### Reusable UI Components

#### Button / WebButton
```tsx
<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>

<WebButton variant="outline" showWeb={true}>
  With Web Effect
</WebButton>
```

#### Cards
```tsx
<Card hover glow>Content</Card>
<GlassCard tilt>Content</GlassCard>
<ProjectCard onClick={handleClick}>Content</ProjectCard>
```

#### Text Animations
```tsx
<RevealText delay={0.5}>Animated word reveal</RevealText>
<RevealLetters>Letter by letter</RevealLetters>
<GlitchText>Hover for glitch effect</GlitchText>
```

#### Modal
```tsx
<Modal isOpen={isOpen} onClose={onClose} size="lg">
  Modal content
</Modal>
```

### Custom Hooks

```tsx
// Smooth scroll to sections
const { scrollToSection } = useSmoothScroll();
scrollToSection('about');

// Track active section while scrolling
const activeSection = useActiveSection(['hero', 'about', 'skills']);

// Detect scroll direction
const direction = useScrollDirection(); // 'up' | 'down'
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Laptop**: 1024px - 1280px
- **Desktop**: 1280px - 1536px
- **Ultra-wide**: > 1536px

## ♿ Accessibility Features

- ✅ Keyboard navigation support
- ✅ Focus-visible states on all interactive elements
- ✅ Reduced-motion support (respects `prefers-reduced-motion`)
- ✅ Semantic HTML structure
- ✅ ARIA labels where appropriate
- ✅ Color contrast ratios meet WCAG standards

## 🎭 Theme Customization

### Change Fonts

Edit `src/index.css`:
```css
@import url('YOUR_GOOGLE_FONT_URL');

body {
  font-family: 'YourFont', sans-serif;
}
```

And update `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['YourFont', 'system-ui', 'sans-serif'],
  heading: ['YourHeadingFont', 'sans-serif'],
}
```

### Add More Animations

Use Framer Motion in your components:
```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Your content
</motion.div>
```

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

### Deploy to GitHub Pages
```bash
npm run build
# Push the 'dist' folder to gh-pages branch
```

## 📦 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Advanced animations
- **Lucide React** - Icon library

## 🐛 Troubleshooting

### Animations not working?
- Check browser DevTools console for errors
- Ensure Framer Motion is installed: `npm install framer-motion`

### Styles not applying?
- Make sure Tailwind CSS is properly configured
- Check that `index.css` imports are correct
- Clear browser cache and restart dev server

### TypeScript errors?
- Run `npm install` to ensure all types are installed
- Check `tsconfig.json` for correct settings

## 📝 License

This is a template - feel free to use it for your personal or commercial projects!

## 🤝 Support

Need help customizing? Common tasks:

1. **Changing colors**: Edit `tailwind.config.js` → `colors.spiderman`
2. **Adding sections**: Create new component in `sections/` and add to `App.tsx`
3. **Modifying layout**: Edit individual section components
4. **Changing animations**: Adjust Framer Motion props in components

---

**Built with ❤️ using React, TypeScript, and Framer Motion**

Ready to make it yours? Start editing `src/data/profileData.ts`! 🚀
