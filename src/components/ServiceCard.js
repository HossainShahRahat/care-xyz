import Link from "next/link";
import Image from "next/image";

const ServiceCard = ({ service }) => {
  const { id, title, description, image, priceRange } = service;

  return (
    <div className="bg-white dark:bg-[#0f172a]/50 dark:backdrop-blur-sm dark:border-white/10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full group">
      <div className="relative h-56 w-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
        <Image
          src={image || "https://placehold.co/600x400/png"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 right-4 bg-white/95 dark:bg-[#020410]/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-purple-700 dark:text-purple-300 shadow-sm">
          {priceRange}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {title}
        </h3>

        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
          {description}
        </p>

        <div className="mt-auto pt-5 border-t border-gray-50 dark:border-white/5">
          <Link
            href={`/service/${id}`}
            className="block w-full text-center bg-gray-50 dark:bg-white/5 hover:bg-purple-600 dark:hover:bg-purple-600 text-gray-700 dark:text-gray-200 hover:text-white font-medium py-3 rounded-xl transition-all duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
