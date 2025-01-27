<<<<<<< HEAD
# JobTasker

## О проекте
JobTasker — это интеллектуальная система для работы с фриланс-проектами на Kwork, реализующая концепцию многоролевого AI-ассистента. Система имитирует работу полноценной команды, где каждую роль выполняет специализированный AI-ассистент.

## Архитектура системы

### Ролевая структура
1. **Директор**
   - Принятие стратегических решений
   - Финальная оценка результатов

2. **Продукт-менеджер**
   - Анализ требований
   - Презентация результатов директору

3. **Ассистент анализа**
   - Сбор данных с Kwork через веб-скрапинг
   - Первичный анализ проектов с помощью AI

4. **Ассистент презентации**
   - Подготовка структурированных отчётов
   - Форматирование данных для презентации

5. **Дизайнер**
   - Создание концепции проекта
   - Визуальное представление идей

6. **Проект-менеджер**
   - Координация процессов
   - Контроль выполнения задач
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
>>>>>>> a94709c559daaf20e19a9e059c53e3421377af36

7. **Ассистент разработчика**
   - Техническая реализация
   - Подготовка решений

<<<<<<< HEAD
## Технологический стек
- Next.js 15
- OpenAI API для ролевой модели AI
- Puppeteer для сбора данных
- TypeScript
- React Markdown

## Процесс работы
1. Сбор и анализ данных (Ассистент анализа)
2. Подготовка презентации (Ассистент презентации)
3. Разработка концепции (Дизайнер)
4. Координация разработки (Проект-менеджер)
5. Техническая реализация (Ассистент разработчика)
6. Презентация результатов (Продукт-менеджер)
7. Финальная оценка (Директор)

## Статус разработки
Проект находится в стадии активной разработки. Текущий фокус:
- Реализация чат-интерфейса для взаимодействия с разными ролями
- Интеграция с OpenAI для ролевой модели
- Оптимизация сбора данных с Kwork# JobTasker
=======
First, run the development server:
>>>>>>> a94709c559daaf20e19a9e059c53e3421377af36

## Требования
- Node.js (версия указать актуальную)
- API ключ OpenAI

## Установка и запуск

### Установка зависимостей
```bash
<<<<<<< HEAD
npm install

### Запуск сервера разработки
bash
pnpm dev
### Запуск клиентского приложения
bash
pnpm client
### Конфигурация CORS
В проекте реализованы три способа настройки CORS:

### Next.js Config

#### Расположение: next.config.js
Базовая конфигурация на уровне Next.js
Route Handler

#### Расположение: pages/api/users/route.ts
Настройка CORS для отдельных API маршрутов
Middleware

#### Расположение: middleware.ts
Глобальная конфигурация CORS через middleware
Структура проекта
Code
JobTasker/
├── src/
│   ├── app/         # Основные компоненты приложения
│   ├── api/         # API маршруты
│   └── lib/         # Общие утилиты и конфигурации
├── public/          # Статические файлы
└── config/          # Конфигурационные файлы

#### Возможности
Мониторинг задач с AI интеграцией
Продвинутая обработка CORS
Типизированный API с TypeScript
Оптимизированная структура проекта

#### Разработка
При внесении изменений следуйте существующей структуре кода
Используйте TypeScript для новых компонентов
=======
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> a94709c559daaf20e19a9e059c53e3421377af36
