import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  FaCheckCircle,
  FaStar,
  FaShieldAlt,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

const servicesData = {
  "baby-care": {
    id: "baby-care",
    title: "Baby Sitting",
    description:
      "Professional and caring babysitters to ensure your child is safe, happy, and engaged.",
    longDescription:
      "Our baby sitting service is designed to give parents peace of mind. Whether you need a night out or regular daily care, our verified sitters are here to help. We focus on interactive play, safe supervision, and maintaining your child's routine.",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800",
    price: "500৳",
    unit: "per hour",
    rating: 4.8,
    reviews: 124,
    features: [
      "Certified Child Care Professionals",
      "First Aid & CPR Trained",
      "Age-Appropriate Activities",
      "Meal & Nap Time Management",
      "Daily Activity Logs",
    ],
  },
  "elderly-care": {
    id: "elderly-care",
    title: "Elderly Care",
    description:
      "Compassionate companionship and assistance for your elderly loved ones.",
    longDescription:
      "We understand that aging loved ones need patience, respect, and specialized attention. Our caregivers assist with mobility, medication reminders, companionship, and light housekeeping to ensure they can live comfortably at home.",
    image:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800",
    price: "400৳",
    unit: "per hour",
    rating: 4.9,
    reviews: 89,
    features: [
      "Medication Reminders",
      "Mobility Assistance",
      "Companionship & Conversation",
      "Light Housekeeping",
      "Health Monitoring",
    ],
  },
  "sick-care": {
    id: "sick-care",
    title: "Sick People Service",
    description: "Specialized care for patients recovering at home.",
    longDescription:
      "Recovering at home is better with professional support. Our attendants are trained to handle post-operative care, chronic illness management, and bedridden patient support with dignity and expertise.",
    image:
      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800",
    price: "600৳",
    unit: "per hour",
    rating: 4.7,
    reviews: 56,
    features: [
      "Post-Surgery Support",
      "Vital Signs Monitoring",
      "Hygiene & Grooming Assistance",
      "Strict Medication Schedule",
      "Emergency Protocol Training",
    ],
  },
};

export async function generateMetadata({ params }) {
  const { serviceId } = await params;
  const service = servicesData[serviceId];

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} - Care.xyz`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      images: [
        {
          url: service.image,
          width: 800,
          height: 600,
          alt: service.title,
        },
      ],
    },
  };
}

export default async function ServiceDetailsPage({ params }) {
  const { serviceId } = await params;
  const service = servicesData[serviceId];

  if (!service) {
    return notFound();
  }

  return (
    <div className="pb-16">
      <div className="bg-white dark:bg-[#020410] rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/5">
        <div className="relative h-[400px] w-full">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020410] via-transparent to-transparent opacity-90"></div>
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
            <div className="flex flex-wrap gap-4 items-center mb-4">
              <span className="bg-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg shadow-purple-900/50">
                {service.title}
              </span>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-sm font-medium border border-white/20">
                <FaStar className="text-yellow-400" />
                <span>
                  {service.rating} ({service.reviews} reviews)
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {service.title} Service
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 p-8 md:p-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Description
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {service.longDescription}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                What We Provide
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5"
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center flex-shrink-0">
                      <FaCheckCircle className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 rounded-2xl p-6 flex gap-4">
              <FaShieldAlt className="text-3xl text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-1">
                  Safety Guarantee
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  All our caretakers undergo strict background checks, NID
                  verification, and professional training.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white dark:bg-[#0a0f1d] border border-gray-100 dark:border-white/10 rounded-2xl p-8 shadow-xl shadow-gray-200/50 dark:shadow-none">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Booking Summary
              </h3>

              <div className="flex justify-between items-end mb-6 pb-6 border-b border-gray-100 dark:border-white/10">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Starting from
                  </p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {service.price}
                  </p>
                </div>
                <span className="text-gray-500 dark:text-gray-400 font-medium mb-1">
                  {service.unit}
                </span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-sm">
                  <FaClock className="text-purple-500" />
                  <span>Flexible duration available</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-sm">
                  <FaMapMarkerAlt className="text-purple-500" />
                  <span>Available in all major cities</span>
                </div>
              </div>

              <Link
                href={`/booking/${service.id}`}
                className="block w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-center transition-all shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 transform hover:-translate-y-0.5"
              >
                Book This Service
              </Link>

              <p className="text-xs text-gray-400 text-center mt-4">
                No payment required until service completion
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
