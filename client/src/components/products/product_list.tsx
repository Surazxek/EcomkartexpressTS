import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getAllProducts } from "../../api/product.api";
import { toggleWishlist } from "../../api/wishlist";
import ProductCard from "../products/card";
import ProductCardLoader from "../loaders/porduct-loaders";
import NotFoundCard from "../common/not-found-cards/notFound-card";

interface IProductData {
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

const ALLProductList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery({
    queryFn: getAllProducts,
    queryKey: ["get_all_products"],
  });

  const wishlistMutation = useMutation({
    mutationFn: toggleWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  const handleViewDetails = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const handleWishlistToggle = (productId: string) => {
    wishlistMutation.mutate(productId);
  };

  // Skeleton placeholders
  const arr = Array.from({ length: 12 }, (_, i) => `product-list-${i + 1}`);

  // Error
  if (isError) {
    return (
      <NotFoundCard message="Failed to load products. Please try again later." />
    );
  }

  // Empty products
  if (
    !isLoading &&
    (!data?.data?.products || data.data.products.length === 0)
  ) {
    return <NotFoundCard message="No products found." />;
  }

  return (
    <div className="grid grid-cols-5 gap-6">
      {isLoading
        ? arr.map((val) => <ProductCardLoader key={val} />)
        : data?.data?.products.map((product: IProductData) => (
            <ProductCard
              key={product._id}
              product={product}
              onViewDetails={handleViewDetails}
              onWishlistToggle={handleWishlistToggle}
            />
          ))}
    </div>
  );
};

export default ALLProductList;
