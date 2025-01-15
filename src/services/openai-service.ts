import OpenAI from 'openai';

interface AnalysisOptions {
  projectDetails: string;
  exercise: string;
  temperature?: number;
  maxTokens?: number;
}

async function analyzeProjectWithOpenAI({
  projectDetails,
  exercise,
  temperature = 0.7,
  maxTokens = 500,
}: AnalysisOptions) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: exercise,
        },
        {
          role: 'user',
          content: `Проанализируй следующий проект: ${projectDetails}`,
        },
      ],
      temperature,
      max_tokens: maxTokens,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Ошибка при анализе проекта через OpenAI:', error);
    throw error;
  }
}

export default analyzeProjectWithOpenAI;
