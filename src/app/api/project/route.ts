import { NextRequest, NextResponse } from 'next/server';

// Глобальный обработчик ошибок
process.on('uncaughtException', (error) => {
  console.error('ГЛОБАЛЬНАЯ НЕОБРАБОТАННАЯ ОШИБКА:', error);
});

export async function POST(request: NextRequest) {
  console.log('НАЧАЛО ОБРАБОТКИ POST-ЗАПРОСА');
  
  try {
    // Проверка типа запроса
    if (request.method !== 'POST') {
      console.error('ОШИБКА: Неверный метод запроса');
      return NextResponse.json({
        status: 'error',
        message: 'Только POST-запросы поддерживаются'
      }, { status: 405 });
    }

    // Проверка Content-Type
    const contentType = request.headers.get('content-type');
    console.log('Content-Type:', contentType);
    
    if (!contentType || !contentType.includes('application/json')) {
      console.error('ОШИБКА: Неверный Content-Type');
      return NextResponse.json({
        status: 'error',
        message: 'Требуется JSON'
      }, { status: 415 });
    }

    // Безопасное получение тела запроса
    let requestBody;
    try {
      requestBody = await request.json();
      console.log('Полученное тело запроса:', JSON.stringify(requestBody, null, 2));
    } catch (parseError) {
      console.error('ОШИБКА ПАРСИНГА ТЕЛА:', parseError);
      return NextResponse.json({
        status: 'error',
        message: 'Не удалось распарсить JSON',
        details: parseError instanceof Error ? parseError.message : String(parseError)
      }, { status: 400 });
    }

    const { url } = requestBody;

    console.log('Проверка URL:', url);
    if (!url) {
      console.error('ОШИБКА: URL не передан');
      return NextResponse.json({
        status: 'error',
        message: 'URL проекта не указан'
      }, { status: 400 });
    }

    if (!url.includes('kwork.ru/projects/')) {
      console.error('ОШИБКА: Некорректный формат URL', url);
      return NextResponse.json({
        status: 'error',
        message: 'Некорректный URL проекта Kwork'
      }, { status: 400 });
    }

    // Заглушка для тестирования с максимальной информативностью
    const response = {
      status: 'success',
      message: 'Тестовый анализ проекта',
      data: {
        url,
        title: 'Тестовый проект',
        description: 'Описание тестового проекта'
      }
    };

    console.log('Успешный ответ:', JSON.stringify(response, null, 2));

    return NextResponse.json(response);

  } catch (error) {
    console.error('КРИТИЧЕСКАЯ ОШИБКА В API ROUTE:');
    console.error('Тип ошибки:', typeof error);
    
    if (error instanceof Error) {
      console.error('Имя ошибки:', error.name);
      console.error('Сообщение ошибки:', error.message);
      console.error('Стек ошибки:', error.stack);
    } else {
      console.error('Неизвестный тип ошибки:', error);
    }
    
    return NextResponse.json({
      status: 'error', 
      message: error instanceof Error 
        ? error.message 
        : 'Неизвестная ошибка при обработке проекта',
      details: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}

// Обработчик OPTIONS для CORS
export async function OPTIONS() {
  return NextResponse.json({ success: true }, { 
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
