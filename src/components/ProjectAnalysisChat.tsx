'use client';

import React, { useState } from 'react';

interface Message {
  id: number;
  type: 'system' | 'user' | 'ai' | 'error';
  text: string;
}

export default function ProjectAnalysisChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputUrl, setInputUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/project', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: inputUrl })
      });

      if (!response.ok) {
        throw new Error('Ошибка при загрузке данных');
      }

      console.log("response", response);
      const result = await response.json();
      setMessages([...messages, { 
        id: messages.length + 1, 
        type: 'ai', 
        text: result.message || 'Парсинг выполнен' 
      }]);
    } catch (error) {
      console.error('Ошибка:', error);
      setMessages([...messages, { 
        id: messages.length + 1, 
        type: 'error', 
        text: 'Произошла ошибка при отправке запроса' 
      }]);
    }
  };

  const welcome: Message[] = [{ 
    id: 0, 
    type: 'system', 
    text: 'Привет! Введи URL проекта с Kwork для анализа' 
  }];

  console.log(messages);
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="h-96 overflow-y-auto border rounded mb-4 p-4">
        {messages.map(msg => (
          <div 
            key={msg.id} 
            className={`mb-2 p-2 rounded ${
              msg.type === 'system' ? 'bg-gray-100' :
              msg.type === 'user' ? 'bg-blue-100' :
              msg.type === 'ai' ? 'bg-green-100' :
              'bg-red-100'
            }`}
          >
            {msg.text}
          </div>
        ))}
        {welcome.map((msg) => (
          <div key={msg.id} className="mb-2 p-2 rounded bg-gray-100">
            {msg.text}
          </div>
        ))}
        {!messages.length && (
          <div className="text-center text-gray-500">
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input 
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Введите URL проекта"
          className="flex-grow border rounded-l p-2"
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          Отправить
        </button>
      </form>
    </div>
  );
}