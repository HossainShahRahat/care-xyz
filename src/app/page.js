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
    <div className="flex flex-col gap-24 pb-12 pt-8">
      <section className="relative rounded-[2rem] overflow-hidden bg-[#1e1b4b] dark:bg-[#0f0e24] text-white min-h-[550px] flex items-center shadow-2xl shadow-purple-900/20">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
          <Image
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600"
            alt="Caregiving background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#1e1b4b] via-[#1e1b4b]/80 to-transparent z-0"></div>

        <div className="container mx-auto px-8 z-10 relative">
          <div className="max-w-2xl">
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md text-sm font-medium mb-6 border border-white/20 text-purple-200">
              #1 Trusted Care Platform
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              Compassionate Care, <br /> Right at Your Doorstep
            </h1>
            <p className="text-lg md:text-xl mb-10 text-gray-300 max-w-lg leading-relaxed">
              We connect you with trusted professionals for baby sitting,
              elderly support, and special needs care. Your family's well-being
              is our priority.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/service/all"
                className="bg-white text-purple-900 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                Find a Caretaker
              </Link>
              <Link
                href="/about"
                className="border border-white/30 bg-white/5 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all"
              >
                How it Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Our Services
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
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

      <section className="bg-purple-50 dark:bg-white/5 rounded-[2.5rem] py-20 px-8 border border-transparent dark:border-white/5">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#0f1221] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 text-center transform hover:-translate-y-1 transition-transform duration-300">
                <FaUserMd className="text-4xl text-purple-500 mx-auto mb-4" />
                <h4 className="font-bold text-gray-900 dark:text-white">
                  Expert Staff
                </h4>
              </div>
              <div className="bg-white dark:bg-[#0f1221] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 text-center mt-8 transform hover:-translate-y-1 transition-transform duration-300">
                <FaBaby className="text-4xl text-pink-500 mx-auto mb-4" />
                <h4 className="font-bold text-gray-900 dark:text-white">
                  Child Safe
                </h4>
              </div>
              <div className="bg-white dark:bg-[#0f1221] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 text-center transform hover:-translate-y-1 transition-transform duration-300">
                <FaWheelchair className="text-4xl text-blue-500 mx-auto mb-4" />
                <h4 className="font-bold text-gray-900 dark:text-white">
                  Specialized
                </h4>
              </div>
              <div className="bg-white dark:bg-[#0f1221] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 text-center mt-8 transform hover:-translate-y-1 transition-transform duration-300">
                <FaHeart className="text-4xl text-red-500 mx-auto mb-4" />
                <h4 className="font-bold text-gray-900 dark:text-white">
                  Trusted
                </h4>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
              Why Choose Care.xyz?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg">
              Our mission is to make caregiving easy, secure, and accessible for
              everyone. We strictly verify all our caretakers to ensure your
              loved ones are in safe hands.
            </p>
            <ul className="space-y-5 mb-10">
              {[
                "Background checked professionals",
                "24/7 Customer support",
                "Flexible booking hours",
                "Affordable and transparent pricing",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 text-gray-700 dark:text-gray-200 font-medium"
                >
                  <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs shadow-lg shadow-green-500/30">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="text-purple-600 dark:text-purple-400 font-bold hover:underline"
            >
              Learn more about our safety standards →
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 mb-8">
        <div className="bg-gray-900 dark:bg-[#0a0f1d] rounded-3xl p-16 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]"></div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-400 font-medium tracking-wide text-sm uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
