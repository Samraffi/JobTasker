import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import 'dotenv/config';

export async function POST(request: NextRequest) {
  const { projectDetails, exercise } = await request.json();

  if (!projectDetails) {
    return NextResponse.json(
      { error: 'Детали проекта не указаны' }, 
      { status: 400 }
    );
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: exercise || 'Ты помощник для анализа проектов на бирже фриланса.',
        },
        {
          role: 'user',
          content: `Проанализируй следующий проект: ${projectDetails}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const result = completion.choices[0].message.content || 'Не удалось получить анализ';

    return NextResponse.json({ result });

  } catch (error) {
    console.error('Ошибка при анализе проекта через OpenAI:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error 
          ? error.message 
          : 'Неизвестная ошибка при анализе' 
      }, 
      { status: 500 }
    );
  }
}