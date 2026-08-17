import "./App.css";
import ClientLayout from "./layouts/client.layout";
import Aboutus from "./pages/about-us";
import Contactus from "./pages/contact-us";
import Homepage from "./pages/home";
import Login from "./pages/login";
import NotFound from "./pages/page-not-found";
import ProductPage from "./pages/product";
import Register from "./pages/register";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Wishlist from "./pages/wishlist";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<ClientLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/contact-us" element={<Contactus />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/wish_list" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
