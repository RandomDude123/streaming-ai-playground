import { anthropic } from '@ai-sdk/anthropic';
import { streamText, tool } from 'ai';
import { z } from 'zod';

async function searchWeb(query: string) {
  const response = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api_key: process.env.TAVILY_API_KEY,
      query,
      max_results: 3,
      search_depth: 'basic',
      include_answer: false,
      include_images: false,
      include_raw_content: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Tavily API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
}

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic('claude-3-5-sonnet-20241022'),
    messages,
    tools: {
      web_search: tool({
        description: 'Search the web for current information, news, and real-time data. Use this when users ask about recent events, current facts, or anything that requires up-to-date information.',
        parameters: z.object({
          query: z.string().describe('The search query to find relevant information'),
        }),
        execute: async ({ query }) => {
          try {
            const results = await searchWeb(query);
            return { results };
          } catch (error) {
            return { error: `Failed to search: ${error instanceof Error ? error.message : 'Unknown error'}` };
          }
        },
      }),
    },
    maxSteps: 5,
  });

  return result.toDataStreamResponse();
}