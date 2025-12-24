"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/lib/authContext";
import { useForm } from "react-hook-form";
import {
  FaMapMarkerAlt,
  FaClock,
  FaCalculator,
  FaCheckCircle,
} from "react-icons/fa";

const servicesData = {
  "baby-care": {
    id: "baby-care",
    title: "Baby Sitting",
    price: 500,
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800",
  },
  "elderly-care": {
    id: "elderly-care",
    title: "Elderly Care",
    price: 400,
    image:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800",
  },
  "sick-care": {
    id: "sick-care",
    title: "Sick People Service",
    price: 600,
    image:
      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800",
  },
};

export default function BookingPage({ params }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [totalCost, setTotalCost] = useState(0);

  const serviceId = params.serviceId;
  const service = servicesData[serviceId];

  const duration = watch("duration");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (service && duration) {
      setTotalCost(service.price * duration);
    } else {
      setTotalCost(0);
    }
  }, [duration, service]);

  const onSubmit = (data) => {
    const bookingData = {
      ...data,
      serviceId,
      serviceName: service.title,
      totalCost,
      status: "Pending",
      userEmail: user.email,
      bookingDate: new Date().toISOString(),
    };

    console.log("Booking Saved:", bookingData);
    router.push("/my-bookings");
  };

  if (loading || !service) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Confirm Your Booking
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white dark:bg-[#020410] rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-white/5 space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FaClock className="text-purple-500" /> Service Duration
              </h3>
              <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  How many hours do you need?
                </label>
                <input
                  type="number"
                  min="1"
                  {...register("duration", {
                    required: "Duration is required",
                    min: 1,
                  })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  placeholder="e.g., 4"
                />
                {errors.duration && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.duration.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-purple-500" /> Location Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Division
                  </label>
                  <select
                    {...register("division", {
                      required: "Division is required",
                    })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  >
                    <option value="">Select Division</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    District
                  </label>
                  <input
                    type="text"
                    {...register("district", {
                      required: "District is required",
                    })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="e.g., Dhaka"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Full Address / Area
                  </label>
                  <textarea
                    {...register("address", {
                      required: "Address is required",
                    })}
                    rows="2"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="House No, Road No, Area..."
                  ></textarea>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-purple-600 text-white font-bold text-lg hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 transform hover:-translate-y-0.5 mt-4"
            >
              Confirm Booking
            </button>
          </form>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white dark:bg-[#020410] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5 sticky top-32">
            <div className="relative h-40 w-full rounded-xl overflow-hidden mb-6">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <h3 className="text-white font-bold text-xl">
                  {service.title}
                </h3>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-white/5 pb-3">
                <span>Rate per hour</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {service.price}৳
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-white/5 pb-3">
                <span>Duration</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {duration || 0} hours
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FaCalculator className="text-purple-500" /> Total Cost
                </span>
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {totalCost}৳
                </span>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-lg flex gap-3 items-start">
              <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <p className="text-xs text-green-700 dark:text-green-300">
                Your booking will be set to{" "}
                <span className="font-bold">Pending</span> until a caretaker
                accepts the request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
