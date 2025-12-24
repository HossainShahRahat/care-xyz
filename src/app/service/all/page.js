"use client";
import { useState } from "react";
import ServiceCard from "@/components/ServiceCard";
import { FaSearch } from "react-icons/fa";

const allServices = [
  {
    id: "baby-care",
    title: "Baby Sitting",
    description:
      "Professional and caring babysitters to ensure your child is safe, happy, and engaged.",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800",
    priceRange: "From 500৳/hr",
    category: "Childcare",
  },
  {
    id: "elderly-care",
    title: "Elderly Care",
    description:
      "Compassionate companionship and assistance for your elderly loved ones.",
    image:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800",
    priceRange: "From 400৳/hr",
    category: "Elderly",
  },
  {
    id: "sick-care",
    title: "Sick People Service",
    description:
      "Specialized care for patients recovering at home after surgery or illness.",
    image:
      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800",
    priceRange: "From 600৳/hr",
    category: "Medical",
  },
  {
    id: "physiotherapy",
    title: "Home Physiotherapy",
    description:
      "Certified physiotherapists providing rehab sessions at your convenience.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    priceRange: "From 1000৳/session",
    category: "Medical",
  },
  {
    id: "pet-care",
    title: "Pet Sitting",
    description:
      "Loving care for your furry friends while you are away. Dog walking and feeding included.",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800",
    priceRange: "From 300৳/hr",
    category: "Pet Care",
  },
  {
    id: "house-help",
    title: "Domestic Help",
    description:
      "Verified maids for cleaning, cooking, and daily household chores.",
    image:
      "https://images.unsplash.com/photo-1581578731117-10d52143b0e8?auto=format&fit=crop&q=80&w=800",
    priceRange: "From 400৳/hr",
    category: "Household",
  },
];

export default function AllServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Childcare",
    "Elderly",
    "Medical",
    "Pet Care",
    "Household",
  ];

  const filteredServices = allServices.filter((service) => {
    const matchesSearch = service.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pb-16 pt-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Find the Perfect Care
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse our complete list of verified services designed for your
          family's well-being.
        </p>
      </div>

      <div className="mb-12 space-y-6">
        <div className="max-w-md mx-auto relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for a service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0f1d] text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none shadow-sm transition-all"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/25"
                  : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No services found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
            className="mt-4 text-purple-600 dark:text-purple-400 font-medium hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
