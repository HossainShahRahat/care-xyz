"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/lib/authContext";
import { useForm } from "react-hook-form";
import {
  FaMapMarkerAlt,
  FaClock,
  FaCalculator,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";

const SERVICES = {
  "baby-care": {
    id: "baby-care",
    title: "Baby Sitting",
    price: 500,
    img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800",
  },
  "elderly-care": {
    id: "elderly-care",
    title: "Elderly Care",
    price: 400,
    img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800",
  },
  "sick-care": {
    id: "sick-care",
    title: "Sick People Service",
    price: 600,
    img: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800",
  },
};

export default function BookingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [cost, setCost] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const sId = params?.serviceId;
  const s = sId ? SERVICES[sId] : null;
  const hrs = watch("duration");

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (s && hrs) setCost(s.price * hrs);
  }, [hrs, s]);

  const sendInvoice = async (bId, data) => {
    const params = {
      user_name: user.displayName || "Valued Client",
      user_email: user.email,
      service_name: s.title,
      total_cost: cost,
      duration: hrs,
      booking_id: bId,
      address: `${data.address}, ${data.city}`,
    };

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        params,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
    } catch (err) {
      console.log("Email failed:", err);
    }
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const bData = {
        serviceId: sId,
        serviceName: s.title,
        serviceImage: s.img,
        totalCost: cost,
        status: "Pending",
        userEmail: user.email,
        userName: user.displayName || "User",
        bookingDate: new Date().toLocaleDateString(),
        createdAt: new Date(),
        ...data,
      };

      const docRef = await addDoc(collection(db, "bookings"), bData);

      await sendInvoice(docRef.id, data);

      router.push("/my-bookings");
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl" />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Confirm Booking</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:col-span-2 space-y-6 bg-white dark:bg-[#0a0c1a] p-8 rounded-2xl border border-gray-100 dark:border-white/5"
        >
          <div>
            <label className="block text-sm font-medium mb-2">
              Hours Needed
            </label>
            <input
              type="number"
              {...register("duration", { required: true, min: 1 })}
              className="w-full p-3 rounded-xl border dark:bg-gray-900 dark:border-gray-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("division", { required: true })}
              placeholder="Division"
              className="p-3 rounded-xl border dark:bg-gray-900 dark:border-gray-700"
            />
            <input
              {...register("district", { required: true })}
              placeholder="District"
              className="p-3 rounded-xl border dark:bg-gray-900 dark:border-gray-700"
            />
          </div>

          <input
            {...register("city", { required: true })}
            placeholder="City"
            className="w-full p-3 rounded-xl border dark:bg-gray-900 dark:border-gray-700"
          />

          <textarea
            {...register("address", { required: true })}
            placeholder="Detailed Address"
            className="w-full p-3 rounded-xl border dark:bg-gray-900 dark:border-gray-700"
            rows="3"
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 disabled:opacity-50"
          >
            {submitting ? "Booking..." : "Confirm & Send Invoice"}
          </button>
        </form>

        <div className="md:col-span-1">
          <div className="bg-white dark:bg-[#0a0c1a] p-6 rounded-2xl border border-gray-100 dark:border-white/5 sticky top-24">
            <div className="relative h-40 w-full rounded-xl overflow-hidden mb-4">
              <Image src={s.img} alt={s.title} fill className="object-cover" />
            </div>
            <h3 className="font-bold text-xl mb-4">{s.title}</h3>
            <div className="flex justify-between border-t pt-4">
              <span>Total Cost</span>
              <span className="font-bold text-purple-600 text-xl">{cost}৳</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
