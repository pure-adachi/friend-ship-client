import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputText from "../../atoms/InputText";
import InputPassword from "../../atoms/InputPassword";
import { useLoginMutation } from "../../../generated/graphql";

const LoginForm = () => {
  const history = useNavigate();
  const [loginid, setLoginid] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [login, { loading }] = useLoginMutation({
    update: (_, { data }) => {
      const response = data?.login;
      const user = response?.user;
      const token = user?.accessToken?.token;

      if (response?.result && token) {
        toast.success("Successful login");
        localStorage.setItem("access_token", token);
        history("/");
      } else {
        toast.error("Login failed");
      }
    },
    variables: {
      loginid: loginid || "",
      password: password || "",
    },
  });

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
      <div className="bg-gray-50 p-5 rounded-lg shadow-2xl">
        <div className="text-2xl text-center">Login</div>
        <div className="my-5">
          <div className="flex items-center border rounded mb-5">
            <InputText
              value={loginid || ""}
              onChange={(e) => setLoginid(e.currentTarget.value)}
              id="loginid"
              className="w-full h-9 bg-transparent py-1 px-2 outline-none disabled:bg-gray-200"
              disabled={loading}
            />
            <label
              htmlFor="loginid"
              className="px-3 py-1.5 bg-gray-200 border-l"
            >
              <FontAwesomeIcon icon={faUser} />
            </label>
          </div>
          <div className="flex items-center border rounded mb-5">
            <InputPassword
              value={password || ""}
              onChange={(e) => setPassword(e.currentTarget.value)}
              id="password"
              className="w-full h-9 bg-transparent py-1 px-2 outline-none disabled:bg-gray-200"
              disabled={loading}
            />
            <label
              htmlFor="password"
              className="px-3 py-1.5 bg-gray-200 border-l"
            >
              <FontAwesomeIcon icon={faLockOpen} />
            </label>
          </div>
        </div>

        <button
          className="bg-gradient-to-r from-blue-100 to-blue-200 w-full rounded-full p-2 hover:from-blue-300 hover:to-blue-400 hover:text-white"
          onClick={() => login()}
          disabled={loading}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
