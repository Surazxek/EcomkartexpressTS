import ProductCard from "../products/card";
import ComponentTitle from "./componenetTitle.button";

const mockSaleProducts = Array.from({ length: 12 }, (_, i) => ({
  _id: `sale-${i}`,
  name: `Summer Sale Product ${i + 1}`,
  description: "Limited time summer sale - Special discounted price",
  price: 1499 + i * 180,
  stock: 15 + i,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

const SummerSale = () => {
  return (
    <div className="mt-4 px-36">
      <ComponentTitle
        title="Summer-sale 2026"
        subTitle=" Special SummerSale"
        key={"summer_sale_component_title"}
        link="#"
      />

      <div className="mt-8 flex flex-wrap gap-6">
        {mockSaleProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SummerSale;
