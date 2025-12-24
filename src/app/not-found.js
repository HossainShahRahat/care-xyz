import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-white dark:bg-[#020410]">
      <div className="p-6 bg-purple-50 dark:bg-purple-900/10 rounded-full mb-6 animate-bounce">
        <FaExclamationTriangle className="text-6xl text-purple-600" />
      </div>
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
        Page Not Found
      </h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-8 py-3 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-600/30"
      >
        Return to Home
      </Link>
    </div>
  );
}
