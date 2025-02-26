import { Product, ProductRawData } from "@/types/product.types";
import SingleProductComponent from "@/components/SingleProductComponent";
import BackToHome from "@/components/BackButton";

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

    return (
      <div className="relative min-h-screen p-6">
        <div className="mb-4">
          <BackToHome />
        </div>
  
        <SingleProductComponent product={product} />
      </div>
    );
};




export default SingleProductPage;
