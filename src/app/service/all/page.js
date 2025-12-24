"use client";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaStar } from "react-icons/fa";

const servicesData = [
  {
    id: "baby-care",
    title: "Baby Sitting",
    description:
      "Professional care for your little ones while you are away. Safe, fun, and educational.",
    price: 500,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "elderly-care",
    title: "Elderly Care",
    description:
      "Compassionate support for seniors. Companionship, medication reminders, and daily assistance.",
    price: 400,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "sick-care",
    title: "Sick People Service",
    description:
      "Dedicated attention for those recovering from illness. Monitoring and assistance with comfort.",
    price: 600,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800",
  },
];

export default function AllServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Our Services
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Choose from our range of professional care services designed to meet
          your family's needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className="group bg-white dark:bg-[#020410] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold shadow-lg">
                <FaStar className="text-yellow-400" />
                <span className="text-gray-900 dark:text-white">
                  {service.rating}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {service.description}
              </p>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-white/5">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Starting at
                  </p>
                  <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {service.price}৳
                    <span className="text-xs font-normal text-gray-400">
                      /hr
                    </span>
                  </p>
                </div>

                <Link
                  href={`/service/${service.id}`}
                  className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm hover:bg-purple-600 dark:hover:bg-purple-500 hover:text-white transition-colors flex items-center gap-2"
                >
                  View Details <FaArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
