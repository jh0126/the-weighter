import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  // const router = useRouter();

  // useEffect(() => {
  //   if (router.pathname === '/') {
  //     router.replace('/home');
  //   }
  // }, [router]);
  return (
    <ThemeProvider attribute='class'>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
