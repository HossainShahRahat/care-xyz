import Image from "next/image";
import { notFound } from "next/navigation";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import BookingAction from "@/components/BookingAction";

const SERVICES = {
  "baby-care": {
    id: "baby-care",
    title: "Baby Sitting",
    price: 500,
    rating: 4.8,
    desc: "Professional care for your little ones while you are away. Safe, fun, and educational.",
    longDesc:
      "Our verified babysitters provide attentive, engaging, and safe care for children of all ages. Whether you need a few hours for a date night or regular daily assistance, our professionals are trained in child safety, first aid, and age-appropriate activities.",
    features: [
      "Certified Caregivers",
      "Background Checked",
      "First Aid Trained",
      "Educational Activities",
    ],
    img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800",
  },
  "elderly-care": {
    id: "elderly-care",
    title: "Elderly Care",
    price: 400,
    rating: 4.9,
    desc: "Compassionate support for seniors. Companionship, medication reminders, and daily assistance.",
    longDesc:
      "We provide respectful and dignified care for seniors. Our caregivers assist with daily living activities, medication management, and provide meaningful companionship to combat loneliness and ensure safety at home.",
    features: [
      "Medication Reminders",
      "Mobility Assistance",
      "Companionship",
      "Personal Hygiene Support",
    ],
    img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800",
  },
  "sick-care": {
    id: "sick-care",
    title: "Sick People Service",
    price: 600,
    rating: 4.7,
    desc: "Dedicated attention for those recovering from illness. Monitoring and assistance with comfort.",
    longDesc:
      "Specialized care for patients recovering from surgery or managing chronic illnesses. Our team monitors vitals, ensures comfort, and assists with recovery plans prescribed by healthcare professionals.",
    features: [
      "Vitals Monitoring",
      "Post-Op Care",
      "Recovery Support",
      "24/7 Availability",
    ],
    img: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800",
  },
};

export async function generateMetadata({ params }) {
  const { serviceId } = await params;
  const data = SERVICES[serviceId];

  if (!data) return { title: "Not Found" };

  return {
    title: `${data.title} - Care.xyz`,
    description: data.desc,
  };
}

export default async function ServiceDetails({ params }) {
  const { serviceId } = await params;
  const service = SERVICES[serviceId];

  if (!service) notFound();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020410] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#0a0c1a] rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-[400px] lg:h-full min-h-[400px]">
              <Image
                src={service.img}
                alt={service.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-6 left-6 bg-white/90 dark:bg-black/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <FaStar className="text-yellow-400 text-lg" />
                <span className="font-bold text-gray-900 dark:text-white">
                  {service.rating} / 5.0
                </span>
              </div>
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {service.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {service.longDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {service.features.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <FaCheckCircle className="text-purple-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-gray-100 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Service Rate
                  </p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {service.price}৳{" "}
                    <span className="text-lg text-gray-400 font-normal">
                      /hour
                    </span>
                  </p>
                </div>

                <BookingAction serviceId={service.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
