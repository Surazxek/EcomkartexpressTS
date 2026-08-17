import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "../../api/wishlist";
import WishlistProductCard, { type IProductData } from "./wishlist_card";
import ProductCardLoader from "../loaders/porduct-loaders";
import NotFoundCard from "../common/not-found-cards/notFound-card";

const List = () => {
  const { isLoading, isError, data } = useQuery<IProductData[]>({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  const arr = Array.from({ length: 12 }, (_, i) => `wishlist-card-${i}`);

  if (isError) return <NotFoundCard message="Failed to load wishlist." />;
  if (!isLoading && (!data || data.length === 0)) {
    return <NotFoundCard message="Your wishlist is empty." />;
  }

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-4 gap-6">
        {isLoading
          ? arr.map((val) => <ProductCardLoader key={val} />)
          : (data ?? []).map((product) => (
              <WishlistProductCard key={product._id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default List;
