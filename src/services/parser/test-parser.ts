import parseKwork from './kwork-parser.ts';

async function main() {
  try {
    console.log('Начинаем парсинг...');
    const data = await parseKwork('https://kwork.ru/projects/2703261/view');

    console.log('Парсинг завершен!');
    console.log('Детали проекта:', data);
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
    // process.exit(0);
  })
  .catch((error) => {
    console.error('Критическая ошибка:', error);
    process.exit(1);
  });
