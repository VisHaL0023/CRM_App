import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { signup } from "../../Redux/Slices/AuthSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signupDetails, setSignUpDetails] = useState({
    email: "",
    password: "",
    name: "",
    userType: "",
    userStatus: "",
    clientName: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setSignUpDetails({
      ...signupDetails,
      [name]: value,
    });
  }

  function handleUserType(e) {
    const userTypeSelected = e.target.textContent;
    // console.log("btn", userTypeSelected);
    setSignUpDetails({
      ...signupDetails,
      userType: userTypeSelected.toLowerCase(),
      userStatus: userTypeSelected === "customer" ? "approved" : "suspended",
    });
    const dropDown = document.getElementById("userTypeDropDown");
    dropDown.open = !dropDown.open;
  }

  function resetSignupState() {
    setSignUpDetails({
      email: "",
      password: "",
      name: "",
      userType: "",
      userStatus: "",
      clientName: "",
    });
  }

  async function onSubmit() {
    if (
      !signupDetails.email ||
      !signupDetails.password ||
      !signupDetails.userStatus ||
      !signupDetails.userType ||
      !signupDetails.name ||
      !signupDetails.clientName
    )
      return;
    const response = await dispatch(signup(signupDetails));
    if (response.payload) navigate("/login");
    else resetSignupState();
  }

  return (
    <div className="flex justify-center items-center">
      <div className="text-primary-content">
        <Card className="mt-6 p-5">
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to register.
          </Typography>
          <form className="mt-5 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-3">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Name
              </Typography>
              <Input
                name="name"
                size="md"
                value={signupDetails.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Email
              </Typography>
              <Input
                name="email"
                size="md"
                value={signupDetails.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                name="password"
                type="password"
                size="md"
                value={signupDetails.password}
                onChange={handleInputChange}
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div class="grid w-full place-items-center overflow-x-scroll rounded-lg p-2 lg:overflow-visible">
              <div class="flex divide-x divide-gray-800 row">
                <button
                  class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.75] active:shadow-none rounded-r-none border-r-0"
                  type="button"
                  onClick={handleUserType}
                >
                  customer
                </button>
                <button
                  class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.75] active:shadow-none rounded-r-none border-r-0 rounded-l-none"
                  type="button"
                  onClick={handleUserType}
                >
                  engineer
                </button>
                <button
                  class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.75] active:shadow-blue-gray-600 rounded-l-none"
                  type="button"
                  onClick={handleUserType}
                >
                  admin
                </button>
              </div>
            </div>
            <div className="mt-1 flex flex-col">
              <Typography variant="h6" color="blue-gray">
                Client Name
              </Typography>
              <Input
                name="clientName"
                type="name"
                size="md"
                value={signupDetails.clientName}
                onChange={handleInputChange}
                placeholder="Client Name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <Button className="mt-6" fullWidth onClick={onSubmit}>
              sign up
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-gray-900">
                Sign In
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
