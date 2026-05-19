# 🌐 Struders Marketing Co. — Official Website

<div align="center">

![Struders Marketing Co.](https://img.shields.io/badge/Struders-Marketing%20Co.-gold?style=for-the-badge&labelColor=0a0a0a)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=0a0a0a)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white&labelColor=0a0a0a)
![Three.js](https://img.shields.io/badge/Three.js-0.184-white?style=for-the-badge&logo=three.js&logoColor=white&labelColor=0a0a0a)
![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=white&labelColor=0a0a0a)
![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge&labelColor=0a0a0a)

**A cinematic, immersive, luxury digital marketing agency website built with cutting-edge web technologies.**

[Live Site](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Pages & Features](#-pages--features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
  - [Building for Production](#building-for-production)
- [Component Overview](#-component-overview)
- [Design System](#-design-system)
- [Performance](#-performance)
- [Scripts](#-scripts)
- [License](#-license)

---

## 🎯 About The Project

**Struders Marketing Co.** is a high-end digital marketing agency website crafted for a premium brand experience. The site is designed with a cinematic dark-gold aesthetic, featuring immersive scroll-based animations, 3D WebGL scenes, smooth page transitions, and a luxury design language that sets the brand apart.

The project is a **multi-page React application** built with Vite, offering blazing-fast development and optimized production bundles. Every component is engineered for performance, visual fidelity, and seamless user experience.

### Key Highlights

- 🎬 **Cinematic Scroll Animations** powered by GSAP ScrollTrigger
- 🌌 **3D WebGL Backgrounds** using Three.js and React Three Fiber
- 🚀 **Smooth Page Transitions** with GSAP timeline animations
- 📜 **Industry-Standard Smooth Scrolling** via Lenis
- 🎨 **Luxury Dark-Gold Design System** with custom CSS variables
- ⚡ **Lightning-Fast Performance** with Vite and code-splitting
- 📱 **Fully Responsive** across all device sizes
- 🤖 **AI Chatbot Integration** (Dialogflow ALLIE)
- 📧 **Functional Contact Form** via EmailJS

---

## 📄 Pages & Features

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Hero, Brand Strip, Stats, Featured Work, and more |
| **About** | `/about` | Agency story, team, philosophy & immersive 3D scene |
| **Services** | `/services` | Brand Strategy, Digital Marketing, Video Production |
| **Work** | `/work` | Portfolio showcase with case studies |
| **Process** | `/process` | Step-by-step workflow with animated timeline |
| **Contact** | `/contact` | Contact form, addresses, and social links |

---

## 🛠️ Tech Stack

### Core Framework
| Technology | Version | Purpose |
|-----------|---------|---------|
| [React](https://react.dev/) | 19.x | UI component library |
| [Vite](https://vitejs.dev/) | 8.x | Build tool & dev server |
| [React Router DOM](https://reactrouter.com/) | 7.x | Client-side routing |

### 3D & Animation
| Technology | Version | Purpose |
|-----------|---------|---------|
| [Three.js](https://threejs.org/) | 0.184 | 3D WebGL rendering |
| [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | 9.x | React renderer for Three.js |
| [React Three Drei](https://github.com/pmndrs/drei) | 10.x | Three.js helpers & abstractions |
| [GSAP](https://gsap.com/) | 3.15 | Professional-grade animations |
| [Lenis](https://lenis.darkroom.engineering/) | 1.3.x | Smooth scroll library |

### Styling
| Technology | Version | Purpose |
|-----------|---------|---------|
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Utility-first CSS framework |
| Custom CSS | — | Global design tokens & animations |

### Dev Tools
| Technology | Purpose |
|-----------|---------|
| ESLint | Code linting & quality |
| React Hooks Plugin | Hooks rule enforcement |
| React Refresh Plugin | Fast HMR in development |

---

## 📁 Project Structure

```
struderswebdev/
│
├── 📂 public/                   # Static assets served directly
│
├── 📂 src/
│   ├── 📂 assets/               # Images, fonts, and media files
│   │
│   ├── 📂 components/           # Reusable UI components
│   │   ├── About.jsx            # About section component
│   │   ├── BrandStrategy.jsx    # Brand strategy service section
│   │   ├── BrandStrip.jsx       # Scrolling brand ticker strip
│   │   ├── Contact.jsx          # Contact form & info component
│   │   ├── DigitalMarketing.jsx # Digital marketing service section
│   │   ├── FeaturedWork.jsx     # Portfolio/work showcase section
│   │   ├── Footer.jsx           # Global site footer
│   │   ├── Hero.jsx             # Hero landing section with 3D canvas
│   │   ├── Loader.jsx           # Initial page loading animation
│   │   ├── Navbar.jsx           # Global navigation bar
│   │   ├── PageTransition.jsx   # GSAP page transition wrapper
│   │   ├── Services.jsx         # Services overview section
│   │   ├── Stats.jsx            # Animated statistics counters
│   │   ├── VideoProduction.jsx  # Video production service section
│   │   └── VideoScrollScene.jsx # GSAP scroll-driven video scene
│   │
│   ├── 📂 pages/                # Full page-level components (routes)
│   │   ├── AboutPage.jsx        # /about route
│   │   ├── ContactPage.jsx      # /contact route
│   │   ├── HomePage.jsx         # / (root) route
│   │   ├── ProcessPage.jsx      # /process route
│   │   ├── ServicesPage.jsx     # /services route
│   │   └── WorkPage.jsx         # /work route
│   │
│   ├── App.jsx                  # Root app component & router setup
│   ├── index.css                # Global styles & design tokens
│   └── main.jsx                 # React DOM entry point
│
├── .gitignore                   # Git ignore rules
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML entry point
├── LICENSE                      # Proprietary license
├── package.json                 # Project dependencies & scripts
├── README.md                    # This file
└── vite.config.js               # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** `>=18.0.0` — [Download here](https://nodejs.org/)
- **npm** `>=9.0.0` (comes with Node.js)
- **Git** — [Download here](https://git-scm.com/)

Verify your installations:
```bash
node --version
npm --version
git --version
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/priyanshupriyesh6/strudersmarketingco.git
   cd strudersmarketingco
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup** *(if applicable)*

   If the project uses environment variables (e.g., for EmailJS), create a `.env` file at the root:
   ```env
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   ```

### Running Locally

Start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The site will be available at **`http://localhost:5173`** by default.

### Building for Production

Compile and optimize the project for production deployment:

```bash
npm run build
```

Output will be in the `dist/` directory.

**Preview the production build locally:**
```bash
npm run preview
```

---

## 🧩 Component Overview

### `Navbar.jsx`
Global navigation bar with smooth scroll links, mobile hamburger menu, and active route detection via React Router.

### `Hero.jsx`
The main landing section featuring a full-screen 3D WebGL canvas background (via Three.js/React Three Fiber), animated headline text, and a cinematic entrance sequence.

### `Loader.jsx`
A full-screen loading overlay that plays on initial site load, ensuring all assets (3D scenes, fonts, images) are ready before revealing the interface.

### `PageTransition.jsx`
A GSAP-powered transition wrapper applied to every page route change, providing a premium cinematic wipe or fade effect between navigation events.

### `VideoScrollScene.jsx`
A GSAP `ScrollTrigger`-driven component that synchronizes a video or canvas scene with the user's scroll position, creating an immersive scrollytelling experience.

### `BrandStrip.jsx`
An infinitely looping horizontal ticker that displays brand names or client logos using CSS animation.

### `Stats.jsx`
Animated number counters that trigger when scrolled into view, showcasing key agency metrics.

### `FeaturedWork.jsx`
A curated portfolio grid/showcase section with hover animations and project detail reveals.

### `Services.jsx`, `BrandStrategy.jsx`, `DigitalMarketing.jsx`, `VideoProduction.jsx`
Dedicated service breakdown components with rich layouts, scroll animations, and detailed descriptions of each offering.

### `Footer.jsx`
A comprehensive footer containing navigation links, social media icons, contact info, and legal notices.

---

## 🎨 Design System

The project uses a custom design system defined in `src/index.css` through CSS custom properties (variables):

| Token | Value | Usage |
|-------|-------|-------|
| `--color-gold` | `#C9A84C` (approx.) | Primary accent / CTA |
| `--color-bg` | `#0a0a0a` | Page background |
| `--color-text` | `#f5f5f5` | Primary text |
| `--font-primary` | Inter / custom | Headings & body |
| `--transition-smooth` | `cubic-bezier(...)` | All transitions |

The aesthetic is **dark luxury** — black backgrounds with gold accents, fine typography, subtle grain texture, and precise spacing to evoke a high-end agency feel.

---

## ⚡ Performance

- **Vite** provides near-instant dev server startup and optimized chunking
- **Code splitting** via React Router ensures only the current page's JS is loaded
- **Three.js scenes** are lazy-rendered and paused when off-screen
- **GSAP ScrollTrigger** uses `requestAnimationFrame` for 60fps animations
- **Lenis** replaces native scroll for buttery smooth, GPU-accelerated scrolling
- **Images** should be served in modern formats (WebP/AVIF) from `public/`

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## 📄 License

This project is proprietary software. All rights reserved.

See the [LICENSE](./LICENSE) file for full details.

---

<div align="center">

**© 2025 Struders Marketing Co. All Rights Reserved.**

*Built with passion, precision, and a lot of ☕*

</div>
