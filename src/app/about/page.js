import Image from "next/image";
import {
  FaHandHoldingHeart,
  FaUserShield,
  FaClock,
  FaUsers,
} from "react-icons/fa";

export const metadata = {
  title: "About Us - Care.xyz",
  description: "Learn about our mission to provide trusted care services.",
};

export default function AboutPage() {
  return (
    <div className="pb-16 pt-8">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Making Care Accessible &{" "}
          <span className="text-purple-600 dark:text-purple-400">
            Trustworthy
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          We started Care.xyz with a simple mission: to help families find
          reliable, background-checked caregivers without the stress and
          uncertainty of traditional methods.
        </p>
      </section>

      <section className="mb-20">
        <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1576091160550-217358c7e618?auto=format&fit=crop&q=80&w=1600"
            alt="Caregivers team"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-purple-900/40 mix-blend-multiply"></div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {[
          {
            icon: FaHandHoldingHeart,
            title: "Compassion First",
            desc: "We believe caregiving is not just a job, but a calling. We hire for empathy.",
          },
          {
            icon: FaUserShield,
            title: "100% Verified",
            desc: "Every caregiver undergoes strict NID, police, and reference checks.",
          },
          {
            icon: FaClock,
            title: "Reliable Service",
            desc: "We value your time. Our system ensures punctuality and backup support.",
          },
          {
            icon: FaUsers,
            title: "Family Focused",
            desc: "We tailor our services to fit the unique dynamics of your home.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#020410] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 text-center hover:-translate-y-1 transition-transform"
          >
            <item.icon className="text-4xl text-purple-600 dark:text-purple-400 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      <section className="bg-purple-50 dark:bg-white/5 rounded-3xl p-12 md:p-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Our Journey
          </h2>
          <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              Founded in 2024, Care.xyz noticed a gap in the market for
              professional, accountable home care in Bangladesh. Finding a
              sitter or elderly companion often relied on word-of-mouth, which
              was inconsistent and risky.
            </p>
            <p>
              We built a digital platform that brings transparency to the
              process. By combining technology with human vetting, we have
              served over 500 families in just our first year of operation.
            </p>
            <p>
              Today, we are expanding beyond Dhaka to bring quality care to
              every major city in the country.
            </p>
          </div>
        </div>
        <div className="flex-1 w-full h-[300px] relative rounded-2xl overflow-hidden shadow-lg border border-white/20">
          <Image
            src="https://images.unsplash.com/photo-1559839734-2b71ea86b48e?auto=format&fit=crop&q=80&w=800"
            alt="Doctor shaking hands"
            fill
            className="object-cover"
          />
        </div>
      </section>
    </div>
  );
}
