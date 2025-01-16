import { NextResponse } from 'next/server';
import { launchBrowser } from '../../../lib/browser-stub';

// Функция для установки CORS-заголовков
function setCorsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return setCorsHeaders(response);
}

export async function GET() {
  try {
    const browser = await launchBrowser();

    if (!browser) {
      const response = NextResponse.json({ 
        success: false, 
        error: 'Failed to launch browser' 
      }, { status: 500 });
      return setCorsHeaders(response);
    }

    const page = await browser.newPage();
    await page.goto('https://kwork.ru', { waitUntil: 'networkidle0' });

    // Здесь логика парсинга

    await browser.close();

    const response = NextResponse.json({ 
      success: true, 
      message: 'Парсинг выполнен успешно' 
    });
    return setCorsHeaders(response);
  } catch (error) {
    console.error('Ошибка парсинга:', error);
    const response = NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Неизвестная ошибка' 
    }, { status: 500 });
    return setCorsHeaders(response);
  }
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      const response = NextResponse.json({ 
        success: false, 
        error: 'URL не указан' 
      }, { status: 400 });
      return setCorsHeaders(response);
    }

    const browser = await launchBrowser();

    if (!browser) {
      const response = NextResponse.json({ 
        success: false, 
        error: 'Failed to launch browser' 
      }, { status: 500 });
      return setCorsHeaders(response);
    }

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Здесь логика парсинга конкретного URL

    await browser.close();

    const response = NextResponse.json({ 
      success: true, 
      message: 'Парсинг выполнен успешно',
      data: {} // Сюда можно добавить результаты парсинга
    });
    return setCorsHeaders(response);
  } catch (error) {
    console.error('Ошибка парсинга:', error);
    const response = NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Неизвестная ошибка' 
    }, { status: 500 });
    return setCorsHeaders(response);
  }
}
