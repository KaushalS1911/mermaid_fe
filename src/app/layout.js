"use client";
import "./globals.css";
import {ThemeProvider} from "@mui/material";
import theme from "@/components/theme/theme";
import {Toaster} from "react-hot-toast";
import {createContext, Suspense, useContext, useRef, useState} from "react";
import light from "../asset/editor/design/image (1).png"

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };
export const ChartContext = createContext({});
export default function RootLayout({children}) {
    const [code, setCode] = useState('');
    const [color, setColor] = useState({theme: "default", image: light , borderColor: "#AC5C1C"});
    const chartRef = useRef(null);
    return (
        <html lang="en">
        <body cz-shortcut-listen="true">
        {/*<Header />*/}
        <ChartContext.Provider value={{code, setCode, color, setColor, chartRef}}>
            <Toaster/>
            <ThemeProvider theme={theme}>
                <Suspense>
                    {children}
                </Suspense>
            </ThemeProvider>
        </ChartContext.Provider>
        </body>
        </html>
    );
}
