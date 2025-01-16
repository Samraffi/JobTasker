import { NextRequest, NextResponse } from 'next/server';

// Обертка для middleware
async function runMiddleware(req: NextRequest) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
  };

  // Обработка preflight OPTIONS запросов
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  // Для всех остальных запросов добавляем CORS-заголовки
  const response = NextResponse.next();
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export async function middleware(request: NextRequest) {
  // Применяем CORS ко всем API-маршрутам
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return await runMiddleware(request);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};