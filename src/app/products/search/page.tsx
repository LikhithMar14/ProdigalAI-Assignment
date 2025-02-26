"use client";

import { useSearchParams } from "next/navigation";
import { mockData } from "@/lib/constants";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const filteredProducts = mockData.filter(
    (product) =>
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
  );

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <Link href="/">
          <Button variant="outline">← Go Back</Button>
        </Link>
        <SearchBar />
      </div>

      <h2 className="text-2xl font-bold mb-4">
        Search Results {query && <span className="text-muted-foreground">for "{query}"</span>}
      </h2>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link href={`/single-product-page/${product.id}`} key={product.id}><ProductCard key={product.id} product={product} /></Link>
          ))}
        </div>
      ) : (
        <div className="text-center mt-10">
          <p className="text-lg text-muted-foreground">No results found for "{query}".</p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
