import {
  Button,
  Card,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../Redux/Slices/AuthSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  function resetLoginState() {
    setLoginDetails({
      email: "",
      password: "",
    });
  }

  async function onSubmit() {
    if (!loginDetails.email || !loginDetails.password) return;
    const response = await dispatch(login(loginDetails));
    if (response.payload) navigate("/");
    else resetLoginState();
  }

  return (
    <div className="flex justify-center items-center">
      <div className="text-primary-content">
        <Card className="mt-6 p-5">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Log In
            </Typography>
          </CardHeader>
          <form className="mt-5 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-3">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Email
              </Typography>
              <Input
                name="email"
                size="md"
                value={loginDetails.email}
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
                value={loginDetails.password}
                onChange={handleInputChange}
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <Button className="mt-6" fullWidth onClick={onSubmit}>
              Log in
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-gray-900">
                Sign up
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
