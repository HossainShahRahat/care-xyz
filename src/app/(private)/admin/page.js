"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/authContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { FaCheck, FaTrash, FaClock, FaUser, FaSpinner } from "react-icons/fa";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [allBookings, setAllBookings] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push("/login");

    const getBookings = async () => {
      try {
        const q = query(
          collection(db, "bookings"),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        setAllBookings(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.log(err);
      }
      setFetching(false);
    };

    if (user) getBookings();
  }, [user, loading, router]);

  const updateStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, "bookings", id), { status: newStatus });
      setAllBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-purple-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Booking Management</h1>

      <div className="overflow-x-auto bg-white dark:bg-[#0a0c1a] rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400 text-sm">
              <th className="p-4 font-semibold">User / Service</th>
              <th className="p-4 font-semibold">Details</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {allBookings.map((b) => (
              <tr
                key={b.id}
                className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors"
              >
                <td className="p-4">
                  <div className="font-bold">{b.serviceName}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <FaUser size={10} /> {b.userName || b.userEmail}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm flex items-center gap-1 text-gray-600 dark:text-gray-300">
                    <FaClock size={12} /> {b.duration} hrs • {b.totalCost}৳
                  </div>
                  <div className="text-xs text-gray-400 italic">
                    {b.city}, {b.district}
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                      b.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : b.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : b.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex gap-2 justify-end">
                    {b.status === "Pending" && (
                      <button
                        onClick={() => updateStatus(b.id, "Confirmed")}
                        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        title="Confirm"
                      >
                        <FaCheck size={12} />
                      </button>
                    )}
                    {b.status === "Confirmed" && (
                      <button
                        onClick={() => updateStatus(b.id, "Completed")}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700"
                      >
                        Complete
                      </button>
                    )}
                    <button
                      onClick={() => updateStatus(b.id, "Cancelled")}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      title="Cancel"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
