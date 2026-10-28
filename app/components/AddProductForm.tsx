'use client';

import { ChangeEvent, SubmitEvent, useEffect, useState } from "react";
import { Product } from "../types/ProductType";
import { notFound, redirect } from "next/navigation";

interface AddProductFormProps {
    productId?: string;
}

export default function AddProductForm({ productId } : AddProductFormProps) {
    const resetProduct = (): Product => ({
        id: 0,
        name: '',
        description: '',
        price: 0,
        imageSrc: null
    });

    const [product, setProduct] = useState<Product>(resetProduct());
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {

        if (!productId) {
            return;
        }

        const fetchProduct = async (productId: string) => {

            const response = await fetch(`http://localhost:8080/api/v1/products/${productId}`);

            if (response.ok) {
                const currentProduct = (await response.json()) as Product;
    
                setProduct(currentProduct);
            }            

        }

        fetchProduct(productId);

    }, [productId]);

    const onChangeField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        setProduct((previousProduct) => ({
            ...previousProduct,
            [name]: (name.includes('id') || name.includes('price')) ? (value != '' ? parseInt(value) : 0) : value
        }));
    }

    const onChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const selectedFile = files[0];

            setImage(selectedFile);
        }
    }

    const addProduct = async (product: Product, image: File | null) => {
        const formData : FormData = new FormData();

        if (!productId) {
            delete product.id;
        }

        formData.append(
            'product',
            new Blob([JSON.stringify(product)], { type: 'application/json' })
        );

        if (image) {
            formData.append('image', image);
        }

        const response = await fetch(`http://localhost:8080/api/v1/products`, {
            method: productId ? 'PUT' : 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json().catch((err) => console.error(err));
            const backendMessage = errorData?.message || `Server responded with status ${response.status}`;
            throw new Error(backendMessage);
        } else {
            redirect('/');
        }

    }

    const submit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        addProduct(product, image);
    }

    return <div className="pt-10">
        <fieldset className="w-[25%] m-auto">
            <legend className="pb-5">
                <h2 className="text-2xl border-b-3">ADD PRODCUCT</h2>
            </legend>

            <form className="flex flex-col" onSubmit={(e) => submit(e)}>
                <input type="hidden" value={product.id} />

                <div className="flex flex-col pt-4">
                    <label>Name : </label>
                    <input
                        type="text"
                        placeholder="Enter the name ..."
                        name="name"
                        onChange={(e) => onChangeField(e)}
                        value={product.name}
                        className="outline-none border border-gray-300 p-2 text-sm rounded-sm focus:border-2 focus:border-gray-600"
                    />
                </div>

                <div className="flex flex-col pt-4">
                    <label>Description : </label>
                    <textarea
                        placeholder="Enter the description ..."
                        name="description"
                        onChange={(e) => onChangeField(e)}
                        value={product.description}
                        className="outline-none border border-gray-300 p-2 text-sm rounded-sm focus:border-2 focus:border-gray-600"
                    />
                </div>

                <div className="flex flex-col pt-4">
                    <label>Price : </label>
                    <input
                        placeholder="Enter the price ..."
                        type="text"
                        name="price"
                        onChange={(e) => onChangeField(e)}
                        value={product.price}
                        className="outline-none border border-gray-300 p-2 text-sm rounded-sm focus:border-2 focus:border-gray-600"
                    />
                </div>

                <div className="flex flex-col pt-4">
                    <label>Image : </label>
                    <input
                        type="file"
                        accept="image/*"
                        placeholder="Select the image ..."
                        name="image"
                        onChange={(e) => onChangeImage(e)}
                        className="outline-none border border-gray-300 p-2 text-sm rounded-sm focus:border-2 focus:border-gray-600"
                    />
                </div>

                <div className="flex flex-col pt-4">
                    <button
                        className="ml-auto inline-block bg-blue-700 text-gray-100 w-fit py-1 px-3 rounded-sm shadow-sm cursor-pointer"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </fieldset>
    </div>
}