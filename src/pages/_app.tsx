import { Analytics } from "@vercel/analytics/react";
import "../styles/themes.css";
import { Poppins } from "@next/font/google";
import { AppProvider } from "@/context/AppContext";
// import '@/styles/globals.css';
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--poppins-font",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AppProvider>
        <div className={poppins.className}>
          <Component {...pageProps} />
          <Analytics />
        </div>
      </AppProvider>
    </ThemeProvider>
  );
}
