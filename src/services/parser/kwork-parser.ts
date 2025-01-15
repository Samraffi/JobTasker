import puppeteer from 'puppeteer-core';
import fs from 'fs/promises';

async function parseKwork(query: string, outputPath: string) {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });

  try {
    const page = await browser.newPage();
    await page.goto(`https://kwork.ru/search?query=${encodeURIComponent(query)}`, { 
      waitUntil: 'networkidle0' 
    });

    const projects = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.kwork-card-item'))
        .map(item => ({
          title: item.querySelector('.kwork-card-item__title')?.textContent?.trim() || '',
          url: item.querySelector('.kwork-card-item__title a')?.getAttribute('href') || '',
          price: item.querySelector('.kwork-card-item__info-price')?.textContent?.trim() || 'Цена не указана'
        }))
        .slice(0, 50);
    });

    await fs.writeFile(outputPath, JSON.stringify(projects, null, 2));
    console.log(`Найдено ${projects.length} проектов`);

    await browser.close();
    return projects;
  } catch (error) {
    console.error('Ошибка парсинга:', error);
    throw error;
  }
}

export default parseKwork;