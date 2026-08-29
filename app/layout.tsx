import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
// import Header from "@/components/home/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { NavigationProgressProvider } from "@/components/navigation-progress";

const DMSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const Dm_Mono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vondascribe.vercel.app"),
  title: "VondaScribe",
  description:
    "AI-powered audio and video transcription into well-formatted posts",
  openGraph: {
    title: "VondaScribe",
    description:
      "AI-powered audio and video transcription into well-formatted posts",
    url: "https://vondascribe.vercel.app",
    siteName: "VondaScribe",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VondaScribe",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VondaScribe",
    description:
      "AI-powered audio and video transcription into well-formatted posts",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${DMSans.variable} ${Dm_Mono.variable} h-full antialiased`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <NavigationProgressProvider>{children}</NavigationProgressProvider>
            <Toaster />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
