import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';

export async function POST(request: NextRequest) {
  const { url } = await request.json();

  if (!url) {
    return NextResponse.json(
      { error: 'URL проекта не указан' }, 
      { status: 400 }
    );
  }

  try {
    const browser = await puppeteer.launch({
      headless: false,
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    });

    const page = await browser.newPage();
    await page.goto(url, { 
      waitUntil: 'networkidle0' 
    });

    const projectDetails = await page.evaluate(() => {
      const wantCard = document.querySelector('.want-card');
      if (!wantCard) return null;

      const textElements = Array.from(wantCard.querySelectorAll('*'))
        .filter(el => el.textContent && el.textContent.trim() !== '')
        .map((el, index) => {
          let text = el?.textContent?.replace(/\s+/g, ' ').trim();
          if (index === 0) {
            text += '.';
          }
          return text;
        });

      return {
        additionalDetails: JSON.stringify(textElements),
      };
    });

    await browser.close();

    if (!projectDetails) {
      return NextResponse.json(
        { error: 'Не удалось найти детали проекта' }, 
        { status: 404 }
      );
    }

    return NextResponse.json(projectDetails);

  } catch (error) {
    console.error('Ошибка парсинга деталей проекта:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error 
          ? error.message 
          : 'Неизвестная ошибка при парсинге' 
      }, 
      { status: 500 }
    );
  }
}