"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  FaClock,
  FaCalendarAlt,
  FaCheckCircle,
  FaSpinner,
  FaHistory,
} from "react-icons/fa";
import Image from "next/image";

export default function MyBookings() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [list, setList] = useState([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push("/login");

    const fetchData = async () => {
      try {
        const uRef = doc(db, "users", user.uid);
        const uSnap = await getDoc(uRef);

        if (uSnap.exists() && uSnap.data().role === "admin") {
          router.push("/admin");
          return;
        }

        const q = query(
          collection(db, "bookings"),
          where("userEmail", "==", user.email),
          orderBy("createdAt", "desc")
        );

        const res = await getDocs(q);
        setList(res.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.log(err);
      }
      setBusy(false);
    };

    if (user) fetchData();
  }, [user, loading, router]);

  if (loading || busy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-purple-600" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-10">
        <FaHistory className="text-purple-600 text-3xl" />
        <h1 className="text-3xl font-bold">My Booking History</h1>
      </div>

      {list.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-[#0a0c1a] rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
          <p className="text-gray-500">No bookings found.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {list.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#0a0c1a] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="relative w-full md:w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={item.serviceImage}
                  alt={item.serviceName}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-2">{item.serviceName}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt /> {item.bookingDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock /> {item.duration} hours
                  </span>
                  <span className="font-bold text-purple-600">
                    {item.totalCost}৳
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
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
                {item.status === "Confirmed" && (
                  <p className="text-[10px] text-green-600 flex items-center gap-1">
                    <FaCheckCircle /> Caregiver assigned
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
