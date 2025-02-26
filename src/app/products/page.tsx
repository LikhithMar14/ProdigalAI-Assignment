import { Product, ProductRawData } from "@/types/product.types";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const PaginatedProductPage = async ({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {
  const page = parseInt((await searchParams).page || "1");
  const pageSize = 6; 

  const res = await fetch(`https://fakestoreapi.com/products?limit=${pageSize}&skip=${(page - 1) * pageSize}`, {
    next: { revalidate: 60 },
  });
  const rawProductsData: ProductRawData[] = await res.json();

  const products: Product[] = rawProductsData.map((product) => ({
    ...product,
    price: parseFloat(product.price),
    rating: {
      rate: parseFloat(product.rating.rate),
      count: parseInt(product.rating.count),
    },
  }));

  const totalRes = await fetch("https://fakestoreapi.com/products", { next: { revalidate: 60 } });
  const totalProducts: ProductRawData[] = await totalRes.json();
  const totalPages = Math.ceil(totalProducts.length / pageSize);

  return (
    <div className="container mx-auto p-6 flex flex-col min-h-screen">
      {/* Scrollable Product Grid */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Sticky Footer for Pagination */}
      <div className="bg-white shadow-md border-t p-4 flex justify-center gap-2 sticky bottom-0 w-full">
        {page > 1 && (
          <Link
            href={`?page=${page - 1}`}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition"
          >
            Previous
          </Link>
        )}

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <Link
            key={index + 1}
            href={`?page=${index + 1}`}
            className={`px-4 py-2 rounded-md transition ${
              page === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </Link>
        ))}

        {page < totalPages && (
          <Link
            href={`?page=${page + 1}`}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
};

export default PaginatedProductPage;