import type { FC } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router"

interface IProps {
  link?: string;
  title: string;
  subTitle: string;
}

const ComponentTitle: FC<IProps> = ({ title, subTitle, link }) => {
  return (
    <div className="flex items-center justify-between mb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-teal-700 mt-4">{title}</h1>
        <p className="text-gray-800 font-medium mt-1">{subTitle}</p>
      </div>

      {link && (
        <Link to={link} className="flex items-center gap-1">
          <p className="cursor-pointer text-teal-600 hover:text-teal-700 font-medium">
            Explore All
          </p>
          <FaChevronRight className="text-teal-800" size={12} />
        </Link>
      )}
    </div>
  );
};

export default ComponentTitle;
