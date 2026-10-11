import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import baseURL from "@/services/baseUrl";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bazar-Dor",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ বাজারদর জানুন",
};

const getCategories = async () => {
  const res = await fetch(`${baseURL}/categories`, {
    cache: "force-cache",
  });
  const data = await res.json();
  return data;
};

export default async function RootLayout({ children }) {

  const categories = await getCategories();
  // console.log(categories);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#EEF1EF]">
        <Navbar categories={categories}/>
        {children}
        <ToastContainer position="bottom-right" />
        <Footer/>
      </body>
    </html>
  );
}
