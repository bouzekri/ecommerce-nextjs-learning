export default function Loading() {
  return (
    <div className="container mx-auto px-10 py-9">
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="shadow-lg border border-gray-100 rounded-sm animate-pulse">
            {/* Image Skeleton */}
            <div className="w-full h-[100px] bg-gray-200" />
            
            {/* Content Skeleton */}
            <div className="p-7">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded mt-4 w-full" />
              <div className="h-4 bg-gray-200 rounded mt-2 w-1/4" />
              <div className="flex mt-2">
                <div className="ml-auto h-8 bg-gray-200 rounded w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
