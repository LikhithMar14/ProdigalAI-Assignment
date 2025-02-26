import { Product, ProductRawData } from "@/types/product.types";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { StickyPagination } from "@/components/Pagination";
import { redirect } from "next/navigation";

const pageSize = 6;

export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  const totalPages = Math.ceil(products.length / pageSize);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

const PaginatedProductPage = async ({ params }: { params: Promise<{ page?: string }> }) => {
  const page = Number((await params).page) || 1; 


  const res = await fetch("https://fakestoreapi.com/products", { next: { revalidate: 60 } });
  const rawProductsData: ProductRawData[] = await res.json();

  const totalProducts = rawProductsData.length;
  const totalPages = Math.ceil(totalProducts / pageSize);

  if (page < 1 || page > totalPages){
    redirect("/products/1")
  }
  
  const startIndex = (page - 1) * pageSize;
  const products = rawProductsData.slice(startIndex, startIndex + pageSize).map((product) => ({
    ...product,
    price: parseFloat(product.price),
    rating: {
      rate: parseFloat(product.rating.rate),
      count: parseInt(product.rating.count),
    },
  }));
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-6 flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link href={`/single-product-page/${product.id}`} key={product.id}><ProductCard key={product.id} product={product} /></Link>
          ))}
        </div>
      </div>
  
      <StickyPagination currentPage={page} totalPages={totalPages} basePath="/products" />
    </div>
  );
  


};

export default PaginatedProductPage;
