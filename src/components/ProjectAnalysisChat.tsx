'use client';

import React, { useState, useCallback } from 'react';
import { analyzeProject } from '../services/projectAnalysisService';
import { useUrlValidation } from '../hooks/useUrlValidation';
import { 
  MESSAGE_TYPES, 
  Message, 
  ProjectAnalysisResult, 
  ProjectAnalysisChatProps 
} from '../types/chat';

const MAX_MESSAGES = 50;
const API_TIMEOUT = 30000; // 30 секунд

const MessageItem: React.FC<{ message: Message }> = React.memo(({ message }) => {
  const getMessageClasses = () => {
    switch (message.type) {
      case MESSAGE_TYPES.SYSTEM as string: return 'bg-gray-100 text-gray-800';
      case MESSAGE_TYPES.USER as string: return 'bg-blue-100 text-blue-800';
      case MESSAGE_TYPES.AI as string: return 'bg-green-100 text-green-800';
      case MESSAGE_TYPES.ERROR as string: return 'bg-red-100 text-red-800';
      default: return '';
    }
  };

  return (
    <div 
      className={`p-3 rounded-lg mb-2 ${getMessageClasses()}`}
      role="article"
      aria-label={`Сообщение типа ${message.type}`}
    >
      {message.text}
    </div>
  );
});
MessageItem.displayName = 'MessageItem';

const MessageList: React.FC<{ 
  messages: Message[], 
  onClear: () => void 
}> = React.memo(({ messages, onClear }) => (
  <div 
    className="flex flex-col overflow-y-auto max-h-96" 
    aria-live="polite"
  >
    {messages.map(msg => (
      <MessageItem key={msg.id} message={msg} />
    ))}
    {messages.length > 0 && (
      <button 
        onClick={onClear}
        className="mt-4 bg-red-500 text-white p-2 rounded"
        aria-label="Очистить историю сообщений"
      >
        Очистить историю
      </button>
    )}
  </div>
));
MessageList.displayName = 'MessageList';

const InputForm: React.FC<{
  onSubmit: (url: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}> = React.memo(({ onSubmit, isLoading, error }) => {
  const { url, setUrl, validateUrl, error: urlError } = useUrlValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateUrl()) {
      await onSubmit(url);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col space-y-2"
      aria-label="Форма анализа проекта"
    >
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Введите URL проекта"
        className="p-2 border rounded"
        aria-invalid={!!urlError || !!error}
        aria-describedby="url-error"
      />
      {(urlError || error) && (
        <div 
          id="url-error" 
          className="text-red-500"
          role="alert"
        >
          {urlError || error}
        </div>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
        aria-label="Начать анализ проекта"
      >
        {isLoading ? 'Анализ...' : 'Анализировать'}
      </button>
    </form>
  );
});
InputForm.displayName = 'InputForm';

const ProjectAnalysisChat: React.FC<ProjectAnalysisChatProps> = ({
  maxMessages = MAX_MESSAGES,
  timeout = API_TIMEOUT
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const addMessage = useCallback((text: string, type: keyof typeof MESSAGE_TYPES) => {
    setMessages(prev => [
      ...prev, 
      { 
        id: Date.now(), 
        type, 
        text, 
        timestamp: new Date() 
      }
    ].slice(-maxMessages));
  }, [maxMessages]);

  const handleSubmit = useCallback(async (inputUrl: string) => {
    setGlobalError(null);
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      addMessage(inputUrl, MESSAGE_TYPES.USER as keyof typeof MESSAGE_TYPES);

      const result = await Promise.race([
        analyzeProject(inputUrl),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Превышено время ожидания')), timeout)
        )
      ]) as ProjectAnalysisResult;

      addMessage(result.message, MESSAGE_TYPES.AI as keyof typeof MESSAGE_TYPES);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Произошла ошибка при анализе проекта';
      
      addMessage(errorMessage, MESSAGE_TYPES.ERROR as keyof typeof MESSAGE_TYPES);
      setGlobalError(errorMessage);
    } finally {
      setIsLoading(false);
      clearTimeout(timeoutId);
    }
  }, [addMessage, timeout]);

  const clearHistory = useCallback(() => {
    if (window.confirm('Вы уверены, что хотите очистить историю?')) {
      setMessages([]);
    }
  }, []);

  return (
    <div 
      className="max-w-2xl mx-auto p-4 bg-gray-50"
      role="main"
      aria-label="Чат анализа проектов"
    >
      <h2 className="text-2xl mb-4">Анализ проекта</h2>
      <InputForm 
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={globalError}
      />
      <MessageList 
        messages={messages} 
        onClear={clearHistory} 
      />
    </div>
  );
};

export default ProjectAnalysisChat;