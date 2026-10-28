const fetchImage = async (productId: number): Promise<string | null> => {
    const response = await fetch(`http://localhost:8080/api/v1/products/${productId}/image`);
  
    if (!response.ok) {
      return null;
    }

    const blob = await response.blob();

    return URL.createObjectURL(blob);
}

export { fetchImage };