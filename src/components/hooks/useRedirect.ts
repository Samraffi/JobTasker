import { useRouter } from 'next/navigation';

const useRedirect = () => {
  const router = useRouter();
  return (url: string) => router.push(url);
};

export default useRedirect;