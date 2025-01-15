import 'dotenv/config';
import parseKwork from './kwork-parser.ts';
import analyzeProjectWithOpenAI from './openai-service.ts';

async function main() {
  try {
    console.log('Начинаем парсинг...');
    const data = await parseKwork('https://kwork.ru/projects/2703261/view');

    console.log('Парсинг завершен!');
    console.log('Детали проекта:', data);

    // Добавляем анализ OpenAI
    const analysis = await analyzeProjectWithOpenAI({
      projectDetails: data.additionalDetails,
      exercise: 'Ты помощник для анализа проектов на бирже фриланса. Проанализируй детали проекта.',
    });

    console.log('Анализ проекта:', analysis);
  } catch (error) {
    console.error(
      'Ошибка:',
      error instanceof Error ? error.message : String(error)
    );
  }
}

main()
  .then(() => {
    console.log('Программа завершена успешно.');
  })
  .catch((error) => {
    console.error('Критическая ошибка:', error);
    process.exit(1);
  });
