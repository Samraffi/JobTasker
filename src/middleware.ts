import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Безопасные заголовки безопасности
const SECURITY_HEADERS = {
  'X-XSS-Protection': '1; mode=block',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
};

// Логирование запросов
function logRequest(req: NextRequest, requestId: string) {
  console.log(JSON.stringify({
    requestId,
    method: req.method,
    url: req.nextUrl.pathname,
    timestamp: new Date().toISOString()
  }));
}

async function handleCORS(req: NextRequest) {
  const corsHeaders: Record<string, string> = {
    'Access-Control-Allow-Origin': req.headers.get('origin') || '*',
    'Access-Control-Allow-Methods': 'GET,HEAD,POST,PUT,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
    'Vary': 'Origin'
  };

  // Обработка preflight OPTIONS запросов
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  const response = NextResponse.next();
  
  // Установка CORS-заголовков
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Установка заголовков безопасности
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export async function middleware(request: NextRequest) {
  const requestId = uuidv4();
  request.headers.set('X-Request-ID', requestId);

  // Логирование всех входящих запросов
  logRequest(request, requestId);

  // Применяем CORS и безопасность к API-маршрутам
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return await handleCORS(request);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};