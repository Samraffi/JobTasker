import parseKwork from './kwork-parser.ts';

async function main() {
  try {
    console.log('Начинаем парсинг...');
    const data = await parseKwork('Next.js', './kwork_projects.json');
    console.log('Парсинг завершен!');
    console.log('Найдено проектов:', data.length);
    
    // Выводим каждый проект
    data.forEach((project, index) => {
      console.log(`\nПроект ${index + 1}:`);
      console.log(`Название: ${project.title}`);
      console.log(`Цена: ${project.price}`);
      console.log(`URL: ${project.url}`);
    });
  } catch (error) {
    console.error('Ошибка:', error instanceof Error ? error.message : String(error));
  }
}

main()
.then(() => {
  console.log('Программа завершена успешно.');
  process.exit(0);
})
.catch(error => {
  console.error('Критическая ошибка:', error);
  process.exit(1);
});