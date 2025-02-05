import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import Button from "../../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../ui/FormInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";

function LoginForm() {
  const [passwordType, setPasswordType] = useState("password");
  const { register, formState, handleSubmit } = useForm();
  const { login, isLoggingIn } = useLogin();
  const { errors } = formState;
  const navigate = useNavigate();

  function handleSubmitFn(data) {
    login(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          navigate("/");
        },
      }
    );
  }

  return (
    <div className="basis-full px-8 md:basis-1/2 mx-auto py-5 flex flex-col justify-between overflow-hidden">
      <div className="logo-side flex gap-2 items-center">
        <img src="/Asset 1.svg" className="w-10" />
        <h1 className="text-2xl font-bold dark:text-white">ChatterBox</h1>
      </div>

      <div className="flex flex-col gap-6 max-w-128">
        <div>
          <h1 className="text-2xl font-extrabold mb-2 dark:ext-accent-dark dark:text-accent-dark">
            Welcome Back!
          </h1>
          <p className="dark:text-accent-light">
            Let’s get you into the App Suuuuuuuperfast!⚡
          </p>
        </div>
        <form onSubmit={handleSubmit(handleSubmitFn)}>
          <FormInput
            label="Email"
            placeholder="Enter your Email"
            type="email"
            disabled={isLoggingIn}
            error={errors?.email?.message}
            {...register("email", {
              required: "Enter a valid Email Address",
            })}
          />
          <FormInput
            label="Password"
            disabled={isLoggingIn}
            placeholder="Enter your password"
            type={passwordType}
            error={errors?.password?.message}
            {...register("password", {
              required: "Password cannot be empty",
            })}
            icon={
              <div
                className="cursor-pointer absolute right-4 top-3.5"
                onClick={() =>
                  setPasswordType((type) =>
                    type === "password" ? "text" : "password"
                  )
                }
              >
                {passwordType === "password" ? (
                  <HiOutlineEye
                    size={20}
                    className="stroke-current text-gray-400"
                  />
                ) : (
                  <HiOutlineEyeOff
                    size={20}
                    className="stroke-current text-gray-400"
                  />
                )}
              </div>
            }
          />
          <Button name="Login" disabled={isLoggingIn} isLoading={isLoggingIn} />
        </form>
      </div>
      <div className="w-96 pb-4">
        <p className="text-center dark:text-accent-dark">
          Need an account?{" "}
          <Link
            to="/signup"
            className="font-semibold underline text-secondary-dark"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
