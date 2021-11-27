import React, { ReactNode } from "react";
import GlobalHeader from "../../molecules/GlobalHeader";
import Authentication from "../../atoms/Authentication";
interface Props {
  children: ReactNode;
}

const Frame = ({ children }: Props) => {
  return (
    <Authentication>
      <GlobalHeader />
      <div className="fixed inset-0 top-10 p-3 overflow-auto">{children}</div>
    </Authentication>
  );
};

export default Frame;
