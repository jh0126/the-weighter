import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '../../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/') {
      router.replace('/snsHome');
    }
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
