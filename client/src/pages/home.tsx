import { Link } from "react-router";
import logo from "../assets/Logo.png";

const Homepage = () => {
  return (
    <>
      <main h-full flex-col justify-center>
        <nav className="bg-teal-600 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Logo */}
              <img
                src={logo}
                alt="Logo"
                className="h-20 w-20 rounded-full bg-white object-contain p-1 shadow-sm ring-1 ring-white/80"
              />

              
              <input
                type="text"
                placeholder="Search..."
                className="bg-white rounded-3xl px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
            </div>

            <ol className="flex gap-6">
              <li>
                <Link
                  to="/"
                  className="text-white hover:text-teal-200 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white hover:text-teal-200 transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-white hover:text-teal-200 transition"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white hover:text-teal-200 transition"
                >
                  Contact
                </Link>
              </li>
            </ol>
          </div>
        </nav>
      </main>
    </>
  );
};

export default Homepage;
