"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/authContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FaArrowRight, FaCheckCircle, FaSpinner } from "react-icons/fa";

export default function BookingAction({ serviceId }) {
  const { user } = useAuth();
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const checkStatus = async () => {
      try {
        const q = query(
          collection(db, "bookings"),
          where("userEmail", "==", user.email),
          where("serviceId", "==", serviceId)
        );
        const snap = await getDocs(q);

        const hasActive = snap.docs.some((doc) => {
          const s = doc.data().status;
          return s === "Pending" || s === "Confirmed";
        });

        setBooked(hasActive);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    checkStatus();
  }, [user, serviceId]);

  if (loading) {
    return (
      <button
        disabled
        className="w-full sm:w-auto px-8 py-4 bg-gray-100 dark:bg-white/10 text-gray-400 rounded-xl font-bold text-lg flex items-center justify-center gap-2 cursor-wait"
      >
        <FaSpinner className="animate-spin" /> Checking...
      </button>
    );
  }

  if (booked) {
    return (
      <button
        disabled
        className="w-full sm:w-auto px-8 py-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-xl font-bold text-lg flex items-center justify-center gap-2 cursor-not-allowed"
      >
        <FaCheckCircle /> Already Booked
      </button>
    );
  }

  return (
    <Link
      href={`/booking/${serviceId}`}
      className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
    >
      Book Service <FaArrowRight />
    </Link>
  );
}
