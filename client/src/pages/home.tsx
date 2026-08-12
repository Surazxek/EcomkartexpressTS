import Footer from "../components/footer/footer";
import Header from "../components/header";
import FeaturedProduct from "../components/landing/featured-product";
import Hero from "../components/landing/hero";
import SummerSale from "../components/landing/summer-sale";



const Homepage = () => {
  return (
      <main>
        {/* Navbar */}
        <Header />
        {/* Hero */}
        <Hero />

        {/* Product Card */}
       
        <FeaturedProduct />
        <SummerSale />





        {/* Content Section  */}
        


        {/* Footer */}

        <Footer />
      </ main>
  );
};

export default Homepage;
