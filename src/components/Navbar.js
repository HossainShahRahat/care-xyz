"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/service/all" },
    { name: "My Bookings", href: "/my-bookings" },
  ];

  const isActive = (path) => pathname === path;

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-[#020410]/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 shadow-lg shadow-gray-200/20 dark:shadow-purple-900/10 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 tracking-tighter hover:opacity-80 transition-opacity"
            >
              Care.xyz
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/login"
              className="px-8 py-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/30 text-sm font-bold transform hover:-translate-y-0.5 active:scale-95"
            >
              Login
            </Link>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 dark:text-white hover:text-purple-600 focus:outline-none p-2"
            >
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-[#020410] border-t border-gray-100 dark:border-white/10 shadow-2xl absolute w-full left-0 top-full">
          <div className="px-6 py-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-4 rounded-xl text-base font-semibold ${
                  isActive(link.href)
                    ? "text-purple-600 bg-purple-50 dark:bg-white/5 dark:text-purple-300"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-5 py-4 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 shadow-xl shadow-purple-600/20"
              >
                Login / Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
