import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Toaster } from "sonner";
import "./globals.css";

const siteTitle = "Shomaj — Community action, made local";
const siteDescription = "Discover, create, and join meaningful community service events across Bangladesh.";

export const metadata: Metadata = {
  metadataBase: new URL("https://shomaj.sraboni.dev"),
  title: { default: siteTitle, template: "%s | Shomaj" },
  description: siteDescription,
  alternates: { canonical: "/" },
  icons: { icon: { url: "/favicon.png", type: "image/png" } },
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: "/",
    siteName: "Shomaj",
    title: siteTitle,
    description: siteDescription,
    images: [{ url: "/shomaj-logo.png", width: 1254, height: 1254, alt: "Shomaj community action" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/shomaj-logo.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
          <Toaster richColors position="top-center" closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
