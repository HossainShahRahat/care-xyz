"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/authContext";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaIdCard,
  FaPhone,
  FaExclamationCircle,
} from "react-icons/fa";

export default function RegisterPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data) => {
    setError("");
    setLoading(true);

    const hasUpper = /[A-Z]/.test(data.password);
    const hasLower = /[a-z]/.test(data.password);

    if (data.password.length < 6 || !hasUpper || !hasLower) {
      setError("Password must be 6+ chars with uppercase & lowercase");
      setLoading(false);
      return;
    }

    try {
      const res = await signup(data.email, data.password, data.name);

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        name: data.name,
        email: data.email,
        nid: data.nid,
        contact: data.contact,
        createdAt: new Date(),
        role: "user",
      });

      router.push("/my-bookings");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already exists");
      } else {
        setError("Failed to create account");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#020410] px-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-[#0a0c1a] p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-white/5">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join Care.xyz to find trusted caregivers
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm">
            <FaExclamationCircle className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit(handleRegister)}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <FaUser />
            </div>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all placeholder-gray-400"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <FaEnvelope />
            </div>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all placeholder-gray-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaIdCard />
              </div>
              <input
                {...register("nid", { required: true })}
                type="text"
                placeholder="NID Number"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all placeholder-gray-400"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaPhone />
              </div>
              <input
                {...register("contact", { required: true })}
                type="tel"
                placeholder="Contact No"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all placeholder-gray-400"
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaLock />
              </div>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all placeholder-gray-400"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1.5 ml-1">
              * Must include 1 uppercase & 1 lowercase letter (min 6 chars)
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-purple-600 text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-purple-600 hover:text-purple-500 transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
