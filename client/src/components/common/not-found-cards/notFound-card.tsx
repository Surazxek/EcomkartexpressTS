import React from "react";
import { GrDocumentMissing } from "react-icons/gr";

interface NotFoundCardProps {
  message?: string;
}

const NotFoundCard: React.FC<NotFoundCardProps> = ({ message = "Data Not Found" }) => {
  return (
    <div className="w-full flex items-center justify-center py-10">
      <div className="flex flex-col items-center text-gray-600">
        <GrDocumentMissing size={48} className="text-red-500 mb-4" />
        <p className="mt-2 text-lg font-medium">{message}</p>
      </div>
    </div>
  );
};

export default NotFoundCard;
