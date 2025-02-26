import { Star } from "lucide-react";

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < fullStars
              ? "fill-yellow-400 text-yellow-400" 
              : i === fullStars && hasHalfStar
              ? "fill-yellow-400 text-yellow-400 opacity-50" 
              : "fill-gray-200 text-gray-200" 
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;
