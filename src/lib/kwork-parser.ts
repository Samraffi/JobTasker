import puppeteer from 'puppeteer';

export interface ProjectDetails {
  details: string[];
  url?: string;
}

export async function parseKworkProject(url: string): Promise<ProjectDetails> {
  // Launch Puppeteer and parse Kwork project
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto(url, {
      waitUntil: 'networkidle0'
    });

    const projectDetails = await page.evaluate(() => {
      const wantCard = document.querySelector('.want-card');
      const details = !wantCard ? [] : Array.from(wantCard.querySelectorAll('*'))
        .map(el => el.textContent?.trim())
        .filter((text): text is string => text !== undefined && text.length > 0);
      
      return { details };
    });

    return {
      ...projectDetails,
      url
    };
  } finally {
    await browser.close();
  }
}
