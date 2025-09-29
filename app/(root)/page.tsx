import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HOME",
};

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

import React from "react";
import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";
import { getFeaturedProducts } from "@/lib/actions/product.actions";
import ProductCarousel from "@/components/shared/product/product-carousel";

const HomePage = async () => {
  const latestProducts = await getLatestProducts();
  const featuredProduct = await getFeaturedProducts();

  return (
    <>
      {featuredProduct.length > 0 && <ProductCarousel data={featuredProduct} />}
      <ProductList data={latestProducts} title="Newest Arrivals" />
    </>
  );
};

export default HomePage;
