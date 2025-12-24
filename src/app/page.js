import Link from "next/link";
import Image from "next/image";
import {
  FaUserMd,
  FaChild,
  FaBlind,
  FaArrowRight,
  FaStar,
  FaQuoteLeft,
} from "react-icons/fa";

export default function Home() {
  const services = [
    {
      id: "baby-care",
      title: "Baby Sitting",
      desc: "Trusted care for your little ones with experienced sitters.",
      icon: <FaChild className="text-4xl text-purple-600" />,
      image:
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "elderly-care",
      title: "Elderly Care",
      desc: "Compassionate companionship and assistance for seniors.",
      icon: <FaBlind className="text-4xl text-purple-600" />,
      image:
        "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "sick-care",
      title: "Sick Patient Care",
      desc: "Professional support for recovery and health monitoring.",
      icon: <FaUserMd className="text-4xl text-purple-600" />,
      image:
        "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Working Mom",
      text: "Found an amazing babysitter within hours. Truly a lifesaver!",
      rating: 5,
    },
    {
      name: "Rahim Khan",
      role: "Son of Patient",
      text: "The elderly care service for my father was exceptional. Highly recommended.",
      rating: 5,
    },
    {
      name: "Dr. Farhana",
      role: "Client",
      text: "Professional, verified, and timely service. The platform is very easy to use.",
      rating: 4,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[600px] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white dark:from-black/0 dark:to-[#020410]"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Professional Care <br />
            <span className="text-purple-600">Whenever You Need It</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Connecting families with trusted caregivers. We provide verified
            professionals for baby sitting, elderly care, and patient support
            across the country.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link
              href="/service/all"
              className="px-8 py-4 bg-purple-600 text-white rounded-full font-bold text-lg hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/30"
            >
              Find a Caregiver
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-[#020410]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800"
                alt="About Us"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                At Care.xyz, we believe everyone deserves reliable care. Our
                mission is to make caregiving easy, secure, and accessible for
                everyone. Whether you are a busy parent, have elderly parents,
                or need support for a sick family member, we are here to bridge
                the gap.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
                  <h3 className="text-2xl font-bold text-purple-600">500+</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Verified Carers
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
                  <h3 className="text-2xl font-bold text-purple-600">2000+</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Happy Families
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-[#0a0c1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive care solutions for every stage of life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white dark:bg-[#020410] rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {service.desc}
                </p>
                <Link
                  href={`/service/${service.id}`}
                  className="inline-flex items-center gap-2 text-purple-600 font-bold hover:gap-3 transition-all"
                >
                  View Details <FaArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-[#020410]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
            What Families Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-white/5 p-8 rounded-2xl relative"
              >
                <FaQuoteLeft className="text-4xl text-purple-200 dark:text-purple-900/40 absolute top-4 right-4" />
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                  "{item.text}"
                </p>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {item.name}
                  </h4>
                  <p className="text-sm text-purple-600">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
