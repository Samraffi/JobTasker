import { useState, useCallback } from 'react';
import { validateKworkUrl } from '../utils/validation';

export function useUrlValidation(maxLength = 500) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateUrl = useCallback(() => {
    if (!url.trim()) {
      setError('URL не может быть пустым');
      return false;
    }

    if (url.length > maxLength) {
      setError(`URL не должен превышать ${maxLength} символов`);
      return false;
    }

    const isValid = validateKworkUrl(url);
    setError(isValid ? null : 'Некорректный формат URL');
    
    return isValid;
  }, [url, maxLength]);

  const handleUrlChange = useCallback((newUrl: string) => {
    setUrl(newUrl);
    setError(null);
  }, []);

  return {
    url,
    error,
    setUrl: handleUrlChange,
    validateUrl
  };
}
