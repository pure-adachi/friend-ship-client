import React, { InputHTMLAttributes } from "react";

const InputPassword = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input type="password" {...props} />;
};

export default InputPassword;
