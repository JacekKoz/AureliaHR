import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import bearIcon from "../assets/img/bear-icon.svg";
import Button from "../components/Button";
import Textbox from "../components/Textbox";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
import { setCredentials } from "../redux/slices/authSlice";
import Loading from "../components/Loading";

const Login = () => {
  const {user} = useSelector(state => state.auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [login, {isLoading}] = useLoginMutation()

  const submitHandler = async (data) => {
    try{
      const result = await login(data).unwrap()

      dispatch(setCredentials(result))
      navigate("/")

    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message || error.message)
    }
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
            <span className="flex gap-1 py-1 px-4 border rounded-full text-lg md:text-base border-button_color text-white">
              Manage your team efficiently!
            </span>
            <p className="flex flex-col gap-0 md:gap-4 text-5xl md:text-6xl 2xl:text-7xl font-vidaloka font-bold text-center text-white">
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
            className="form-container w-full df:w-[400px] flex flex-col gap-y-8 bg-grey_300 px-10 pt-14 pb-14"
          >
            <div className="">
              <p className="text-white text-3xl text-center font-bold">
                Welcome back!
              </p>
              <p className="text-white text-base text-center">
                Keep all your credential safe
              </p>
            </div>
            <div className="flex flex-col gap-y-5 text-white">
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

              <span className="text-sm text-white hover:text-button_color hover:underline transition cursor-pointer">
                Forget Password?
              </span>

             {isLoading ? <Loading/> : <Button
                type="submit"
                label="Submit"
                className="w-full h-10 bg-button_color text-white "
              />}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;