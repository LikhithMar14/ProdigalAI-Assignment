import { Product, ProductRawData } from "@/types/product.types";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { StickyPagination } from "@/components/Pagination";
import { redirect } from "next/navigation";
import SearchBar from "@/components/SearchBar";

const pageSize = 6;

export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  const totalPages = Math.ceil(products.length / pageSize);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

const PaginatedProductPage = async ({
  params,
}: {
  params: Promise<{ page?: string }>;
}) => {
  const page = Number((await params).page) || 1;

  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 60 },
  });
  const rawProductsData: ProductRawData[] = await res.json();

  const totalProducts = rawProductsData.length;
  const totalPages = Math.ceil(totalProducts / pageSize);

  if (page < 1 || page > totalPages) {
    redirect("/products/1");
  }

  const startIndex = (page - 1) * pageSize;
  const products = rawProductsData
    .slice(startIndex, startIndex + pageSize)
    .map((product) => ({
      ...product,
      price: parseFloat(product.price),
      rating: {
        rate: parseFloat(product.rating.rate),
        count: parseInt(product.rating.count),
      },
    }));

  return (
    <div className="relative flex flex-col items-center min-h-screen">
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 p-4">
        <div className="flex items-center justify-center">
          <SearchBar />
        </div>
      </div>

      <div className="w-full max-w-6xl mt-24 mb-20 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/single-product-page/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>

      <StickyPagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/products"
      />
    </div>
  );
};

export default PaginatedProductPage;
