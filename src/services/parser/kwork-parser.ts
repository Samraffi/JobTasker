import { log } from 'console';
import puppeteer from 'puppeteer-core';

interface ProjectDetails {
  additionalDetails: string;
}

async function parseKwork(projectUrl: string): Promise<ProjectDetails> {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });

  try {
    const page = await browser.newPage();
    await page.goto(projectUrl, { 
      waitUntil: 'networkidle0' 
    });

    const projectDetails = await page.evaluate(() => {
      const wantCard = document.querySelector('.want-card');
      if (!wantCard) return null;

      console.log(wantCard.querySelectorAll('*'));
      // Извлечение всех текстовых элементов
      const textElements = Array.from(wantCard.querySelectorAll('*'))
        .filter(el => el.textContent && el.textContent.trim() !== '')
        .map((el, index) => {
          // Получаем текстовое содержимое и заменяем множественные пробелы одним
          let text = el?.textContent?.replace(/\s+/g, ' ').trim();
          // Если это первый элемент, добавляем точку в конце
          if (index === 0) {
            text += '.';
          }

          return text;
        });

      return {
        additionalDetails: JSON.stringify(textElements), // Сохраняем в JSON-строку textElements
      };
    });

    await browser.close();

    if (!projectDetails) {
      throw new Error('Не удалось найти детали проекта');
    }

    return projectDetails;
  } catch (error) {
    console.error('Ошибка парсинга деталей проекта:', error);
    throw error;
  }
}

export default parseKwork;