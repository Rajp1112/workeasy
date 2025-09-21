import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { Button as MUIButton } from "@mui/material";
import CommonInput from "../../components/CommonInput";

import loginBackground from "../../assets/registration.jpg";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import { useToast } from "../../components/ToastProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [registerType, setRegisterType] = useState("customer");
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    dispatch(loginUser(data))
  .then((res) => {
    if (res.meta.requestStatus === "fulfilled") {
      showToast("success", "Login Successful");
      navigate("/"); // only navigate on success
    } else {
      showToast("error", res.payload || "Invalid credentials");
    }
  })
  .catch((err) => {
    console.error("Login failed:", err);
    showToast("error", "Something went wrong");
  });

  };

  const switchRegisterType = () => {
    setRegisterType(registerType === "customer" ? "worker" : "customer");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Heading */}
      <div className="p-5 text-center bg-gray-100">
        <h1 className="text-3xl font-bold mb-2">Login</h1>
        <MUIButton variant="text" onClick={switchRegisterType}>
          Switch to {registerType === "customer" ? "Worker" : "Customer"} Registration
        </MUIButton>
      </div>

      {/* Content */}
      <div className="flex flex-1">
        <div
          className="flex-1"
          style={{
            backgroundImage: `url(${loginBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="flex-1 flex items-center justify-center p-8">
          <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <CommonInput
              name="email"
              placeholder="Email"
              type="text"
              register={register}
            />

            {/* Password */}
            <CommonInput
              name="password"
              placeholder="Password"
              type="password"
              register={register}
            />

            <div className="flex justify-end mt-4">
              <MUIButton variant="contained" type="submit">
                Login
              </MUIButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
