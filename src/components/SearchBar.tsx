"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery !== initialQuery) {
      const params = new URLSearchParams();
      if (debouncedQuery) params.set("q", debouncedQuery);
      router.push(`/products/search?${params.toString()}`, { scroll: false });
    }
  }, [debouncedQuery, initialQuery, router]);

  return (
    <div className="relative w-full max-w-lg">
      <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
