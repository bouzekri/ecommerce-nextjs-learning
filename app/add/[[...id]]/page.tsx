import AddProductForm from "@/app/components/AddProductForm";

type PageProps = {
    params: Promise<{
        id?: string[]
    }>;
};

export default async function AddProduct({ params } : PageProps) {

    const resolvedParams = await params;
  
    const [id, ...extraSegments] = resolvedParams.id || [];

    return <AddProductForm productId={id} />
}