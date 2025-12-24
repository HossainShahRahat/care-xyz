"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  getDoc,
} from "firebase/firestore";
import {
  FaCheck,
  FaTrash,
  FaClock,
  FaUser,
  FaSpinner,
  FaShieldAlt,
} from "react-icons/fa";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");

    const verifyAndFetch = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists() || userSnap.data().role !== "admin") {
          router.push("/");
          return;
        }

        setIsAdmin(true);
        const q = query(
          collection(db, "bookings"),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        setBookings(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.log(err);
      }
      setFetching(false);
    };

    if (user) verifyAndFetch();
  }, [user, loading, router]);

  const changeStatus = async (id, s) => {
    try {
      await updateDoc(doc(db, "bookings", id), { status: s });
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: s } : b))
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

  if (!isAdmin) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <FaShieldAlt className="text-purple-600 text-3xl" />
        <h1 className="text-3xl font-bold">Admin Panel</h1>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-[#0a0c1a] rounded-2xl border border-gray-100 dark:border-white/5">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 dark:bg-white/5 text-gray-500 text-sm uppercase">
              <th className="p-4">Customer</th>
              <th className="p-4">Service</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {bookings.map((b) => (
              <tr key={b.id} className="text-sm">
                <td className="p-4">
                  <div className="font-bold">{b.userName}</div>
                  <div className="text-xs text-gray-400">{b.userEmail}</div>
                </td>
                <td className="p-4">
                  <div className="font-medium">{b.serviceName}</div>
                  <div className="text-xs text-gray-500">
                    {b.duration}h • {b.totalCost}৳
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-[10px] font-bold ${
                      b.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : b.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex gap-2 justify-end">
                    {b.status === "Pending" && (
                      <button
                        onClick={() => changeStatus(b.id, "Confirmed")}
                        className="p-2 bg-green-600 text-white rounded-lg"
                      >
                        <FaCheck size={12} />
                      </button>
                    )}
                    <button
                      onClick={() => changeStatus(b.id, "Cancelled")}
                      className="p-2 bg-red-100 text-red-600 rounded-lg"
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
