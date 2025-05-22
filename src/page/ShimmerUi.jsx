// components/MenuCardSkeleton.jsx
function ShimmerUi() {
  return (
    <div className="bg-white/5 backdrop-blur rounded-xl shadow-md p-4 animate-pulse space-y-4">
      <div className="h-40 bg-gray-700 rounded-md w-full" />
      <div className="h-4 bg-gray-600 rounded w-3/4" />
      <div className="h-3 bg-gray-600 rounded w-1/2" />
      <div className="h-8 bg-gray-700 rounded w-full" />
    </div>
  );
}

export default ShimmerUi;
