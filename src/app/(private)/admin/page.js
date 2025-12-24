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
import { FaCheck, FaTimes, FaSpinner, FaShieldAlt } from "react-icons/fa";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [list, setList] = useState([]);
  const [busy, setBusy] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");

    const init = async () => {
      try {
        const uRef = doc(db, "users", user.uid);
        const uSnap = await getDoc(uRef);

        if (!uSnap.exists() || uSnap.data().role !== "admin") {
          router.push("/");
          return;
        }

        setAuthorized(true);
        const q = query(
          collection(db, "bookings"),
          orderBy("createdAt", "desc")
        );
        const res = await getDocs(q);
        setList(res.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.log(err);
      }
      setBusy(false);
    };

    if (user) init();
  }, [user, loading, router]);

  const updateStatus = async (id, s) => {
    const prompt =
      s === "Cancelled" ? "Discard this booking?" : `Move booking to ${s}?`;

    if (!window.confirm(prompt)) return;

    try {
      await updateDoc(doc(db, "bookings", id), { status: s });
      setList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: s } : item))
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (loading || busy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-purple-600" />
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <FaShieldAlt className="text-purple-600 text-3xl" />
        <h1 className="text-3xl font-bold">Admin Panel</h1>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-[#0a0c1a] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 dark:bg-white/5 text-gray-500 text-[10px] uppercase tracking-widest">
              <th className="p-5 font-black">Customer</th>
              <th className="p-5 font-black">Service</th>
              <th className="p-5 font-black text-center">Status</th>
              <th className="p-5 font-black text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {list.map((item) => (
              <tr
                key={item.id}
                className="text-sm hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors"
              >
                <td className="p-5">
                  <div className="font-bold text-gray-900 dark:text-white">
                    {item.userName}
                  </div>
                  <div className="text-xs text-gray-400">{item.userEmail}</div>
                </td>
                <td className="p-5">
                  <div className="font-medium">{item.serviceName}</div>
                  <div className="text-xs text-purple-600 font-bold">
                    {item.totalCost}৳
                  </div>
                </td>
                <td className="p-5 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : item.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Completed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-5 text-right">
                  <div className="flex gap-2 justify-end items-center">
                    {item.status === "Pending" && (
                      <button
                        onClick={() => updateStatus(item.id, "Confirmed")}
                        className="p-2.5 bg-green-500/10 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all"
                      >
                        <FaCheck size={14} />
                      </button>
                    )}
                    {item.status === "Confirmed" && (
                      <button
                        onClick={() => updateStatus(item.id, "Completed")}
                        className="p-2.5 bg-blue-500/10 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                      >
                        <FaCheck size={14} />
                      </button>
                    )}

                    {item.status !== "Cancelled" &&
                      item.status !== "Completed" && (
                        <button
                          onClick={() => updateStatus(item.id, "Cancelled")}
                          className="p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                        >
                          <FaTimes size={14} />
                        </button>
                      )}
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
