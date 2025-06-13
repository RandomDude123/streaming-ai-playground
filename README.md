# AI Chat Streaming PoC

A Next.js application comparing two different approaches to AI chat streaming with web search capabilities.

## Overview

This project demonstrates two distinct implementations of streaming AI chat:

1. **Basic Chat** (`/`) - Direct Anthropic Claude streaming using Vercel AI SDK
2. **LangGraph Chat** (`/langgraph`) - Agent-based streaming using LangGraph + Anthropic Claude

Both implementations include web search capabilities via Tavily API and persistent chat history.

## Features

- 🤖 **Dual Chat Interfaces** - Compare basic streaming vs agent-based reasoning
- 🔍 **Web Search Integration** - Real-time information lookup via Tavily API
- 💾 **Persistent Chat History** - localStorage-based message persistence
- 🎨 **Shared Component Architecture** - Reusable UI components
- ⚡ **Streaming Responses** - Real-time message streaming
- 📱 **Responsive Design** - Clean, modern interface

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **AI SDKs**: Vercel AI SDK, LangChain, LangGraph
- **LLM**: Anthropic Claude 3.5 Sonnet
- **Search**: Tavily API
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Anthropic API key
- Tavily API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API keys:
   ```
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   TAVILY_API_KEY=your_tavily_api_key_here
   ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Architecture

### Basic Chat (`/api/chat`)
- Direct Anthropic Claude integration
- Vercel AI SDK `streamText` with native tools
- Simple tool calling for web search

### LangGraph Chat (`/api/langgraph`)
- LangGraph `createReactAgent` with reasoning capabilities
- Agent-based tool selection and execution
- Advanced streaming with `LangChainAdapter`

### Shared Components
- `LoadingOverlay` - Page loading states
- `ChatHeader` - Navigation and controls
- `MessageBubble` - Message display with variants
- `ChatInput` - Input form with styling variants and loading spinner

## API Keys

- **Anthropic**: Get your key at [console.anthropic.com](https://console.anthropic.com)
- **Tavily**: Get your key at [tavily.com](https://tavily.com)

## Development

The project uses TypeScript with strict typing and follows React best practices. Components are designed for reusability across both chat implementations.

## Deployment

Deploy easily on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/streaming-poc)

Remember to add your environment variables in the Vercel dashboard.