import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from "next-themes";
import { AppProvider } from "@/context/AppContext";
import '@/styles/globals.css';
import "../styles/themes.css";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AppProvider>
        <div>
          <Component {...pageProps} />
          <Analytics />
        </div>
      </AppProvider>
    </ThemeProvider>
  )
}
