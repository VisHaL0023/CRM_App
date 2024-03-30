import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardHeader,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
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
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-24 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
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
            <div className="flex mt-4 items-center justify-start mb-3">
              <Typography variant="h6" color="blue-gray" className="mr-3">
                Type:
              </Typography>
              <Menu>
                <MenuHandler>
                  <Button className="bg-blue-gray-400 px-3 py-1 flex w-24 items-center">
                    {!signupDetails.userType
                      ? "User Type"
                      : signupDetails.userType}
                    <ChevronDownIcon className="w-5 h-5 ml-2" />
                  </Button>
                </MenuHandler>
                <MenuList onClick={handleUserType} className="text-black">
                  <MenuItem>customer</MenuItem>
                  <MenuItem>engineer</MenuItem>
                  <MenuItem>admin</MenuItem>
                </MenuList>
              </Menu>
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
            <Button className=" mt-6" fullWidth onClick={onSubmit}>
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
