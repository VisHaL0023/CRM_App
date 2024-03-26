import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../components/pages/auth/Login";
import Signup from "../components/pages/auth/Signup";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default MainRoutes;
