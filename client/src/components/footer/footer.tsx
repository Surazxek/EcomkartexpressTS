import logo from "../../assets/MERNKART.jpg";

const Footer = () => {
  return (
    <footer className="mt-20 bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-36 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <img
              src={logo}
              alt="Logo"
              className="h-16 w-auto object-contain"
            />

            <p className="mt-4 text-sm text-slate-300 leading-7">
              Your trusted online marketplace in Nepal. Discover quality
              products, unbeatable deals, and fast delivery all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold">Quick Links</h2>

            <ul className="mt-4 space-y-3 text-slate-300">
              <li className="cursor-pointer hover:text-teal-400">Home</li>
              <li className="cursor-pointer hover:text-teal-400">Products</li>
              <li className="cursor-pointer hover:text-teal-400">Categories</li>
              <li className="cursor-pointer hover:text-teal-400">About Us</li>
              <li className="cursor-pointer hover:text-teal-400">Contact</li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h2 className="text-lg font-semibold">Customer Support</h2>

            <ul className="mt-4 space-y-3 text-slate-300">
              <li className="cursor-pointer hover:text-teal-400">
                Help Center
              </li>
              <li className="cursor-pointer hover:text-teal-400">
                Shipping Policy
              </li>
              <li className="cursor-pointer hover:text-teal-400">
                Return Policy
              </li>
              <li className="cursor-pointer hover:text-teal-400">
                Privacy Policy
              </li>
              <li className="cursor-pointer hover:text-teal-400">
                Terms & Conditions
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold">Contact Us</h2>

            <div className="mt-4 space-y-3 text-slate-300">
              <p>Balkumari, Lalitpur, Nepal</p>
              <p>+977 98XXXXXXXX</p>
              <p>support@yourstore.com</p>
              <p>Sun - Fri | 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-700 pt-6 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} YourStore. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;