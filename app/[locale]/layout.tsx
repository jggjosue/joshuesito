import { Footer } from "@/app/[locale]/components/Footer";
import { Navbar } from "@/app/[locale]/components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Joshuesito",
  description: "Bienvenido a mi página web, un espacio donde comparto mis proyectos, ideas y aprendizajes. Aquí encontrarás una colección de trabajos creativos y profesionales que reflejan mi pasión por el desarrollo y la innovación. Además, mi blog personal está dedicado a explorar temas que inspiran, desde tecnología y emprendimiento hasta reflexiones sobre la vida y el crecimiento personal. Mi objetivo es conectar, aprender y aportar valor a través de cada publicación y proyecto.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const  messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <html lang={'en'}>
        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <Analytics/>
          <SpeedInsights/>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
        </body>
      </html>
    </NextIntlClientProvider>
  );
}