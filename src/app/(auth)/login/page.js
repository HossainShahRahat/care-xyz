"use client";
import { auth, db, googleProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const handleGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const u = res.user;
      const userDoc = await getDoc(doc(db, "users", u.uid));

      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", u.uid), {
          uid: u.uid,
          name: u.displayName,
          email: u.email,
          role: "user",
          createdAt: new Date(),
        });
        router.push("/");
      } else {
        const data = userDoc.data();
        router.push(data.role === "admin" ? "/admin" : "/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      const userDoc = await getDoc(doc(db, "users", res.user.uid));
      const data = userDoc.data();
      router.push(data?.role === "admin" ? "/admin" : "/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white dark:bg-[#0a0c1a] rounded-2xl shadow-xl border border-gray-100 dark:border-white/5">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <button
        onClick={handleGoogle}
        className="w-full mb-6 py-3 flex items-center justify-center gap-3 border border-gray-200 dark:border-gray-700 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
      >
        <FaGoogle className="text-red-500" /> Sign in with Google
      </button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200 dark:border-gray-800"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-[#0a0c1a] px-2 text-gray-500">
            Or email
          </span>
        </div>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 rounded-xl border dark:bg-gray-900 dark:border-gray-700"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 rounded-xl border dark:bg-gray-900 dark:border-gray-700"
        />
        <button className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all">
          Login
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-purple-600 font-bold hover:underline"
        >
          Register here
        </Link>
      </p>
    </div>
  );
}
