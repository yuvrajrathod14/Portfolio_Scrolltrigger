import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://github.com/yuvrajrathod14/Portfolio_Scrolltrigger"),
  title: "Yuvraj Rathod | Creative Developer & 3D Artist",
  description: "Portfolio of Yuvraj Rathod, a passionate Creative Developer, 3D Artist, and Video Editor specializing in high-end digital experiences and scrollytelling.",
  keywords: ["Yuvraj Rathod", "Creative Developer", "3D Artist", "Video Editor", "Portfolio", "Next.js", "Scrollytelling"],
  authors: [{ name: "Yuvraj Rathod" }],
  openGraph: {
    title: "Yuvraj Rathod | Creative Developer",
    description: "High-end scrollytelling digital portfolio for Yuvraj Rathod.",
    url: "https://github.com/yuvrajrathod14",
    siteName: "Yuvraj Rathod Portfolio",
    images: [
      {
        url: "/sequence/ezgif-frame-001.png",
        width: 1200,
        height: 630,
        alt: "Yuvraj Rathod Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuvraj Rathod | Creative Developer",
    description: "High-end scrollytelling digital portfolio for Yuvraj Rathod.",
    images: ["/sequence/ezgif-frame-001.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
