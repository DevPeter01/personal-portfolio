# Quick Start Guide: Making This Portfolio Yours

## 🎯 5-Minute Setup

### Step 1: Open the Data File
Navigate to: `src/data/profileData.ts`

This is the ONLY file you need to edit!

### Step 2: Replace Personal Info
```typescript
personal: {
  name: 'Your Full Name',           // Line 66
  role: 'Your Job Title',           // Line 67
  tagline: 'Your catchy tagline',   // Line 68
  location: 'City, Country',        // Line 69
}
```

### Step 3: Update Hero Stats
```typescript
hero: {
  stats: {
    projects: 50,        // Your total projects
    experience: '6+ Years',  // Your experience
    clients: 40,         // Your client count
  }
}
```

### Step 4: Write Your Story
```typescript
about: {
  story: [
    'Paragraph 1: Your introduction and background',
    'Paragraph 2: Your expertise and passion',
  ]
}
```

### Step 5: Add Your Skills
```typescript
skills: [
  {
    category: 'Frontend',
    items: [
      { name: 'React', level: 95 },      // 0-100
      { name: 'Your Skill', level: 85 },
    ]
  }
]
```

### Step 6: List Your Experience
```typescript
experience: [
  {
    company: 'Company Name',
    role: 'Your Position',
    period: '2022 - Present',
    description: [
      'Achievement or responsibility 1',
      'Achievement or responsibility 2',
    ],
    tags: ['Tech1', 'Tech2', 'Tech3'],
  }
]
```

### Step 7: Showcase Your Projects
```typescript
projects: [
  {
    id: 'unique-id',
    title: 'Project Name',
    category: 'web',  // 'web' | 'ui' | 'backend' | 'all'
    shortDescription: 'One-liner description',
    fullDescription: 'Detailed description for modal',
    role: ['Your role', 'Your responsibilities'],
    technologies: ['React', 'Node.js', 'etc'],
    github: 'https://github.com/yourrepo',  // optional
    live: 'https://yourproject.com',        // optional
  }
]
```

### Step 8: Update Contact Info
```typescript
contact: {
  email: 'your@email.com',
  phone: '+1 (555) 123-4567',    // optional
  social: [
    { platform: 'GitHub', url: 'https://github.com/yourusername', icon: 'github' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: 'linkedin' },
    // Add more as needed
  ]
}
```

## 🎨 Optional Customization

### Change Colors
Edit `tailwind.config.js` (line 10-17):
```javascript
spiderman: {
  red: '#YOUR_COLOR',
  blue: '#YOUR_COLOR',
  // etc
}
```

### Add Your Photos
1. Add images to `public/` folder
2. Reference in profileData:
   ```typescript
   personal: {
     avatar: '/my-photo.jpg'
   }
   projects: [{
     image: '/project-screenshot.jpg'
   }]
   ```

### Modify Sections
- To hide a section: Remove from `App.tsx`
- To add a section: Create new component in `components/sections/`
- To reorder: Change order in `App.tsx`

## ✅ Checklist

Before deploying, make sure you've updated:
- [ ] Personal name, role, tagline
- [ ] Hero stats (projects, experience, clients)
- [ ] About story and traits
- [ ] All skill categories and levels
- [ ] Work experience entries
- [ ] Project showcase items
- [ ] Contact email and social links
- [ ] Footer text if needed

## 🚀 Deploy

```bash
npm run build
# Then deploy the 'dist' folder to your hosting service
```

Popular options:
- **Vercel**: `vercel`
- **Netlify**: Drag & drop `dist` folder
- **GitHub Pages**: Push to `gh-pages` branch

---

That's it! Your portfolio is ready to go live. 🎉

**Need help?** Check the main README.md for detailed documentation.
