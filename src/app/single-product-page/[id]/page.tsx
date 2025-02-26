import { Product, ProductRawData } from "@/types/product.types";
import StarRating from "@/components/StarRating";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import SingleProductComponent from "@/components/SingleProductPage";

const fetchProduct = async (id: string): Promise<Product | null> => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 60 },
    });
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
    return (
      <div className="flex items-center justify-center h-screen text-3xl">
        Product not found
      </div>
    );

  return <SingleProductComponent product={product} />;
};

export default SingleProductPage;
