import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorkerRegister from "./sw-register";

export const metadata: Metadata = {
  title: "MebelTech — Har narsa bir joyda",
  description: "Uy va hayot uchun kerakli mahsulotlar — MebelTech'da.",
  applicationName: "MebelTech",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "MebelTech",
    statusBarStyle: "default"
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/apple-touch-icon.png"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#101D3A"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="uz"><body><ServiceWorkerRegister />{children}</body></html>;
}
