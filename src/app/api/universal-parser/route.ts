import { NextResponse } from 'next/server';
import { parseKworkProject } from '@/lib/kwork-parser';
import { analyzeProject } from '@/lib/openai-analyzer';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL не указан' }, 
        { status: 400 }
      );
    }

    // Parse project details
    const projectDetails = await parseKworkProject(url);

    // Analyze project
    const insights = await analyzeProject(projectDetails);

    return NextResponse.json({
      projectDetails,
      insights
    });

  } catch (error) {
    console.error('Parsing or analysis error:', error);
    return NextResponse.json(
      { error: 'Ошибка при обработке проекта' }, 
      { status: 500 }
    );
  }
}
