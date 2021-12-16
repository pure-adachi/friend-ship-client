import React, { ButtonHTMLAttributes } from "react";

const Button = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`${className} bg-gray-500 text-gray-50 px-3 py-1`}
    />
  );
};

Button.defaultProps = {
  className: "",
};

export default Button;
