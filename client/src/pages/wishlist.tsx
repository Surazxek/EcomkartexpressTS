// import ComponentTitle from "../components/landing/componenetTitle.button";
// import WishlistProductCard from "../components/wishlist/wishlist_card";

// const Wishlist = () => {
//   return (
//     <main className="px-36">
//       <ComponentTitle
//         title={"Your Favorites"}
//         subTitle={"Your saved products, all in one place"}
//       />

//       {/* wishlist products */}

//       <div>
//         {/* <WishlistProductCard /> */}
//       </div>
//     </main>
//   );
// };

// export default Wishlist;

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWishlist, toggleWishlist, clearWishlist } from "../api/wishlist";
import WishlistProductCard, {
  type IProductData,
} from "../components/wishlist/wishlist_card";
import ProductCardLoader from "../components/loaders/porduct-loaders";
import NotFoundCard from "../components/common/not-found-cards/notFound-card";

const Wishlist = () => {
  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery<IProductData[]>({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  const toggleMutation = useMutation({
    mutationFn: toggleWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  const clearMutation = useMutation({
    mutationFn: clearWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  const arr = Array.from({ length: 12 }, (_, i) => `wishlist-card-${i}`);

  if (isError) return <NotFoundCard message="Failed to load wishlist." />;
  if (!isLoading && (!data || data.length === 0)) {
    return <NotFoundCard message="Your wishlist is empty." />;
  }

  return (
    <main className="px-36">
      <h1 className="text-2xl font-bold">Your Favorites</h1>

      <button
        onClick={() => clearMutation.mutate()}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Clear Wishlist
      </button>

      <div className="grid grid-cols-4 gap-6 mt-6">
        {isLoading
          ? arr.map((val) => <ProductCardLoader key={val} />)
          : (data ?? []).map((product) => (
              <WishlistProductCard
                key={product._id}
                product={product}
                onClick={() => toggleMutation.mutate(product._id)}
              />
            ))}
      </div>
    </main>
  );
};

export default Wishlist;
