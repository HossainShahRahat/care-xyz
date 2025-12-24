"use client";
import { useState } from "react";
import { auth, db, googleProvider } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";

export default function Register() {
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const u = res.user;
      const userRef = doc(db, "users", u.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          uid: u.uid,
          name: u.displayName,
          email: u.email,
          role: role,
          img: u.photoURL,
          createdAt: new Date(),
        });
      }

      router.push(role === "admin" ? "/admin" : "/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password, photoUrl } = e.target.elements;

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );

      await updateProfile(res.user, {
        displayName: name.value,
        photoURL: photoUrl.value,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        name: name.value,
        email: email.value,
        role: role,
        img: photoUrl.value,
        createdAt: new Date(),
      });

      router.push(role === "admin" ? "/admin" : "/");
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white dark:bg-[#0a0c1a] rounded-2xl shadow-xl border border-gray-100 dark:border-white/5">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

      <div className="flex gap-4 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6">
        <button
          type="button"
          onClick={() => setRole("user")}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
            role === "user"
              ? "bg-white dark:bg-gray-700 shadow-sm"
              : "text-gray-500"
          }`}
        >
          User
        </button>
        <button
          type="button"
          onClick={() => setRole("admin")}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
            role === "admin"
              ? "bg-purple-600 text-white shadow-sm"
              : "text-gray-500"
          }`}
        >
          Admin
        </button>
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        className="w-full mb-6 py-3 flex items-center justify-center gap-3 border border-gray-200 dark:border-gray-700 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
      >
        <FaGoogle className="text-red-500" /> Continue as {role} with Google
      </button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200 dark:border-gray-800"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-[#0a0c1a] px-2 text-gray-500">
            Or use email
          </span>
        </div>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          required
          className="w-full p-3 rounded-xl border dark:bg-gray-900 dark:border-gray-700"
        />
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
        <input
          name="photoUrl"
          placeholder="Profile Image URL"
          className="w-full p-3 rounded-xl border dark:bg-gray-900 dark:border-gray-700"
        />

        <button
          disabled={loading}
          className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all"
        >
          {loading ? "Creating Account..." : `Register as ${role}`}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-purple-600 font-bold hover:underline"
        >
          Login here
        </Link>
      </p>
    </div>
  );
}
