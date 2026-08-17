import { VscUngroupByRefType } from "react-icons/vsc";

const Categorycard = () => {
  return (
    <div className="p-4 flex items-center bg-[#f8f8f8] rounded-md ">
      {/* image */}
      <div className="px-3">
        <VscUngroupByRefType size={28} className="text-green-700  " />
      </div>

      {/* Title and subtitle */}
      <div>
        <p className="text-lg text-gray-900 font-bold">Sports & Fitness</p>
        <p className="text-[14px] line-clamp-2 text-gray-600">
          Gear and equipment to keep you active and healthy
        </p>
      </div>
    </div>
  );
};

export default Categorycard;
