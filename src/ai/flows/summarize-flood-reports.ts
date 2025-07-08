// Summarizes user flood reports to identify trends or new flooding events.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FloodReportSchema = z.object({
  location: z.string().describe('The location of the flood report.'),
  description: z.string().describe('A description of the flood event.'),
  imageUrl: z.string().optional().describe('Optional URL of an image related to the flood report.'),
  time: z.string().describe('The time of the flood report.'),
});

export type FloodReport = z.infer<typeof FloodReportSchema>;

const SummarizeFloodReportsInputSchema = z.array(FloodReportSchema).describe('An array of flood reports to summarize.');
export type SummarizeFloodReportsInput = z.infer<typeof SummarizeFloodReportsInputSchema>;

const SummarizeFloodReportsOutputSchema = z.string().describe('A summary of the flood reports, identifying trends and new flooding events.');
export type SummarizeFloodReportsOutput = z.infer<typeof SummarizeFloodReportsOutputSchema>;

export async function summarizeFloodReports(input: SummarizeFloodReportsInput): Promise<SummarizeFloodReportsOutput> {
  return summarizeFloodReportsFlow(input);
}

const summarizeFloodReportsPrompt = ai.definePrompt({
  name: 'summarizeFloodReportsPrompt',
  input: {schema: SummarizeFloodReportsInputSchema},
  output: {schema: SummarizeFloodReportsOutputSchema},
  prompt: `You are an administrator reviewing flood reports to identify trends and new flooding events.

  Summarize the following flood reports, highlighting any trends or significant new events:

  {{#each this}}
  - Location: {{location}}
    Description: {{description}}
    Time: {{time}}
    {{#if imageUrl}}
    Image URL: {{imageUrl}}
    {{/if}}
  {{/each}}
  `,
});

const summarizeFloodReportsFlow = ai.defineFlow(
  {
    name: 'summarizeFloodReportsFlow',
    inputSchema: SummarizeFloodReportsInputSchema,
    outputSchema: SummarizeFloodReportsOutputSchema,
  },
  async input => {
    const {text} = await summarizeFloodReportsPrompt(input);
    return text!;
  }
);
