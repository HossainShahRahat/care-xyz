import Link from "next/link";
import Image from "next/image";
import ServiceCard from "@/components/ServiceCard";
import { FaUserMd, FaBaby, FaWheelchair, FaHeart } from "react-icons/fa";

export default function Home() {
  const services = [
    {
      id: "baby-care",
      title: "Baby Sitting",
      description:
        "Professional and caring babysitters to ensure your child is safe, happy, and engaged while you are away. We provide certified caregivers.",
      image:
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800",
      priceRange: "From 500৳/hr",
    },
    {
      id: "elderly-care",
      title: "Elderly Care",
      description:
        "Compassionate companionship and assistance for your elderly loved ones. Our services range from daily check-ins to full-time support.",
      image:
        "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800",
      priceRange: "From 400৳/hr",
    },
    {
      id: "sick-care",
      title: "Sick People Service",
      description:
        "Specialized care for patients recovering at home. Our trained attendants help with medication, mobility, and daily hygiene needs.",
      image:
        "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800",
      priceRange: "From 600৳/hr",
    },
  ];

  const stats = [
    { label: "Happy Families", value: "500+" },
    { label: "Verified Caretakers", value: "120+" },
    { label: "Hours of Care", value: "15k+" },
    { label: "Service Areas", value: "24" },
  ];

  return (
    <div className="flex flex-col gap-20 pb-10">
      <section className="relative rounded-3xl overflow-hidden bg-purple-900 text-white min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600"
            alt="Caregiving background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-6 z-10 relative">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Compassionate Care, <br /> Right at Your Doorstep
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              We connect you with trusted professionals for baby sitting,
              elderly support, and special needs care. Your family's well-being
              is our priority.
            </p>
            <div className="flex gap-4">
              <Link
                href="/service/all"
                className="bg-white text-purple-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Find a Caretaker
              </Link>
              <Link
                href="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Our Services
          </h2>
          <p className="text-gray-600">
            Choose from our range of specialized care services designed to meet
            the unique needs of your family members.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="bg-purple-50 rounded-3xl py-16 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                <FaUserMd className="text-4xl text-purple-500 mx-auto mb-2" />
                <h4 className="font-bold">Expert Staff</h4>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm text-center mt-8">
                <FaBaby className="text-4xl text-pink-500 mx-auto mb-2" />
                <h4 className="font-bold">Child Safe</h4>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                <FaWheelchair className="text-4xl text-blue-500 mx-auto mb-2" />
                <h4 className="font-bold">Specialized</h4>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm text-center mt-8">
                <FaHeart className="text-4xl text-red-500 mx-auto mb-2" />
                <h4 className="font-bold">Trusted</h4>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Why Choose Care.xyz?
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our mission is to make caregiving easy, secure, and accessible for
              everyone. We strictly verify all our caretakers to ensure your
              loved ones are in safe hands.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Background checked professionals",
                "24/7 Customer support",
                "Flexible booking hours",
                "Affordable and transparent pricing",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 mb-10">
        <div className="bg-gray-900 rounded-3xl p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <h3 className="text-4xl font-bold text-purple-400 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
