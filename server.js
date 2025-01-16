'server component';

import express from 'express';
import axios from 'axios';
import cors from 'cors';
import puppeteer from 'puppeteer';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/project', async (req, res) => {
  try {
    const response = await fetch('https://kwork.ru/projects/2703261/view');
    console.error('response data:', response);
    res.status(500).json({ error: 'Ошибка при получении данных' });
  }
});

app.post('/api/parse-kwork', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ success: false, error: 'URL не указан' });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Здесь можно добавить логику парсинга
    const pageTitle = await page.title();
    const pageContent = await page.content();

    await browser.close();

    res.json({ 
      success: true, 
      message: 'Парсинг выполнен успешно',
      data: {
        title: pageTitle,
        // content: pageContent  // Закомментировано, чтобы не отправлять весь HTML
      }
    });
  } catch (error) {
    console.error('Ошибка парсинга:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Неизвестная ошибка' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
