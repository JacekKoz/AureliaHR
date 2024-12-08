import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import bearIcon from "../assets/bear-icon.svg";
import Button from "../components/Button";
import Textbox from "../components/Textbox";
import { useSelector } from "react-redux";

const Login = () => {
  const {user} = useSelector(state => state.auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const submitHandler = async (data) => {
  };

  useEffect(() => {
    user && navigate('/dashboard');
  }, [user]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center lg:flex-row bg-bg_color_1 font-poppins">
      <div className="w-full mid:w-auto flex gap-0 md-gap-40 flex-col md:flex-row items-center justify-center">
        {/* Left side */}
        <div className="h-full w-full lg:w-1/3 flex flex-col items-center justify-center">
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md-gap-y-10 2xl:-mt-20">
            <span className="flex gap-1 py-1 px-4 border rounded-full text-lg md:text-base border-border_color text-accent_color_2">
              Manage your team efficiently!
            </span>
            <p className="flex flex-col gap-0 md:gap-4 text-5xl md:text-6xl 2xl:text-7xl font-vidaloka font-black text-center text-white">
              <span>AureliaHR</span>
            </p>
            <div className="animate-1">
              <img src={bearIcon} alt="" />
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="form-container w-full df:w-[400px] flex flex-col gap-y-8 bg-bg_color_2 px-10 pt-14 pb-14"
          >
            <div className="">
              <p className="text-white text-3xl text-center font-bold">
                Welcome back!
              </p>
              <p className="text-accent_color_2 text-base text-center">
                Keep all your credential safe
              </p>
            </div>
            <div className="flex flex-col gap-y-5">
              <Textbox
                placeholder="email@example.com"
                type="email"
                name="email"
                label="Email Address"
                className="w-full rounded-full"
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder="pa$$word"
                type="password"
                name="password"
                label="Pa$$word"
                className="w-full rounded-full"
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password.message : ""}
              />

              <span className="text-sm text-accent_color_2 hover:text-accent_color_1 hover:underline transition cursor-pointer">
                Forget Password?
              </span>

              <Button
                type="submit"
                label="Submit"
                className="w-full h-10 bg-border_color text-white "
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;