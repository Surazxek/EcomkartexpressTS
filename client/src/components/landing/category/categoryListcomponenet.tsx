import ComponentTitle from "../componenetTitle.button";
import Categorycard from "./category-card";

const CategoryList = () => {
  return (
    <div className="mt-10 px-36">
      <ComponentTitle
        title="Browse Our Best-Selling Categories"
        subTitle="Explore customer favorites and discover top-rated products across every category"
      />
      <div className="flex flex-wrap gap-6">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <Categorycard key={index} />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
