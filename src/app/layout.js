"use client";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@mui/material";
import theme from "@/components/theme/theme";
import {Toaster} from "react-hot-toast";
import {createContext, Suspense, useContext, useRef, useState} from "react";
import light from "../asset/editor/design/image (1).png"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };
export const ChartContext = createContext({});
export default function RootLayout({ children }) {
  const [code,setCode] = useState('');
  const [color,setColor] = useState({theme:"default",image:light});
  const chartRef = useRef(null);
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`} cz-shortcut-listen="true">
        {/*<Header />*/}
        <ChartContext.Provider value={{code,setCode,color,setColor , chartRef}}>
        <Toaster />
        <ThemeProvider theme={theme}>
        {children}
        </ThemeProvider>
        </ChartContext.Provider>
      </body>
    </html>
  );
}
