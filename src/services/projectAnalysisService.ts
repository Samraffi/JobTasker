// Интерфейс ответа от API
export interface ProjectAnalysisResponse {
  message: string;
  status: 'success' | 'error';
  data?: {
    url: string;
    title: string;
    description: string;
  };
}

/**
 * Сервис для анализа проектов Kwork
 * @param url URL проекта для анализа
 * @returns Результат анализа
 */
export const analyzeProject = async (url: string): Promise<ProjectAnalysisResponse> => {
  try {
    console.log('Начало analyzeProject. URL:', url);
    
    const response = await fetch('/api/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    console.log('Получен ответ от сервера. Статус:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ошибка ответа:', errorText);
      throw new Error(`Ошибка HTTP: ${response.status}. Текст: ${errorText}`);
    }

    const data = await response.json();
    console.log('Parsed data:', data);

    return data;
  } catch (error) {
    console.error('Полная ошибка в analyzeProject:', error);
    
    if (error instanceof Error) {
      console.error('Имя ошибки:', error.name);
      console.error('Сообщение ошибки:', error.message);
      console.error('Стек ошибки:', error.stack);
    }

    throw new Error('Не удалось выполнить анализ проекта');
  }
};
