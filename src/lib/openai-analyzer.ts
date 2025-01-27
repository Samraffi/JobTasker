import OpenAI from 'openai';
import { ProjectDetails } from './kwork-parser';

export interface ProjectInsights {
  summary: string;
  complexity?: number;
  recommendedSkills?: string[];
}

export async function analyzeProject(projectDetails: ProjectDetails): Promise<ProjectInsights> {
  // Ensure OpenAI API key is set
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured');
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const analysis = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system", 
        content: "You are an expert project analyzer for freelance projects. Provide a detailed analysis."
      },
      {
        role: "user", 
        content: `Analyze the following project details:
        URL: ${projectDetails.url || 'N/A'}
        Details: ${projectDetails.details.join('\n')}

        Please provide:
        1. A comprehensive project summary
        2. Estimated project complexity (1-10 scale)
        3. Recommended skills for this project`
      }
    ]
  });

  // Parse the AI response
  const insights = analysis.choices[0].message.content || '';

  // Basic parsing of insights (you might want to improve this)
  const complexityMatch = insights.match(/Complexity:\s*(\d+)/i);
  const skillsMatch = insights.match(/Recommended Skills:\s*(.+)/i);

  return {
    summary: insights,
    complexity: complexityMatch ? parseInt(complexityMatch[1], 10) : undefined,
    recommendedSkills: skillsMatch ? skillsMatch[1].split(',').map((s: string) => s.trim()) : undefined
  };
}
