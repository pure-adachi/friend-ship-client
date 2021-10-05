import React, { InputHTMLAttributes } from "react";

const TextInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input type="text" {...props} />;
};

export default TextInput;
