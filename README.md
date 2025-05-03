# Partners in Biz

A modern web application for entrepreneurs to find business partners, investors, and collaborators.

## Features

- **User Profiles**: Create detailed profiles showcasing skills, experience, and business interests
- **Partner Matching**: Find potential business partners based on complementary skills and interests
- **Project Collaboration**: Create and manage business projects with multiple collaborators
- **Investor Connections**: Connect with potential investors for your business ideas
- **Messaging System**: Communicate directly with potential partners and investors
- **AI Chat Interface**: Interact with your data using natural language through various LLM providers
- **LLM Key Management**: Securely store and manage API keys for multiple LLM providers

## Technology Stack

- **Frontend**: Nuxt.js 3.17.1 (Vue.js 3.5.13)
- **Styling**: Tailwind CSS 4.1.5 with custom Neumorphic Design System
- **Authentication**: Firebase Authentication
- **Database**: Firebase Data Connect (PostgreSQL)
- **Storage**: Firebase Storage
- **AI Integration**: Support for OpenAI, Anthropic, Gemini, Ollama, and XAI
- **Security**: AES-256-GCM encryption for API keys

## Neumorphic UI

This project features a custom Neumorphic UI design system built with Tailwind CSS. Neumorphism is a design style characterized by a soft, extruded plastic look with subtle shadows and highlights.

### Available Components

- **Buttons**: Multiple variants (flat, pressed, concave, convex)
- **Cards**: Container components with neumorphic styling
- **Inputs**: Form input fields with neumorphic styling
- **Toggles**: Toggle switch components with neumorphic styling

See the [Neumorphic Components README](components/neumorphic/README.md) for detailed documentation.

## LLM Key Management

The application includes a secure system for managing API keys for various LLM providers:

### Supported Providers

- **OpenAI**: API key, organization ID, and custom base URL
- **Anthropic**: API key and custom base URL
- **Gemini**: API key and project ID
- **Ollama**: URL (no API key required)
- **XAI**: API key

### Key Storage Hierarchy

Keys can be stored at three levels with the following priority:

1. **Workspace Level**: Used when a workspace is active and the user has access
2. **Profile Level**: Used when a profile is active and no workspace key is available
3. **User Level**: Used when no workspace or profile key is available

### Security

- All API keys are encrypted using AES-256-GCM before being stored in the database
- Each key has its own initialization vector for enhanced security
- Row-level security ensures users can only access their own keys

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/PMStander/pib.git

# Navigate to the project directory
cd pib

# Install dependencies
pnpm install

# Copy the example environment file and update it with your values
cp .env.example .env

# Start development server
pnpm dev
```

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Generate static site
pnpm generate

# Preview production build
pnpm preview
```

## Project Structure

```
/
├── assets/              # Static assets (images, fonts, etc.)
│   └── css/             # CSS files including Tailwind configuration
├── components/          # Reusable Vue components
│   ├── chat/            # Chat interface components
│   ├── forms/           # Form components
│   ├── llm-keys/        # LLM key management components
│   ├── neumorphic/      # Neumorphic design system components
│   └── ui/              # Generic UI components
├── composables/         # Shared composition functions
│   ├── useAppState.ts   # Application state management
│   ├── useChat.ts       # Chat functionality
│   ├── useDataConnect.ts # Database connection
│   ├── useFirebaseAuth.ts # Authentication
│   ├── useLLMKeys.ts    # LLM key management
│   └── useVectorSearch.ts # Vector search functionality
├── dataconnect/         # Firebase Data Connect configuration
│   ├── connector/       # GraphQL operations
│   └── schema/          # Database schema
├── layouts/             # Page layouts
├── pages/               # Application pages and routes
│   ├── settings/        # Settings pages
│   └── workspaces/      # Workspace pages
├── public/              # Public static files
├── server/              # Server-side code
└── utils/               # Utility functions
    ├── encryption.ts    # Encryption utilities
    ├── llm.ts           # LLM integration utilities
    ├── nlp.ts           # Natural language processing utilities
    └── responseGenerator.ts # Response generation utilities
```

## Acknowledgments

- Neumorphic UI design inspired by [How to Create a Responsive Neumorphic UI Using TailwindCSS](https://dev.to/mbianoubradon/how-to-create-a-responsive-neumorphic-ui-using-tailwindcss-47c7)
- Built with [Nuxt.js](https://nuxt.com/docs/getting-started/introduction)
