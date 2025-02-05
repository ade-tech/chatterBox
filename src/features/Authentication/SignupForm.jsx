import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import Button from "../../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../ui/FormInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";
import { toast } from "react-toastify";

function SignupForm() {
  const { handleSubmit, reset, register, getValues, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();

  const { signUp, isSigninUp } = useSignup();

  console.log(isSigninUp);
  function submitSuccessFn(data) {
    signUp(
      {
        email: data.email,
        password: data.password,
        username: data.username,
      },
      {
        onSuccess: () => {
          navigate("/");
          toast.success("Sign Up successful Check your email for confirmation");
          reset();
        },
        onError: () => toast.error("Couldn't sign you up"),
      }
    );
  }

  const [passwordType, setPasswordType] = useState("password");
  return (
    <div className="basis-full px-8 md:basis-1/2 mx-auto py-5 flex flex-col justify-between overflow-hidden">
      <div className="logo-side flex gap-2 items-center">
        <img src="/Asset 1.svg" className="w-10" />
        <h1 className="text-2xl font-bold dark:text-white">ChatterBox</h1>
      </div>

      <div className="flex flex-col gap-6 max-w-128">
        <div>
          <h1 className="text-2xl font-extrabold mb-2 dark:text-accent-dark">
            Welcome
          </h1>
          <p className="dark:text-accent-light">
            Fill in your details to get Started⚡
          </p>
        </div>
        <form onSubmit={handleSubmit(submitSuccessFn)}>
          <FormInput
            error={errors?.username?.message}
            id="username"
            disabled={isSigninUp}
            {...register("username", {
              required: "A username must be provided",
            })}
            placeholder="Enter your Preferred Username"
            type="text"
          />
          <FormInput
            id="email"
            error={errors?.email?.message}
            {...register("email", {
              required: "Enter a valid Email Address",
            })}
            placeholder="Enter your Email"
            type="email"
            disabled={isSigninUp}
          />
          <FormInput
            id="password"
            error={errors?.password?.message}
            {...register("password", {
              required: "Password cannot be empty",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            placeholder="Enter your password"
            type={passwordType}
            disabled={isSigninUp}
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
          <FormInput
            id="confirmPassword"
            disabled={isSigninUp}
            error={errors?.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Password cannot be empty",
              validate: (value) =>
                value === getValues("password") || "Input must match Passowrd",
            })}
            placeholder="Confirm Password"
            type="password"
          />
          <Button isLoading={isSigninUp} name="Sign Up" disabled={isSigninUp} />
        </form>
      </div>
      <div className="w-full pb-4">
        <p className="text-center dark:text-accent-dark">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold underline text-secondary-dark"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
