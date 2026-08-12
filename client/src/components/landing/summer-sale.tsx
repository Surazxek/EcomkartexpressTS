import ProductCard from "../products/card";
import ComponentTitle from "./componenetTitle.button";

const data = Array.from({ length: 12 }, (_, i) => i);

const SummerSale = () => {
  return (
    <div className="mt-4 px-36">
     <ComponentTitle
     title='Summer-sale 2026'
     subTitle = ' Special SummerSale'
     key={'summer_sale_component_title'}
     link = '#'
     />

      <div className="mt-8 flex flex-wrap gap-6">
        {data.map((item) => (
          <ProductCard key={item} />
        ))}
      </div>
    </div>
  );
};

export default SummerSale;
