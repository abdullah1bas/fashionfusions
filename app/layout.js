'use client'
import { Roboto } from "next/font/google";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./_style/theme";
import App from "./_components/App";
import { ClerkProvider } from "@clerk/nextjs";
import './globals.css'

const inter = Roboto({ subsets: ["latin"], weight: "700" });

// export const metadata = {
//   title: "FashionFusion", // عنوان الصفحة
//   description: "e-commerce", // وصف الصفحة
//   keywords: "fashion, fusion, clothing, modern styles", // كلمات مفتاحية لتحسين SEO
//   author: "Abdullah Fadel", // اسم المؤلف
//   language: "en-US", // اللغة المستخدمة في الصفحة
//   icons: {
//     // icon: "/favicon.ico", // مسار الأيقونة الافتراضية
//   },
// };

export default function RootLayout({ children }) {
  const [theme, colorMode] = useMode();

  return (
    <html lang="en">
      <head>
        <title>FashionFusions</title>
        {/* <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} /> */}
        <link
          rel="icon"
          href="/logoECommerce-modified-min.png.svg"
          type="image/png"
        />
      </head>
      <body className={inter.className}>
        <ClerkProvider>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App child={children} />
            </ThemeProvider>
          </ColorModeContext.Provider>
        </ClerkProvider>
      </body>
    </html>
  );
}
