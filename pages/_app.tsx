import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ContextProvider from '@/context';

export default function App({ Component, pageProps }: AppProps) {
  // Fetch cookies on the client side
  const cookies = typeof window !== 'undefined' ? document.cookie : '';

  return (
    <ContextProvider cookies={cookies}>
      <Component {...pageProps} />
    </ContextProvider>
  );
}
