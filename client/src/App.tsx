import "./App.css";
import Homepage from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { BrowserRouter as Router, Routes, Route } from "react-router";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
