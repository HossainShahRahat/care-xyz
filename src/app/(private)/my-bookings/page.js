"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/authContext";
import {
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";

export default function MyBookingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [bookings, setBookings] = useState([
    {
      id: "bk_123",
      serviceName: "Baby Sitting",
      serviceImage:
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800",
      date: "2025-01-10",
      duration: "4 hours",
      totalCost: "2000",
      location: "Gulshan 1, Dhaka",
      status: "Pending",
    },
    {
      id: "bk_124",
      serviceName: "Elderly Care",
      serviceImage:
        "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800",
      date: "2024-12-28",
      duration: "8 hours",
      totalCost: "3200",
      location: "Dhanmondi, Dhaka",
      status: "Confirmed",
    },
    {
      id: "bk_125",
      serviceName: "Sick People Service",
      serviceImage:
        "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800",
      date: "2024-12-15",
      duration: "12 hours",
      totalCost: "7200",
      location: "Uttara Sector 7, Dhaka",
      status: "Completed",
    },
  ]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleCancel = (id) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      setBookings(
        bookings.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b))
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700";
      case "Confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-700";
      case "Completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-700";
      case "Cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-700";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Bookings
        </h1>
        <Link
          href="/service/all"
          className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
        >
          Book New Service
        </Link>
      </div>

      <div className="grid gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white dark:bg-[#020410] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5 flex flex-col md:flex-row gap-6 items-start md:items-center transition-all hover:shadow-md"
          >
            <div className="relative w-full md:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src={booking.serviceImage}
                alt={booking.serviceName}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-grow space-y-3 w-full">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {booking.serviceName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ID: {booking.id}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-purple-500" />
                  <span>{booking.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-purple-500" />
                  <span>{booking.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-purple-500" />
                  <span className="font-bold">{booking.totalCost}৳</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-purple-500" />
                  <span className="truncate max-w-[150px]">
                    {booking.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto flex-shrink-0 border-t md:border-t-0 border-gray-100 dark:border-white/5 pt-4 md:pt-0">
              <button className="flex-1 md:w-36 px-4 py-2 rounded-lg bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-100 dark:hover:bg-white/10 transition-colors border border-gray-200 dark:border-gray-700">
                View Details
              </button>

              {booking.status === "Pending" && (
                <button
                  onClick={() => handleCancel(booking.id)}
                  className="flex-1 md:w-36 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors border border-red-100 dark:border-red-900/30"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
