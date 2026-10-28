'use client';

import { ReactNode, useState } from "react";
import { Product } from "../types/ProductType";
import { ProductContext } from "../types/ProductContext";

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]); 
  const [search, setSearch] = useState('');

  const addProductToState = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, addProductToState, search, setSearch }}>
      {children}
    </ProductContext.Provider>
  );
}