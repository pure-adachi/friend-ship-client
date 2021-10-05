import React, { ReactNode } from "react";
import Authentication from "../../atoms/Authentication";

interface Props {
  children: ReactNode;
}

const Frame = ({ children }: Props) => {
  return (
    <Authentication>
      <div className="main">{children}</div>
    </Authentication>
  );
};

export default Frame;
