# EMU - GTM Blueprint Generator

**Product Name:** GTM Blueprint Generator (Working Title: "Marketing Map")  
**Version:** 2.0 (MVP)  
**Product Type:** AI-Powered SaaS Platform  
**Status:** Updated for "Continuous Copilot" Vision

## Overview

The GTM Blueprint Generator is an AI-powered strategic copilot that transforms go-to-market strategy from a static, one-time document into a **living, evolving marketing map**.

Our mission is to be the indispensable strategic partner for a new generation of builders, founders, and marketers. By leveraging an interactive "map" interface and a collaborative AI, we guide users through the continuous cycle of planning, executing, measuring, and iterating on their marketing strategy.

## Problem Statement

With the rise of AI, building a product is becoming easier than ever. However, marketing it remains just as hard. Founders and business owners still struggle with:

- **Static Plans:** Traditional GTM plans are created once and quickly become outdated, failing to adapt to market feedback.
- **Strategic Overwhelm:** It's difficult to know which part of the marketing strategy to work on at any given time.
- **Lack of Continuous Guidance:** After the initial plan is made, businesses are left on their own to execute and adapt.
- **Portfolio Chaos:** Managing distinct marketing strategies for multiple products or services is complex and disconnected.

## Solution: The Strategic Copilot

We provide a SaaS platform that acts as the central marketing brain for a business. Our solution is built on three core pillars:

1. **The Strategic Workspace:** A powerful UI combining a high-level **"Marketing Map"** for strategic overview and a focused **"Step Workspace"** for deep, guided work.
2. **The AI Copilot:** An intelligent partner that, instead of just giving answers, **proposes multiple strategic options** at each step, empowering users to make informed decisions.
3. **The Living Document System:** A central source of truth for the company's GTM strategy, viewable as a live dashboard or exportable as a professional document at any time.

This creates a continuous loop: users can see their entire strategy on the map, dive into a specific area to improve it with the AI's help, and see their map instantly update.

## Target Users

- **Startup Founder:** Needs a tool to not only create but also *manage and iterate on* the GTM strategy as they learn from the market.
- **Small Business Owner:** Needs a central hub to manage marketing plans for different services and continuously optimize their approach.
- **Marketing Professional:** Needs a platform to manage GTM strategies for a portfolio of products and report on progress.

## Core Features (MVP)

### Module 1: The Strategic Workspace (Frontend)
- **Marketing Map View:**
  - Visual, interactive representation of the 12 key GTM components
  - Sections marked with status (To-Do, In Progress, Completed)
  - Primary navigation hub—clicking a section opens the Step Workspace
  - Ability to create and switch between multiple strategy maps

- **Step Workspace View:**
  - Focused UI for working on a single GTM component
  - Features the innovative **two-phase commit workflow**:
    - **Phase 1: Selection** - Choose from AI-generated strategic options
    - **Phase 2: Refinement** - Edit and personalize the selection with your expertise
  - "Save & Lock In" completes each step, unlocking the next

### Module 2: The AI Copilot Engine (Backend)
- **Structured AI Interaction:** Highly-structured, reliable engine (not a free-form chatbot)
- **Context-Aware Prompts:** Pulls data from previously completed steps for critical context
- **Option-Based Generation:** Returns three distinct strategic choices in structured format
- **Stateful & Iterative:** Supports both filling blank sections and re-working existing ones

### Module 3: The Living Document System
- **Live Web View:** Shareable, read-only web page showing current strategy state
- **On-Demand Document Generation:** Export current strategy as professionally formatted PDF
- **Fixed Document Templates:** Pre-defined structure ensuring consistent, high-quality output

## User Flow (Continuous Loop)

1. User logs in and lands on their **Dashboard**, showing all Strategy Maps
2. They select a map to work on (e.g., "GTM for New Mobile App")
3. The **Marketing Map View** displays their 12-step journey
4. User clicks on a section needing work (e.g., "Problem Definition")
5. **Step Workspace** opens with two-phase workflow:
   - Select from AI-generated options
   - Refine with personal expertise and domain knowledge
6. User clicks "Save & Lock In" to complete the step
7. Returns to Marketing Map with updated progress
8. Process continues for remaining steps

## Current Implementation

### Files
- `index.html` - Landing page where users input their product description
- `blueprint.html` - The 12-step GTM blueprint interface
- `problem-definition.html` - Step 1 workspace with two-phase commit workflow
- `mock-problem-definition.html` - Clean, professional version of the step workspace
- `loading.gif` - Transition animation between pages

### Features Implemented
- **Simple Input**: Describe your product in one sentence
- **Guided Journey**: 12-step process covering all aspects of GTM strategy
- **Two-Phase Workflow**: AI suggestions + human refinement for true collaboration
- **Clean Design**: Minimalist, professional interface
- **Responsive Layout**: Works on all screen sizes

## Getting Started

1. Open `index.html` in your browser
2. Enter your product description
3. Click "Build My First Step"
4. Follow the loading animation to the blueprint view
5. Click "Start Here" on Problem Definition to experience the two-phase workflow

## Monetization Strategy

| Tier | Price | Target User | Key Features |
|------|-------|-------------|--------------|
| **Pro** | $49/month | Startup Founder, Solo Entrepreneur | • 2 Strategy Maps<br>• Full AI Copilot access<br>• On-demand PDF exports |
| **Business** | $99/month | SMBs, Marketing Teams | • Unlimited Strategy Maps<br>• Team collaboration<br>• Custom Branding |

## Technical Approach

### Core In-House Modules
- The Strategic Workspace Frontend (React/Next.js)
- The AI Copilot Engine (Node.js backend)
- The Document Generation System (Backend service)

### Managed Services
- **Authentication:** Auth0, Clerk, or Supabase Auth
- **Database & User Management:** Supabase or Firebase  
- **Payment Processing:** Stripe
- **Hosting:** Vercel (Frontend) and Railway/Render (Backend)

## Success Metrics

- **Activation:** Percentage of users completing at least 3 sections of first map
- **Engagement:** Weekly Active Users; Sections updated per user per month
- **Retention:** Customer Churn Rate; Lifetime Value (LTV)
- **Revenue:** Monthly Recurring Revenue (MRR); Average Revenue Per User (ARPU)

## Development Status

**Current:** MVP Phase - Two-phase commit workflow implemented for Problem Definition step  
**Next:** Complete remaining 11 steps, backend integration, user authentication  
**Future:** Team collaboration, custom branding, advanced analytics

---

🚀 **Live Demo:** https://github.com/Bobers/emu  
Built with ❤️ for builders who need a strategic copilot, not just a static plan.