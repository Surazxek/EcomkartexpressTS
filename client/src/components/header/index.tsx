import MERNKART from "../../assets/MERNKART.jpg";
import { IconSection } from "./icons";
import { NavLinks } from "./nav-links";




const Header = () => {
  return (
   <nav className="">
     <div className="flex w-full justify-between items-center px-36 ">
      {/* Logo */}
      <div>
        <img src={MERNKART} alt="Logo" className="h-20 w-auto rounded-full object-cover border border-gray-200" />
      </div>

      {/* Navlinks */}
      <NavLinks />

      {/* Icon Section */}
      <IconSection />
    </div>
   </nav>
  );
};






export default Header;
