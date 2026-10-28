import { Product } from "@/app/types/ProductType"
import { redirect } from 'next/navigation';
import Image from "next/image"
import Link from "next/link"
import { MouseEvent } from "react"

type productProps = {
    product: Product
}

export default function ProductItem({ product }: productProps) {

    const deleteProduct = async (event: MouseEvent<HTMLButtonElement>, productId?: number) => {
        event.preventDefault();

        const response = await fetch(`http://localhost:8080/api/v1/products/${productId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errorData = await response.json().catch((err) => console.error(err));
            const backendMessage = errorData?.message || `Server responded with status ${response.status}`;
            throw new Error(backendMessage);
        }
        
        redirect('/');

    }

    return <div className="shadow-lg">
        <Link href={`/add/${product.id}`}>
            {
                product.imageSrc && <div className="">
                    <Image className="w-full" width={100} height={100} src={product.imageSrc} alt={product.name} />
                </div>
            }
            
            <div className="p-7">
                <div className="">
                    <h2 className="text-2xl">{product.name}</h2>
                </div>

                <div className="text-gray-700 mt-4">
                    {product.description}
                </div>

                <div className="text-gray-500 mt-2">
                    <span>{product.price}</span>
                </div>

                <div className="flex">
                    <button onClick={async (event) => await deleteProduct(event, product.id)} className="ml-auto text-gray-200 bg-red-700 mt-2 cursor-pointer py-1 px-2 shadow-sm block w-fit">
                        Delete Product
                    </button>
                </div>
            </div>
        </Link>
    </div>
}