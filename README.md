# Next.js Starter Template

A modern, customizable Next.js starter template designed for quick project setup. Built with Next.js 16, React 19, Tailwind CSS v4, and TypeScript.

## Quick Start

### 1. Copy this template

**Option A: Use GitHub's template feature (Recommended)**
1. Click the green "Use this template" button at the top of this repo
2. Name your new repository
3. Clone your new repo: `git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git`

**Option B: Clone directly**
```bash
git clone https://github.com/ORIGINAL_REPO_URL.git my-project
cd my-project
rm -rf .git
git init
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your values (see [Environment Variables](#environment-variables) below).

### 4. Customize your site

Open `site.config.ts` and update the values:

```typescript
const siteConfig = {
  name: "My Awesome Site",        // Your site name
  tagline: "Building something amazing",
  description: "A modern website built with Next.js",

  colors: {
    primary: "#3b82f6",           // Your brand color
    // ... more colors
  },

  cta: {
    primaryText: "Get Started",   // Button text
    primaryLink: "#",             // Button link
    // ...
  },

  // ... social links, features, footer
};
```

### 5. Start developing

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

---

## Customization Guide

### Changing Colors

Edit the `colors` section in `site.config.ts`:

```typescript
colors: {
  primary: "#3b82f6",      // Main brand color (buttons, links)
  secondary: "#8b5cf6",    // Secondary accent color
  background: "#ffffff",   // Light mode background
  foreground: "#171717",   // Light mode text
  backgroundDark: "#0a0a0a", // Dark mode background
  foregroundDark: "#ededed",  // Dark mode text
},
```

**Finding colors:**
- [Tailwind Colors](https://tailwindcss.com/docs/customizing-colors) - Pre-made color palettes
- [Coolors](https://coolors.co/) - Generate color schemes
- [Realtime Colors](https://www.realtimecolors.com/) - Preview colors on a website

### Adding Social Links

Edit the `social` section in `site.config.ts`:

```typescript
social: {
  youtube: "https://youtube.com/@yourhandle",
  twitter: "https://twitter.com/yourhandle",
  github: "https://github.com/yourrepo",
  linkedin: "https://linkedin.com/in/yourprofile",
  instagram: "https://instagram.com/yourhandle",
},
```

Leave any field empty (`""`) to hide that icon.

### Changing CTA Buttons

Edit the `cta` section in `site.config.ts`:

```typescript
cta: {
  primaryText: "Sign Up Free",
  primaryLink: "/signup",
  secondaryText: "Watch Demo",
  secondaryLink: "/demo",
},
```

### Editing Features

Add, remove, or modify features in `site.config.ts`:

```typescript
features: [
  {
    title: "Feature One",
    description: "Description of feature one.",
  },
  {
    title: "Feature Two",
    description: "Description of feature two.",
  },
  // Add more or set to [] to hide the section
],
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Your production URL |
| `NEXT_PUBLIC_SUPABASE_URL` | No | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Supabase anonymous key |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics ID |

---

## Project Structure

```
├── site.config.ts      # Main customization file
├── .env.example        # Environment variable template
├── src/
│   ├── app/
│   │   ├── page.tsx          # Landing page
│   │   ├── layout.tsx        # Root layout (includes header)
│   │   ├── globals.css       # Global styles
│   │   ├── (auth)/           # Authentication pages
│   │   │   ├── login/        # /login
│   │   │   ├── signup/       # /signup
│   │   │   └── forgot-password/ # /forgot-password
│   │   └── auth/callback/    # Supabase auth callback
│   ├── components/
│   │   ├── Header.tsx        # Navigation header
│   │   └── AuthMessage.tsx   # Auth error/success messages
│   └── lib/supabase/         # Supabase client utilities
├── public/             # Static assets (images, favicon)
└── package.json        # Dependencies
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy

### Other Platforms

This template works with any platform that supports Next.js:
- [Netlify](https://docs.netlify.com/frameworks/next-js/)
- [Railway](https://railway.app)
- [Render](https://render.com)
- [AWS Amplify](https://aws.amazon.com/amplify/)

---

## Authentication (Supabase)

This template includes pre-built authentication pages:

- `/login` - Sign in page
- `/signup` - Create account page
- `/forgot-password` - Password reset page

### Setting Up Supabase Auth

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Settings > API** and copy your credentials
3. Add them to your `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. In Supabase Dashboard, go to **Authentication > URL Configuration** and add:
   - Site URL: `http://localhost:3000` (dev) or your production URL
   - Redirect URLs: `http://localhost:3000/auth/callback`

The auth pages automatically use your brand colors from `site.config.ts`.

---

## Adding New Pages

Create a new file in `src/app/`:

```
src/app/about/page.tsx    → /about
src/app/contact/page.tsx  → /contact
src/app/blog/page.tsx     → /blog
```

Example page:

```tsx
export default function AboutPage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">About Us</h1>
      <p className="mt-4">Your content here...</p>
    </main>
  );
}
```

---

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Fonts:** [Geist](https://vercel.com/font)
- **Database (optional):** [Supabase](https://supabase.com/)

---

## Need Help?

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

---

## License

MIT License - feel free to use this template for any project.
