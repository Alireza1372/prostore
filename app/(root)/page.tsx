import { Metadata } from "next";
import sampleData from "@/db/sample-data";
export const metadata: Metadata = {
  title: "HOME",
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

import React from "react";
import ProductList from "@/components/shared/product/product-list";

const HomePage = async () => {
  // await delay(2000);
  return (
    <>
      <ProductList data={sampleData.products} title="Newest Arrivals" limit={4}/>
    </>
  );
};

export default HomePage;
