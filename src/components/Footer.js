import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-[#020410] pt-16 pb-8 border-t border-gray-100 dark:border-white/5 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Link
              href="/"
              className="text-2xl font-bold text-purple-600 dark:text-purple-400 tracking-tighter"
            >
              Care.xyz
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Connecting families with trusted caregivers. We provide verified
              professionals for baby sitting, elderly care, and patient support
              across the country.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white transition-all"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white transition-all"
              >
                <FaTwitter size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white transition-all"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white transition-all"
              >
                <FaLinkedinIn size={14} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/service/baby-care"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Baby Sitting
                </Link>
              </li>
              <li>
                <Link
                  href="/service/elderly-care"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Elderly Care
                </Link>
              </li>
              <li>
                <Link
                  href="/service/sick-care"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Sick Patient Care
                </Link>
              </li>
              <li>
                <Link
                  href="/service/all"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  View All Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Become a Caregiver
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                <FaMapMarkerAlt className="mt-1 text-purple-600 dark:text-purple-400" />
                <span>
                  House 12, Road 5, Dhanmondi,
                  <br />
                  Dhaka 1209, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <FaPhoneAlt className="text-purple-600 dark:text-purple-400" />
                <span>+880 1712 345 678</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <FaEnvelope className="text-purple-600 dark:text-purple-400" />
                <span>support@care.xyz</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            &copy; {new Date().getFullYear()} Care.xyz. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-500">
            <Link
              href="#"
              className="hover:text-purple-600 dark:hover:text-purple-400"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="hover:text-purple-600 dark:hover:text-purple-400"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="hover:text-purple-600 dark:hover:text-purple-400"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
