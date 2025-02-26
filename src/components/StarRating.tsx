import { Star } from "lucide-react";

const StarRating = ({ rating }: { rating: number }) => {
  const roundedRating = Math.round(rating * 2) / 2; 

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i + 0.5 < roundedRating
              ? "fill-yellow-400 text-yellow-400"
              : i < roundedRating
              ? "fill-yellow-400 text-yellow-400 opacity-50"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;
