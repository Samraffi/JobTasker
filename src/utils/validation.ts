/**
 * Валидация URL проекта Kwork
 * @param url URL для проверки
 * @returns Результат валидации
 */
export const validateKworkUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return (
      urlObj.hostname === 'kwork.ru' && 
      urlObj.pathname.includes('/projects/')
    );
  } catch {
    return false;
  }
};
