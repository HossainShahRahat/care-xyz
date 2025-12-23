import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-purple-500">
              Care.xyz
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed pr-4">
              A reliable and trusted platform connecting families with
              professional caretakers. We make caregiving easy, secure, and
              accessible for everyone.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-gray-800 pb-2 inline-block">
              Services
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  href="/service/baby-care"
                  className="hover:text-purple-400 transition-colors"
                >
                  Baby Sitting
                </Link>
              </li>
              <li>
                <Link
                  href="/service/elderly-care"
                  className="hover:text-purple-400 transition-colors"
                >
                  Elderly Care
                </Link>
              </li>
              <li>
                <Link
                  href="/service/sick-care"
                  className="hover:text-purple-400 transition-colors"
                >
                  Special Care
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-gray-800 pb-2 inline-block">
              Company
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  href="/about"
                  className="hover:text-purple-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-purple-400 transition-colors"
                >
                  Login / Register
                </Link>
              </li>
              <li>
                <Link
                  href="/my-bookings"
                  className="hover:text-purple-400 transition-colors"
                >
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-gray-800 pb-2 inline-block">
              Contact
            </h3>
            <div className="text-sm text-gray-400 space-y-3">
              <p>Dhaka, Bangladesh</p>
              <p>support@care.xyz</p>
              <div className="flex gap-4 mt-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-all"
                >
                  <FaFacebookF className="text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition-all"
                >
                  <FaTwitter className="text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 transition-all"
                >
                  <FaLinkedinIn className="text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Care.IO. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="cursor-pointer hover:text-gray-300">
              Privacy Policy
            </span>
            <span className="cursor-pointer hover:text-gray-300">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
