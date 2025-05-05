import "./globals.css";
import { Roboto } from "next/font/google";
import App from "./_components/App";

const inter = Roboto({ subsets: ["latin"], weight: "700" });

export const metadata = {
  title: "FashionFusion", // عنوان الصفحة
  description: "e-commerce", // وصف الصفحة
  keywords: "fashion, fusion, clothing, modern styles", // كلمات مفتاحية لتحسين SEO
  author: "Abdullah Fadel", // اسم المؤلف
  language: "en-US", // اللغة المستخدمة في الصفحة
  icons: {
    // icon: "/favicon.ico", // مسار الأيقونة الافتراضية
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <link rel="icon" href="/logoECommerce-modified-min.png.svg" type="image/png" />
      </head>
      <body className={inter.className}>
        <App>{children}</App>
      </body>
    </html>
  );
}
