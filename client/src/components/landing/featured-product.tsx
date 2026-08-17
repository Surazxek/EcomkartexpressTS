import ProductCard from "../products/card";
import ComponentTitle from "./componenetTitle.button";

const mockProducts = Array.from({ length: 12 }, (_, i) => ({
  _id: `featured-${i}`,
  name: `Featured Product ${i + 1}`,
  description: "High quality product with excellent features",
  price: 1999 + i * 250,
  stock: 20 + i,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

const FeaturedProduct = () => {
  return (
    <div className="mt-4 px-36">
      <ComponentTitle
        title="Featured Products"
        subTitle="Our featured products"
        key={"featured_component_title"}
        link="#"
      />

      <div className="mt-8 flex flex-wrap gap-6">
        {mockProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;

// import ProductCard from "../products/card"

// const data = Array.from({ length: 10 });

// const FeaturedProduct = () => {
//   return (
//     <div className="mt-4 px-36">
//       <div className="flex justify-between">
//         <div>
//             <h1 className="text-4xl font-bold text-teal-700">Featured Products</h1>
//         </div>
//         <div>
//             <p>Explore All</p>
//         </div>
//       </div>
//       <div  className="mt-4 flex  flex-wrap gap-6">
//        {[1,2,3,4,5,6].map(() =>{
//         return  <ProductCard />
//        })}
//       </div>
//     </div>
//   )
// }

// export default FeaturedProduct
