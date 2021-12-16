import React, { ReactChild } from "react";

interface Props {
  children: ReactChild;
}

const OverlayJoin = ({ children }: Props) => {
  return (
    <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center">
      {children}
    </div>
  );
};

export default OverlayJoin;
