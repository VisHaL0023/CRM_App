import { useState } from "react";
import { useDispatch } from "react-redux";

import { login } from "../../../Redux/Slices/AuthSlice";

const Login = () => {
  const dispatch = useDispatch();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  }

  function onSubmit() {
    if (!loginDetails.email || !loginDetails.password) return;
    console.log("calling login", loginDetails);
    const response = dispatch(login(loginDetails));
    console.log(response);
  }

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <div className="card-body flex flex-col items-center">
          <div className="w-full flex justify-center">
            <h2 className="card-title text-4xl text-white">Login</h2>
          </div>
          <div className="w-full">
            <input
              onChange={handleInputChange}
              name="email"
              autoComplete="one-time-code"
              type="text"
              placeholder="email ..."
              className="input text-white input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <div className="w-full">
            <input
              onChange={handleInputChange}
              name="password"
              autoComplete="one-time-code"
              type="password"
              placeholder="password"
              className="input text-white input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <div className="w-full card-actions mt-4">
            <button
              onClick={onSubmit}
              className="btn btn-warning w-full font-bold text-xl hover:bg-yellow-400 transition-all ease-in-out duration-300"
            >
              Submit
            </button>
          </div>
          <p className="text-l text-white">Donot have an account ?</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
