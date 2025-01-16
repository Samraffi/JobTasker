import puppeteer from 'puppeteer-core';

export async function launchBrowserSafely() {
  try {
    // Используем Edge как альтернативу Chrome
    const browserPath = process.env.BROWSER_PATH || 
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

    const browser = await puppeteer.launch({
      executablePath: browserPath,
      headless: true,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    });

    return browser;
  } catch (error) {
    console.error('Ошибка запуска браузера:', error);
    throw error;
  }
}
