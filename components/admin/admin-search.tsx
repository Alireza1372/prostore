"use client";
import { Input } from "@/components/ui/input";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
const AdminSearch = () => {
  const pathName = usePathname();
  const formActionUrl = pathName.includes("/admin/orders")
    ? "/admin/orders"
    : pathName.includes("/admin/users")
    ? "/admin/users"
    : "/admin/products";

  const searchParams = useSearchParams();

  const [queryValue, setQueryValue] = useState(searchParams.get("query") || "");

  useEffect(() => {
    setQueryValue(searchParams.get("query") || "");
  }, [searchParams]);
  return (
    <form action={formActionUrl} method="GET">
      <Input
        type="search"
        placeholder="search..."
        name="query"
        value={queryValue}
        onChange={(e) => setQueryValue(e.target.value)}
        className="md:w-[100px] lg:w-[300px]"
      />
      <button className="sr-only" type="submit">
        Search
      </button>
    </form>
  );
};

export default AdminSearch;
