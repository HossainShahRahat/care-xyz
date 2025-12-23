import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h2 className="text-3xl font-bold text-red-500 mb-4">404</h2>
      <p className="text-gray-600 mb-6">Page not found.</p>
      <Link
        href="/"
        className="text-purple-600 underline hover:text-purple-800"
      >
        Go Home
      </Link>
    </div>
  );
}
