import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avartya – Building a Sustainable and Safer Society",
  description:
    "Avartya is a youth-driven non-profit organization working towards environmental sustainability, women safety awareness, and community education through impactful grassroots campaigns.",
  keywords: [
    "NGO India",
    "environmental sustainability",
    "tree plantation",
    "women safety",
    "youth NGO",
    "Jharkhand NGO",
    "Avartya Foundation",
  ],
  openGraph: {
    title: "Avartya – Building a Sustainable and Safer Society",
    description:
      "Youth-driven NGO working for environmental sustainability and social empowerment in India.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — Cormorant Garamond (display) + DM Sans (body) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-green-50 text-gray-800 antialiased">
        {children}
      </body>
    </html>
  );
}
