import StarRating from "@/components/StarRating";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Product } from "@/types/product.types";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-contain"
          />
          <Badge className="absolute top-3 right-3 text-xs" variant="secondary">
            {product.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-sm line-clamp-1">{product.title}</h3>
        <div className="flex justify-between items-center mt-2">
          <p className="font-bold text-sm">${product.price.toFixed(2)}</p>
          <div className="flex items-center gap-1">
            <StarRating rating={product.rating.rate} />
            <span className="text-xs text-muted-foreground">
              ({product.rating.count})
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button size="sm">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
