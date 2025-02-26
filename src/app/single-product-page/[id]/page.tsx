import { Product, ProductRawData } from "@/types/product.types";
import StarRating from "@/components/StarRating";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const fetchProduct = async (id: string): Promise<Product | null> => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;

    const data: ProductRawData = await res.json();
    return {
      ...data,
      price: parseFloat(data.price),
      rating: {
        rate: parseFloat(data.rating.rate),
        count: parseInt(data.rating.count),
      },
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};


export const generateStaticParams = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) return [];

    const products: ProductRawData[] = await res.json();
    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching product list:", error);
    return [];
  }
};

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const product = await fetchProduct(id);
  if (!product)
    return <div className="flex items-center justify-center h-screen text-xl">Product not found</div>;

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="max-w-4xl w-full flex flex-col lg:flex-row gap-10 items-center">
        
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            priority
            className="rounded-lg object-contain max-w-[80%] lg:max-w-full"
          />
        </div>


        <Card className="w-full lg:w-1/2 shadow-lg">
          <CardContent className="p-6 flex flex-col gap-4">
            <h1 className="text-2xl md:text-3xl font-semibold text-center lg:text-left">
              {product.title}
            </h1>
            <p className="text-gray-600 text-sm md:text-base text-center lg:text-left">
              {product.category}
            </p>
            <Separator />


            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <StarRating rating={product.rating.rate} />
              <span className="text-gray-600 text-sm md:text-base">
                ({product.rating.count} reviews)
              </span>
            </div>


            <p className="text-3xl md:text-4xl font-bold text-green-600 text-center lg:text-left">
              ${product.price.toFixed(2)}
            </p>


            <p className="text-gray-700 md:text-lg text-center lg:text-left">
              {product.description}
            </p>


            <div className="flex justify-center lg:justify-start">
              <Button className="mt-2 w-full lg:w-1/2">Add to Cart</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SingleProductPage;
