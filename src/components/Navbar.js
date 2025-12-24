"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaSignOutAlt,
  FaCalendarAlt,
  FaShieldAlt,
} from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dbImg, setDbImg] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      if (user) {
        try {
          const d = await getDoc(doc(db, "users", user.uid));
          if (d.exists()) {
            const data = d.data();
            setIsAdmin(data.role === "admin");
            setDbImg(data.img);
          }
        } catch (err) {
          console.log("Sync...");
        }
      } else {
        setIsAdmin(false);
        setDbImg(null);
      }
    };
    checkUser();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      setShowProfileMenu(false);
      setIsAdmin(false);
      router.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-white/90 dark:bg-[#020410]/90 backdrop-blur-md border-b border-gray-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:bg-purple-500 transition-colors">
              C
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              Care.xyz
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Home
            </Link>

            {!isAdmin && (
              <Link
                href="/service/all"
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Services
              </Link>
            )}

            {user && isAdmin && (
              <Link
                href="/admin"
                className="text-sm font-bold text-purple-600 hover:text-purple-500 flex items-center gap-2 transition-colors"
              >
                <FaShieldAlt /> Admin Panel
              </Link>
            )}

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-purple-100 dark:border-purple-900/30">
                    {dbImg || user.photoURL ? (
                      <Image
                        src={dbImg || user.photoURL}
                        alt="Avatar"
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600">
                        <FaUserCircle size={20} />
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 max-w-[100px] truncate">
                    {user.displayName || "User"}
                  </span>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-[#0a0c1a] rounded-xl shadow-2xl border border-gray-100 dark:border-white/10 py-2 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5 mb-2 bg-gray-50/50 dark:bg-white/5">
                      <p className="text-[10px] uppercase tracking-wider text-gray-400">
                        Signed in as
                      </p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                        {user.email}
                      </p>
                    </div>

                    {!isAdmin && (
                      <Link
                        href="/my-bookings"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      >
                        <FaCalendarAlt className="opacity-70" /> My Bookings
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <FaSignOutAlt className="opacity-70" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2.5 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 shadow-lg transition-all"
              >
                Login
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
