"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/authContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaSpinner,
  FaTimesCircle,
  FaEye,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function MyBookingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchBookings() {
      if (!user) return;

      try {
        const q = query(
          collection(db, "bookings"),
          where("userEmail", "==", user.email)
        );

        const querySnapshot = await getDocs(q);
        const fetchedBookings = querySnapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        fetchedBookings.sort((a, b) => {
          const timeA = a.createdAt?.seconds || 0;
          const timeB = b.createdAt?.seconds || 0;
          return timeB - timeA;
        });

        setBookings(fetchedBookings);
      } catch (error) {
        console.error(error);
      } finally {
        setFetching(false);
      }
    }

    fetchBookings();
  }, [user]);

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      const bookingRef = doc(db, "bookings", bookingId);
      await updateDoc(bookingRef, {
        status: "Cancelled",
      });

      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: "Cancelled" } : b
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading || fetching) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-purple-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-2xl border border-dashed border-gray-300 dark:border-white/10">
          <FaCalendarAlt className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No bookings yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            You haven't made any service bookings yet.
          </p>
          <Link
            href="/service/all"
            className="px-6 py-2.5 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all"
          >
            Find a Service
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white dark:bg-[#020410] rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6"
            >
              <div className="relative w-full md:w-48 h-48 md:h-auto rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={booking.serviceImage}
                  alt={booking.serviceName}
                  fill
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 200px"
                  className="object-cover"
                />
              </div>

              <div className="flex-grow space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {booking.serviceName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Booked on {booking.bookingDate}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      booking.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <FaClock className="text-purple-500" />
                    <span>Duration: {booking.duration} hours</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <FaMoneyBillWave className="text-green-500" />
                    <span>Total Cost: {booking.totalCost}৳</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600 dark:text-gray-300 md:col-span-2">
                    <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" />
                    <span>
                      {booking.address}, {booking.city}, {booking.district}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex gap-3 justify-end">
                  <Link
                    href={`/service/${booking.serviceId}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <FaEye /> View Details
                  </Link>

                  {booking.status === "Pending" && (
                    <button
                      onClick={() => handleCancel(booking.id)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                    >
                      <FaTimesCircle /> Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
