import type { Metadata } from "next";
import { inter } from "@/ts/fonts";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import "@/css/tailwind.css";

export const metadata: Metadata = {
    title: "fetch a friend",
    description: "One fetch closer to your new best friend",
    icons: {
        icon: "/favicon.ico",
    },
    openGraph: {
        images: [
            {
                url: "https://fetch-jagged.vercel.app/opengraph-image.png",
                width: 1920,
                height: 1080,
                type: "image/png",
            },
        ],
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-snow text-coal antialiased transition dark:bg-coal dark:text-snow`}>
                <div className="flex h-screen flex-col">
                    <Header />
                    <main className="grow">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
