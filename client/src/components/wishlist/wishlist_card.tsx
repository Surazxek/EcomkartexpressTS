import type { FC } from "react";

export interface IProductData {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  coverImage?: {
    path: string;
    public_id: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface IProps {
  product: IProductData;
  onClick?: () => void; // optional toggle/remove handler
}

const WishlistProductCard: FC<IProps> = ({ product, onClick }) => {
  return (
    <div className="max-w-[300px] flex flex-col px-1">
      {/* Product Image */}
      <div className="h-[180px] w-[200px] aspect-square mx-auto overflow-hidden">
        <img
          src={product.coverImage?.path || "/assets/default-product.png"}
          alt={product.name}
          className="h-full w-full object-contain hover:scale-110 transition-all duration-200"
        />
      </div>

      {/* Product Information */}
      <div className="mt-5">
        <h1 className="text-teal-600 font-bold text-xl line-clamp-1">
          {product.name}
        </h1>
        <p className="line-clamp-2 min-h-[48px]">{product.description}</p>

        <div className="flex mt-2 justify-between text-lg">
          <p>Rs.{product.price}</p>
          <p>
            Stock:{" "}
            <span className={product.stock > 0 ? "text-green-700" : "text-red-600"}>
              {product.stock}
            </span>
          </p>
        </div>

        {/* Toggle button */}
        {onClick && (
          <button
            onClick={onClick}
            className="mt-3 bg-teal-600 text-white px-3 py-1 rounded"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default WishlistProductCard;
