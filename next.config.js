/** @type {import('next').NextConfig} */
const nextConfig = {
  // Основные настройки проекта
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        dns: false,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        readline: false,
        socks: false,
        'socks-proxy-agent': false,
        'pac-resolver': false,
        'proxy-agent': false,
      };
    }
    return config;
  }
};

export default nextConfig;