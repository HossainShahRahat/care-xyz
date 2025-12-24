import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/authContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Care.xyz - Reliable Care Services",
  description: "Find trusted caretakers for children and elderly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col font-sans">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 pt-28 pb-12">
              {children}
            </main>

            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
