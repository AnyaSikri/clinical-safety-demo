import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function callClaude<T>(
  prompt: string,
  schema: z.ZodSchema<T>,
  maxRetries = 1
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const message = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const textContent = message.content.find((block) => block.type === 'text');
      if (!textContent || textContent.type !== 'text') {
        throw new Error('No text content in response');
      }

      const text = textContent.text.trim();

      // Try to extract JSON if wrapped in markdown code blocks
      let jsonText = text;
      const jsonMatch = text.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
      if (jsonMatch) {
        jsonText = jsonMatch[1];
      }

      const parsed = JSON.parse(jsonText);
      const validated = schema.parse(parsed);

      return validated;
    } catch (error) {
      lastError = error as Error;

      if (attempt < maxRetries) {
        // Retry with clarifying message
        prompt += '\n\nPlease ensure your response is valid JSON matching the exact schema specified.';
      }
    }
  }

  throw new Error(`Failed to get valid response after ${maxRetries + 1} attempts: ${lastError?.message}`);
}
