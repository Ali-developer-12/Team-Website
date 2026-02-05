# DevOrg - Developer Organization Website

A modern, full-stack website for a verified developer organization built with Next.js 16, TypeScript, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Live Demo

**[https://team-website-sigma.vercel.app](https://team-website-sigma.vercel.app)**

## ✨ Features

### ✅ Completed

| Feature | Description |
|---------|-------------|
| **Home Page** | Hero section with gradient effects, stats, and session-aware CTAs |
| **About Page** | Team section showcasing 8 developers with portfolio links |
| **Services Page** | Company services overview with working contact button |
| **Blog** | Blog listing and detail pages |
| **Jobs** | Job listings with detail pages and application forms |
| **Developer Profiles** | Individual developer profile pages |
| **Contact Page** | Contact form with validation |
| **GitHub OAuth** | Full authentication with NextAuth.js v5 + GitHub |
| **Session Handling** | User avatar, name, and logout in navbar |
| **Dark/Light Theme** | Theme toggle with system preference detection |
| **Mobile Navigation** | Responsive hamburger menu |
| **Footer** | Navigation links and social icons |

### 🔧 Remaining (Backend Integration)

| Feature | Status |
|---------|--------|
| Database Setup | Prisma schema ready, needs migration |
| Contact Form Backend | Needs email service integration |
| Dynamic Blog Posts | Currently using placeholder data |
| Dynamic Job Listings | Currently using placeholder data |
| Admin Dashboard/CMS | Not implemented |
| Image Uploads | Not implemented |

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js v5
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **Theme:** next-themes

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Abdul-Rasheed-Talal/Team-Website.git

# Navigate to project directory
cd Team-Website

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
Team-Website/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog listing & [slug] detail
│   ├── contact/           # Contact form
│   ├── developer/         # Developer profiles [username]
│   ├── jobs/              # Job listings & [slug] detail
│   ├── join/              # Signup page
│   ├── login/             # Login page
│   ├── services/          # Services page
│   └── page.tsx           # Home page
├── components/
│   ├── layout/            # Navbar, Footer
│   ├── marketing/         # Hero, Features, Team
│   └── ui/                # Button, Input, ThemeToggle
├── lib/                   # Utilities
├── prisma/                # Database schema
└── public/                # Static assets
```

## 👥 Team

| Name | Role | Portfolio |
|------|------|-----------|
| Abdul Rasheed Talal | Full Stack Developer | [View](https://abdulrasheedtalal.netlify.app) |
| Ali Raza | Frontend Developer • PM • Co-Founder | [View](https://ali-raza-dev.netlify.app) |
| Hammad Ali | Frontend Developer | [View](http://hammad-portfolionetlifyapp.netlify.app) |
| Imran | Frontend Developer • QA Tester | [View](https://imrancit104-cmyk.github.io/My-protfolio-Latest) |
| Abdul Saboor | Frontend Developer • UI/UX Designer | [View](https://abdulsaboor-dev.netlify.app) |
| M. Arsalan | Developer | Coming Soon |
| Taimoor Shahzad | Developer | Coming Soon |
| Adil Ali | Developer | Coming Soon |

## 🌐 Free Hosting Recommendations

### Frontend (Recommended: Vercel)

| Platform | Free Tier |
|----------|-----------|
| **Vercel** ⭐ | Best for Next.js, automatic deployments, custom domains |
| Netlify | Good alternative, 100GB bandwidth/month |
| Cloudflare Pages | Unlimited bandwidth, fast CDN |

### Database (When Ready)

| Service | Free Tier |
|---------|-----------|
| **Neon** ⭐ | PostgreSQL, 0.5GB storage, always free |
| Supabase | PostgreSQL, 500MB, auth included |
| PlanetScale | MySQL, 5GB, serverless |

### Authentication

| Service | Free Tier |
|---------|-----------|
| **NextAuth.js** ⭐ | Self-hosted, free with GitHub/Google OAuth |
| Clerk | 10K MAU free |

### Email (For Contact Form)

| Service | Free Tier |
|---------|-----------|
| **Resend** ⭐ | 3,000 emails/month |
| SendGrid | 100 emails/day |

## 🚀 Deployment to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel auto-detects Next.js settings
5. Click Deploy!

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

## 📝 Environment Variables

Create a `.env` file for local development:

```env
# Database (when ready)
DATABASE_URL="postgresql://..."

# NextAuth (when ready)
AUTH_SECRET="your-secret"
AUTH_GITHUB_ID="..."
AUTH_GITHUB_SECRET="..."
```

## 📄 License

MIT License - feel free to use this project for your own purposes.

---

Built with ❤️ by the DevOrg Team
