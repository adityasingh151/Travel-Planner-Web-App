import { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./homepage/Header";
import Footer from "./Footer";
import { AuthProvider } from "@/app/AuthContext"; // Import AuthProvider
import SessionWrapper from '@/app/SessionWrapper';
import { Session } from "next-auth"; // Import Session type

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
    session,
}: {
    children: React.ReactNode;
    session: Session | null; // Replace `any` with `Session | null` to handle absence of session
}) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <SessionWrapper session={session}>
                    <AuthProvider>
                        <Header />
                        <main className="flex-grow">{children}</main>
                        <Footer />
                    </AuthProvider>
                </SessionWrapper>
            </body>
        </html>
    );
}
