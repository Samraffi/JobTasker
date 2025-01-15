import puppeteer from 'puppeteer';

export interface JobVacancy {
  title: string;
  company: string;
  url: string;
  salary?: string;
}

export class HHParser {
  private readonly BASE_URL = 'https://hh.ru/search/vacancy';

  async parse(query: string): Promise<JobVacancy[]> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
      await page.goto(`${this.BASE_URL}?text=${encodeURIComponent(query)}`, { 
        waitUntil: 'networkidle0' 
      });

      const vacancies = await page.evaluate(() => {
        const items = document.querySelectorAll('.vacancy-serp-item');
        return Array.from(items).map(item => {
          const titleEl = item.querySelector('.serp-item__title');
          const companyEl = item.querySelector('.bloko-text_company');
          const salaryEl = item.querySelector('.bloko-header-section-3');

          return {
            title: titleEl?.textContent?.trim() || '',
            company: companyEl?.textContent?.trim() || '',
            url: titleEl?.getAttribute('href') || '',
            salary: salaryEl?.textContent?.trim()
          };
        }).slice(0, 5); // Ограничиваем 5 вакансиями
      });

      await browser.close();
      return vacancies;
    } catch (error) {
      console.error('Parsing error:', error);
      await browser.close();
      return [];
    }
  }
}