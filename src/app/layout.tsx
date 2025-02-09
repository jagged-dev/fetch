import type { Metadata } from "next";
import { inter } from "@/ts/fonts";
import "@/css/tailwind.css";

export const metadata: Metadata = {
    title: "Fetch a Friend",
    description: "One fetch closer to your new best friend",
    icons: {
        icon: "/favicon.ico",
    },
    openGraph: {
        images: [
            {
                url: "https://fetch-jagged.vercel.app/opengraph-image.png?opengraph-image.5d2438eb.png",
                width: 1600,
                height: 900,
                type: "image/png",
            },
        ],
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-snow text-coal antialiased transition-background dark:bg-coal dark:text-snow`}>{children}</body>
        </html>
    );
}
