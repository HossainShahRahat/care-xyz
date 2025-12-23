import Link from "next/link";
import Image from "next/image";

const ServiceCard = ({ service }) => {
  const { id, title, description, image, priceRange } = service;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full group">
      <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
        <Image
          src={image || "https://placehold.co/600x400/png"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-purple-700 shadow-sm">
          {priceRange}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
          {title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
          {description}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-50">
          <Link
            href={`/service/${id}`}
            className="block w-full text-center bg-gray-50 hover:bg-purple-600 text-gray-700 hover:text-white font-medium py-2.5 rounded-lg transition-all duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
