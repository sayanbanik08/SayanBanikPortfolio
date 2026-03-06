import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import ViewportHeight from "./components/common/ViewportHeight";

const soriaFont = localFont({
  src: "../public/soria-font.ttf",
  variable: "--font-soria",
});

const vercettiFont = localFont({
  src: "../public/Vercetti-Regular.woff",
  variable: "--font-vercetti",
});

export const metadata: Metadata = {
  title: "Sayan Banik",
  description: "A full-stack developer by profession, a creative at heart.",
  icons: {
    icon: [
      { url: '/image.png', type: 'image/png' },
    ],
    apple: '/image.png',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
  keywords: "Sayan Banik, Full-Stack Developer, React Developer, MERN Stack, Web Development, Node.js, JavaScript, TypeScript, Portfolio",
  authors: [{ name: "Sayan Banik" }],
  creator: "Sayan Banik",
  publisher: "Sayan Banik",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Sayan Banik - Full-Stack Developer",
    description: "Full-stack developer by profession, creative at heart.",
    url: "https://sayanbanik.site",
    siteName: "Sayan Banik's Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sayan Banik - Full-Stack Developer",
    description: "Full-stack developer by profession, creative at heart.",
  },
  verification: {
    google: "GsRYY-ivL0F_VKkfs5KAeToliqz0gCrRAJKKmFkAxBA",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overscroll-y-none">
      <body
        className={`${soriaFont.variable} ${vercettiFont.variable} font-sans antialiased`}
      >
        <ViewportHeight />
        {children}
      </body>
      <GoogleAnalytics gaId={'G-7WD4HM3XRE'} />
    </html>
  );
}
