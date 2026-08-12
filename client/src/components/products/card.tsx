import ProductImage from "../../assets/ProductImage.webp";

const ProductCard = () => {
  return (
    <div className="max-w-[300px] flex flex-col px-1 ">
      {/* Image */}
      <div className="h-[180px] w-[200px] aspect-square mx-auto ">
        <img
          src={ProductImage}
          alt="ProductImage"
          className="h-full w-full object-contain hover:scale-110 transition-all duration-200"
        />
      </div>

      <div className="mt-5">
        <h1 className="text-teal-600 font-bold text-xl line-clamp-1">
          DHI-PM16-F201SDT
        </h1>
        <p>
          1920*1080 Full HD | IPS Display | Touch Control | USB-C | HDMI | Ideal
          for Productivity & Entertainment
        </p>
       
       <div className="flex mt-2 justify-between text-lg">
        <p>Rs.30000</p>
        <p>Stock: <span className="text-green-700">10</span></p>
       </div>

      </div>
      <div className="flex justify-between items-center mt-5 gap-3">
        <button className="flex-1 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-700 cursor-pointer">
          View Details
        </button>

        <button className=" flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-teal-600 hover:text-teal-600 ursor-pointer">
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
