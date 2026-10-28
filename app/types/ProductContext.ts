'use client';

import { createContext } from "react";
import { Product } from "./ProductType";

export interface ProductContextType {
    search: string;
    setSearch: (newSearch: string) => void;
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    addProductToState: (newProduct: Product) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export { ProductContext }
