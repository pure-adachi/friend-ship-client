import React from "react";
import ViewerName from "../../atoms/ViewerName";

const GlobalHeader = () => {
  return (
    <header className="p-2 bg-gradient-to-r from-blue-500 to-blue-200">
      <div className="flex justify-between">
        <div className="text-white">Friend Ship</div>
        <ViewerName />
      </div>
    </header>
  );
};

export default GlobalHeader;
