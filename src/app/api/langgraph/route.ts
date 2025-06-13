import { NextRequest } from 'next/server';
import { LangChainAdapter } from 'ai';
import { ChatAnthropic } from '@langchain/anthropic';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { SystemMessage } from '@langchain/core/messages';

const SYSTEM_TEMPLATE = `You are a helpful assistant powered by LangGraph and Anthropic's Claude. You can engage in conversations and help with various tasks.`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  
  // Initialize Anthropic LLM
  const llm = new ChatAnthropic({
    model: 'claude-3-5-sonnet-20241022',
    temperature: 0,
    streaming: true,
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  });
  
  // Define tools (empty for now, can be extended later)
  const tools = [];
  
  // Create LangGraph agent
  const agent = createReactAgent({
    llm,
    tools,
    messageModifier: new SystemMessage(SYSTEM_TEMPLATE),
  });
  
  // Stream events from the agent
  const eventStream = agent.streamEvents(
    { messages },
    { version: 'v2' }
  );
  
  // Convert LangGraph stream to Vercel AI SDK format
  return LangChainAdapter.toDataStreamResponse(eventStream);
}