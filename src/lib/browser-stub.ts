export const launchBrowser = () => {
  if (typeof window !== 'undefined') {
    console.warn('Browser launching is not supported in client-side code');
    return null;
  }
  
  try {
    return import('puppeteer-core').then(({ launch }) => launch({
      headless: true,
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }));
  } catch (error) {
    console.error('Failed to launch browser:', error);
    return null;
  }
};
