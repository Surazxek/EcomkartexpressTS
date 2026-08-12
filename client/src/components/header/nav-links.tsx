import { Link, useLocation } from "react-router";

const links:{label:string, link:string} [] = [
    {
        label: 'Home',
        link: '/'
    },
    
    {
        label: 'Products',
        link: '/Products'
    },

    {
        label: 'About Us',
        link: '/about-us'
    },

    {
        label: 'Contact Us',
        link: '/contact-us'
    }
]


export const NavLinks = () => {
  const location = useLocation();
  const active_path = location.pathname;

  return (
    <div className="flex items-center gap-8">
      {links.map((item, index) => (
        <Link key={`${item.link}-${index}`} to={item.link}>
          <span
            className={`text-[16px] w-[140px] font-normal hover:font-semibold hover:text-teal-500 transition-colors duration-300
              ${active_path === item.link ? "font-semibold text-teal-700" : "text-gray-600"}
            `}
          >
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
};