# EMU - AI Marketing Strategy Engine

Transform your Product Requirements Document (PRD) into a comprehensive, actionable marketing strategy powered by AI.

## Overview

EMU is a web application that analyzes PRDs using AI to generate:
- In-depth product analysis with market positioning
- Data-driven channel recommendations based on the Traction framework
- Complete go-to-market strategies with actionable tactics

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, OpenAI API
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: Zustand

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- OpenAI API key

## Setup

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd emu-app
   npm install
   ```

2. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the database schema from `lib/database-schema.sql`

3. **Configure environment variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   OPENAI_API_KEY=your-openai-api-key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## Features

- 🔐 User authentication with Supabase
- 📄 PRD upload and analysis (supports up to 60 pages)
- 🤖 AI-powered strategy generation using OpenAI GPT-4
- 📊 Comprehensive analysis including target audience, positioning, and constraints
- 🎯 19 traction channel recommendations with fit scores
- 📅 6-month implementation plan with budget allocation
- 💾 Save and manage multiple strategies
- 📋 Export strategies as Markdown

## Project Structure

```
emu-app/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Protected dashboard pages
│   └── (auth)/           # Authentication pages
├── components/            # React components
├── lib/                   # Utility functions and configurations
├── types/                 # TypeScript type definitions
└── public/               # Static assets
```

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Run linting
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.
