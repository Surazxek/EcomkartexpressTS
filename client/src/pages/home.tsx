
import CategoryList from "../components/landing/category/categoryListcomponenet";
import FeaturedProduct from "../components/landing/featured-product";
import Hero from "../components/landing/hero";
import SummerSale from "../components/landing/summer-sale";



const Homepage = () => {
  return (
      <main>
       
        {/* Hero */}
        <Hero />

        <CategoryList />

        {/* Product Card */}
       
        <FeaturedProduct />
        <SummerSale />





        {/* Content Section  */}
        


      
      </ main>
  );
};

export default Homepage;
