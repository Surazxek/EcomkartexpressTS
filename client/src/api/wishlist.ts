import api from "./axios";

export const toggleWishlist = async (productId: string) => {
  const response = await api.post("/wishlist", { productId });
  return response.data;
};

export const getWishlist = async () => {
  const response = await api.get("/wishlist");
  return response.data.data; // populated products
};

export const clearWishlist = async () => {
  const response = await api.delete("/wishlist");
  return response.data;
};
