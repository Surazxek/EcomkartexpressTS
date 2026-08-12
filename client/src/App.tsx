import "./App.css";
import Aboutus from "./pages/about-us";
import Contactus from "./pages/contact-us";
import Homepage from "./pages/home";
import Login from "./pages/login";
import NotFound from "./pages/page-not-found";
import ProductPage from "./pages/product";
import Register from "./pages/register";
import { BrowserRouter as Router, Routes, Route } from "react-router";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/contact-us" element={<Contactus />} />
        <Route path="/about-us" element={<Aboutus />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
