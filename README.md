# SKRadius - ISP Management Solutions Website

A modern, fully-functional website built with React showcasing SKRadius ISP management software products.

## 🎯 Project Overview

This is a **frontend-only implementation** with mock data showcasing three main products:
1. **ISP Radius** - Standard ISP Management Platform
2. **ISP Radius Premium** - Enterprise Edition
3. **ISP Radius Log Server** - Centralized Log Management

## 🎨 Design Features

- **Dark Theme**: Navy/slate background with blue & orange brand colors
- **Modern Animations**: 
  - Framer Motion for scroll-triggered animations
  - Parallax effects on hero sections
  - Smooth hover transitions and micro-interactions
  - Fade-ins, slide-ups, and scale effects
- **Responsive Design**: Fully responsive across all devices
- **Component Library**: Shadcn UI components (accordion, tabs, cards, dialogs, etc.)
- **Icons**: Lucide React (no emoji icons as per guidelines)

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/              # Shadcn UI components
│   │   ├── Layout.jsx       # Main layout with Navbar & Footer
│   │   ├── Navbar.jsx       # Navigation with dropdown menu
│   │   └── Footer.jsx       # Footer with links
│   ├── pages/
│   │   ├── Home.jsx         # Landing page with hero & products
│   │   ├── ISPRadius.jsx    # ISP Radius product page
│   │   ├── ISPRadiusPremium.jsx  # Premium product page
│   │   ├── LogServer.jsx    # Log Server product page
│   │   ├── Store.jsx        # Product listings
│   │   ├── ClientPortal.jsx # Login page
│   │   ├── Partners.jsx     # Partner logos
│   │   ├── Clients.jsx      # Client logos
│   │   ├── Docs.jsx         # Documentation
│   │   ├── Contact.jsx      # Contact form
│   │   ├── About.jsx        # About us
│   │   ├── Privacy.jsx      # Privacy policy
│   │   └── Terms.jsx        # Terms & conditions
│   ├── data/
│   │   └── mockData.js      # All mock data (products, pricing, features, FAQs)
│   └── App.js               # Main router configuration
```

## 🚀 Pages Implemented

### Public Pages
- **Home** (`/`) - Hero section, products overview, contact preview
- **Our Store** (`/store`) - All products with cards and details
- **Products** (`/products/*`)
  - ISP Radius (`/products/isp-radius`)
  - ISP Radius Premium (`/products/isp-radius-premium`)
  - ISP Radius Log Server (`/products/log-server`)
- **Our Partners** (`/partners`) - Partner logos grid
- **Our Clients** (`/clients`) - Client logos grid
- **Docs** (`/docs`) - Documentation categories
- **Contact** (`/contact`) - Contact form
- **About** (`/about`) - Company information
- **Privacy Policy** (`/privacy`) - Privacy policy with accordion
- **Terms & Conditions** (`/terms`) - Terms with accordion

### Portal
- **Client Portal** (`/client-portal`) - Login page for clients

## 🎭 Key Features

### Navigation
- Sticky navbar with scroll effects
- Dropdown menu for Products using shadcn NavigationMenu
- Mobile-responsive hamburger menu using Sheet component
- Active link highlighting

### Animations
- **Hero Section**: Parallax scrolling, fade-in effects
- **Cards**: Hover scale, border color transitions
- **Scroll Animations**: Elements fade/slide in when scrolling into view
- **Micro-interactions**: Button hover effects, icon animations

### Components Used
- **shadcn/ui**: Card, Button, Tabs, Accordion, Sheet, NavigationMenu, Badge, Input, Textarea, Label, Toast
- **framer-motion**: Animation library for smooth effects
- **lucide-react**: Modern icon library

## 📊 Mock Data

All data is stored in `/src/data/mockData.js`:
- Product information (3 products)
- Pricing plans (ISP Radius, Premium, Log Server)
- Features categorized by type (Network, Billing, User, System)
- Key features for each product
- Why choose us points
- FAQs
- Partner & client logos

## 🎨 Design Guidelines Followed

✅ **Color Scheme**: Navy background, blue & orange accents (from logo)
✅ **No dark vibrant gradients** on buttons or backgrounds
✅ **Light gradients only**: Used subtle blue/orange gradients for text
✅ **Lucide icons**: No emoji characters
✅ **Shadcn components**: For dropdowns, dialogs, accordions
✅ **Proper spacing**: 2-3x more whitespace for luxury feel
✅ **Micro-animations**: Hover states, transitions
✅ **No centered text alignment**: Natural reading flow maintained

## 🔧 Tech Stack

- **React** 19.0.0
- **React Router DOM** 7.5.1
- **Framer Motion** 12.34.3 (animations)
- **Tailwind CSS** 3.4.17 (styling)
- **Shadcn UI** (component library)
- **Lucide React** 0.507.0 (icons)
- **Axios** 1.8.4 (for future API calls)

## 🌐 Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page |
| `/products/isp-radius` | ISP Radius | Product details |
| `/products/isp-radius-premium` | ISP Radius Premium | Premium product details |
| `/products/log-server` | Log Server | Log server details |
| `/store` | Store | All products listing |
| `/client-portal` | Client Portal | Login page |
| `/partners` | Partners | Partner logos |
| `/clients` | Clients | Client logos |
| `/docs` | Documentation | Docs categories |
| `/contact` | Contact | Contact form |
| `/about` | About Us | Company info |
| `/privacy` | Privacy Policy | Privacy policy |
| `/terms` | Terms | Terms & conditions |

## 📝 Next Steps (Backend Integration)

When ready to add backend functionality:

1. **Contact Form**: Connect to email service or backend API
2. **Client Portal**: Add authentication (JWT or OAuth)
3. **Product Purchase**: Add checkout/payment integration
4. **Documentation**: Add real documentation content
5. **Partner/Client Management**: Admin panel to manage logos
6. **Search**: Add search functionality for docs/products

## 🎯 Mock Data Indicators

Currently mocked (frontend only):
- ✅ All product data
- ✅ Pricing information
- ✅ Feature lists
- ✅ FAQs
- ✅ Partner/Client logos (using initials)
- ✅ Contact form submission (shows toast only)
- ✅ Login functionality (shows toast only)

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎨 Brand Colors

- **Primary Blue**: `#0066CC`, `#1E40AF`
- **Primary Orange**: `#FF6B35`, `#FF8C42`
- **Background**: `#020617` (slate-950)
- **Cards**: `#0f172a` (slate-900)

## 📦 Dependencies

Main packages installed:
```json
{
  "framer-motion": "^12.34.3",
  "react-router-dom": "^7.5.1",
  "axios": "^1.8.4",
  "lucide-react": "^0.507.0",
  "tailwindcss": "^3.4.17"
}
```

## 🚀 Running the App

The app is already running on:
- **Frontend**: https://radius-management.preview.emergentagent.com
- **Port**: 3000 (internally)

To restart:
```bash
sudo supervisorctl restart frontend
```

## 📸 Screenshots

Check the homepage at: https://radius-management.preview.emergentagent.com

Key sections to explore:
- Hero with animated gradient text
- Products showcase with hover effects
- Detailed product pages with tabs
- Pricing cards with hover effects
- Contact preview section
- Animated scroll effects throughout

---

**Built with ❤️ using React, Framer Motion, and Shadcn UI**
