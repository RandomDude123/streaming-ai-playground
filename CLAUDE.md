# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js-based AI chat streaming playground that demonstrates two different approaches to AI chat implementation:

1. **Basic Chat** (`/`) - Direct Anthropic Claude streaming via Vercel AI SDK
2. **LangGraph Chat** (`/langgraph`) - Agent-based reasoning using LangGraph

Both implementations include web search capabilities via Tavily API and persistent chat history.

## Development Commands

```bash
# Development
pnpm dev              # Start development server at localhost:3000
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run ESLint

# Package management
pnpm install          # Install dependencies
```

## Architecture Overview

### Dual Implementation Pattern
The codebase implements two chat systems side-by-side for comparison:

- **API Routes**: `/api/chat` (basic) and `/api/langgraph` (agent-based)
- **Pages**: `/` (basic chat) and `/langgraph` (agent chat)
- **Shared Components**: All UI components support variant props (`basic` | `langgraph`)

### Component Architecture
Components follow a consistent pattern with variant support:
- `ChatHeader` - Navigation with theme variants (blue/green)
- `MessageBubble` - Message display with role-based styling
- `ChatInput` - Input form with theming variants and loading spinner
- `LoadingOverlay` - Page loading states

### State Management
- Local React state with hooks
- Persistent chat history via localStorage
- Separate storage keys: `chat-messages` and `langgraph-messages`

## Key Technical Patterns

### Streaming Implementation
- **Basic Chat**: Uses `streamText()` from Vercel AI SDK with `useChat` hook
- **LangGraph Chat**: Uses `streamEvents()` with `LangChainAdapter.toDataStream()`

### Tool Integration
Both implementations include web search via Tavily:
- Tools defined consistently across both APIs
- Error handling for missing API keys
- Graceful fallbacks when tools fail

### Component Variants
Components accept a `variant` prop to handle theming:
```tsx
interface ComponentProps {
  variant?: 'basic' | 'langgraph';
  // other props...
}
```

## Environment Variables

Required API keys:
```bash
ANTHROPIC_API_KEY=your_anthropic_api_key
TAVILY_API_KEY=your_tavily_api_key
```

## File Structure Notes

- `src/app/` - Next.js App Router structure
- `src/components/` - Shared UI components with variant support
- API routes handle streaming differently but follow similar patterns
- TypeScript is used throughout with strict typing enabled

## Development Guidelines

### When Adding New Features
- Follow the dual implementation pattern if the feature applies to both chats
- Use the existing component variant system for UI consistency
- Maintain type safety with proper TypeScript interfaces
- Test both streaming implementations when making API changes

### Code Patterns
- Components use controlled form patterns
- Effects properly manage cleanup and dependencies
- Loading states prevent hydration mismatches
- Error boundaries handle streaming failures gracefully

## Testing and Quality

- Run `pnpm lint` before committing
- No test framework is currently configured
- Verify both chat implementations work after changes
- Test streaming behavior and tool functionality

## Documentation Maintenance

### Self-Updating CLAUDE.md
When making significant architectural changes or adding new development patterns:

1. **Update this CLAUDE.md file** to reflect new patterns, components, or workflows
2. **Add new development commands** if build/test/deployment processes change
3. **Document new environment variables** or configuration requirements
4. **Update component architecture** section when adding/removing shared components
5. **Revise technical patterns** when streaming or API integration approaches change

### Keeping README.md in Sync
When making changes that affect the user-facing documentation:

1. **Update component descriptions** in README.md's "Shared Components" section
2. **Sync technical stack changes** when adding/removing major dependencies
3. **Update feature descriptions** if core functionality changes
4. **Maintain consistency** between CLAUDE.md's technical details and README.md's user-facing descriptions
5. **Verify deployment instructions** remain accurate after configuration changes

Key areas to sync:
- Component list and descriptions
- Tech stack dependencies
- API integration details
- Development setup instructions