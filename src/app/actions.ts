'use server';

import { summarizeFloodReports, type FloodReport } from '@/ai/flows/summarize-flood-reports';
import type { UserFloodReport } from '@/lib/types';

export async function getSummary(reports: UserFloodReport[]): Promise<string> {
  if (reports.length === 0) {
    return 'No reports to summarize.';
  }

  const formattedReports: FloodReport[] = reports.map(report => ({
    location: report.location,
    description: report.description,
    time: new Date(report.time).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
    imageUrl: report.imageUrl,
  }));

  try {
    const summary = await summarizeFloodReports(formattedReports);
    return summary;
  } catch (error) {
    console.error('Error summarizing flood reports:', error);
    return 'Failed to generate summary. The AI model may be temporarily unavailable.';
  }
}
