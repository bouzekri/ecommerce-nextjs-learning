'use client';

import { useEffect, useState } from "react";
import ProductItem from "./components/product-item/ProductItem";
import { Product } from "./types/ProductType";
import { useProductContext } from "./hooks/ProductContext";
import { fetchImage } from "./utils/Util";

export default function Home() {

  const { products, setProducts } = useProductContext();

  useEffect(() => {

    const fetchAll = async () => {

        const response = await fetch(`http://localhost:8080/api/v1/products`);

        if (response.ok) {
          let allProducts = (await response.json()) as Product[];

          const allProductsImage = await Promise.all(
            allProducts.map(async (product: Product) => {
              if (product.id) {
                product.imageSrc = await fetchImage(product.id);
              }
              return product;
            })
          );

          setProducts(allProductsImage);
        }            
    }

    fetchAll();

  }, []);

  return (
    <div className="container mx-auto px-10 py-9">
      <div className="grid grid-cols-4 gap-4">
        { products.map((product: Product) => {
          return <ProductItem product={product} key={product.id} />;
        })}
      </div>
    </div>
  );
}
