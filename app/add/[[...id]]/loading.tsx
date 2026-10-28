export default function Loading() {
  return (
    <div className="p-6">
      <div className="m-auto animate-pulse flex flex-col gap-4 max-w-sm">
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
        <div className="h-9 bg-gray-400 rounded w-24 ml-auto"></div>
      </div>
    </div>
  );
}