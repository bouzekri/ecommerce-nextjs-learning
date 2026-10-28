'use client';

import { useProductContext } from "@/app/hooks/ProductContext";
import { Product } from "@/app/types/ProductType";
import { fetchImage } from "@/app/utils/Util";
import Link from "next/link";
import { ChangeEvent } from "react";

export default function Navbar() {
    const { search, setSearch, setProducts } = useProductContext();

    const fetchProductByKeyword = async (keyword: string) => {
        const response = await fetch(`http://localhost:8080/api/v1/products/search?keyword=${encodeURIComponent(keyword)}`);

        const products = await response.json() as Product[];

        const allProductsImage = await Promise.all(
            products.map(async (product: Product) => {
              if (product.id) {
                product.imageSrc = await fetchImage(product.id);
              }
              return product;
            })
          );


        setProducts(allProductsImage);
    }

    const changeName = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearch(value);

        fetchProductByKeyword(value);
    } 

    return <div className="bg-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex gap-4 items-center">
            <div>
                <span>ECOMMERCE</span>
            </div>

            <div>
                <input
                    type="search"
                    placeholder="Search by name ..."
                    onChange={(e) => changeName(e)}
                    value={search}
                    className="outline-none border border-gray-300 p-2 text-sm rounded-sm focus:border-2 focus:border-gray-600"
                />
            </div>

            <div className="flex-1"></div>

            <ul className="flex">
                <li className="border-r-2 px-4">
                    <Link className="hover:border-b-2 pb-1" href={'/'}>HomePage</Link>
                </li>
                <li className="px-4">
                    <Link className="hover:border-b-2 pb-1" href={'/add'}>Add product</Link>
                </li>
            </ul>
        </div>
    </div>
}