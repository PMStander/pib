# Technology Context

## Context
This document outlines the technology stack, setup, and dependencies for the "Partners in Biz" application.

## Technology Stack

### Frontend
- **Framework**: Nuxt.js 3.17.1 (Vue.js 3.5.13)
- **UI/Styling**:
  - Tailwind CSS 4.1.5
  - Neumorphic Design System (custom implementation)
- **State Management**: Vue.js Composition API
- **Routing**: Vue Router 4.5.1 (integrated with Nuxt.js)
- **Form Validation**: Zod with vee-validate integration
- **Utility Libraries**: VueUse 13.1.0
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore (via DataConnect)

### Development Tools
- **Package Manager**: pnpm
- **Build Tool**: Vite (integrated with Nuxt.js)
- **TypeScript**: For type safety and better developer experience
- **ESLint/Prettier**: For code quality and consistent formatting

## Dependencies
```json
{
  "dependencies": {
    "@nuxtjs/color-mode": "^3.5.2",
    "@nuxtjs/device": "^3.2.4",
    "@tailwindcss/vite": "^4.1.5",
    "@vueuse/core": "^13.1.0",
    "@vueuse/nuxt": "^13.1.0",
    "nuxt": "^3.17.1",
    "nuxt-icons": "^3.2.1",
    "tailwindcss": "^4.1.5",
    "vue": "^3.5.13",
    "vue-router": "^4.5.1",
    "firebase": "^10.8.0",
    "zod": "^3.22.4",
    "vee-validate": "^4.12.5",
    "@vee-validate/zod": "^4.12.5",
    "@pib/connector": "file:dataconnect-generated/js/pib-connector",
    "@firebasegen/pib-connector": "file:dataconnect-generated/js/pib-connector"
  }
}
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- pnpm package manager

### Installation
```bash
# Clone the repository
git clone [repository-url]

# Navigate to the project directory
cd partners-in-biz

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Development Commands
- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm generate`: Generate static site
- `pnpm preview`: Preview production build

## Environment Configuration
The application uses Nuxt.js environment variables for configuration:
- `.env`: Default environment variables
- `.env.development`: Development-specific variables
- `.env.production`: Production-specific variables

## Deployment
The application can be deployed using various methods:
- Static site generation with `pnpm generate`
- Server-side rendering with Node.js
- Deployment to platforms like Vercel, Netlify, or AWS

## Performance Optimization
- Server-side rendering for improved initial load and SEO
- Code splitting for optimized bundle size
- Asset optimization with Vite
- Caching strategies for improved performance

## Security Considerations
- Input validation for all user inputs using Zod
- Firebase Authentication with email verification
- Role-based access control for workspaces
- HTTPS for secure communication
- XSS and CSRF protection
- Secure password handling with Firebase Auth
- Protected routes with authentication middleware

## Last Updated
- Date: May 2, 2024
- By: Development Team
- Changes: Updated dependencies, added Firebase Authentication, and DataConnect integration details