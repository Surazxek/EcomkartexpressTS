import React from "react";

const ProductCardLoader: React.FC = () => {
  return (
    <div className="p-4 flex flex-col items-center gap-2 bg-[#f8f8f8] rounded-md animate-pulse min-h-[400px]">
      {/* shimmer icon */}
      <div
        aria-hidden="true"
        className="w-[180px] h-[180px] bg-gray-300 rounded-full"
      />

      {/* shimmer text */}
      <div aria-hidden="true" className="w-full h-4 bg-gray-300 rounded mb-1" />
      <div aria-hidden="true" className="w-full h-4 bg-gray-300 rounded mb-1" />

      <div className="flex-1 w-full">
        <div aria-hidden="true" className="w-10 h-4 bg-gray-300 rounded mb-1" />
        <div aria-hidden="true" className="w-10 h-3 bg-gray-200 rounded" />
      </div>

      <div className="flex-1 flex justify-between w-full">
        <div aria-hidden="true" className="h-6 w-20 bg-gray-300 rounded mb-1" />
        <div aria-hidden="true" className="h-6 w-20 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default ProductCardLoader;
