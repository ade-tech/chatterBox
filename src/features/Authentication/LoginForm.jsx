import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import Button from "../../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../ui/FormInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";

/**
 * Login form component.
 * @returns {JSX.Element} The LoginForm component.
 */
function LoginForm() {
  const [passwordType, setPasswordType] = useState("password");
  const { register, formState, handleSubmit } = useForm();
  const { login, isLoggingIn } = useLogin();
  const { errors } = formState;
  const navigate = useNavigate();

  /**
   * Handles form submission.
   * @param {Object} data - The form data.
   */
  function handleSubmitFn(data) {
    login(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          navigate("/");
        },
      },
    );
  }

  return (
    <div className="mx-auto flex basis-full flex-col justify-between overflow-hidden px-8 py-5 md:basis-1/2">
      <div className="logo-side flex items-center gap-2">
        <img src="/Asset 1.svg" className="w-10" />
        <h1 className="text-2xl font-bold dark:text-white">ChatterBox</h1>
      </div>

      <div className="flex max-w-128 flex-col gap-6">
        <div>
          <h1 className="dark:ext-accent-dark dark:text-accent-dark mb-2 text-2xl font-extrabold">
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
            styles="w-full"
            disabled={isLoggingIn}
            error={errors?.email?.message}
            {...register("email", {
              required: "Enter a valid Email Address",
            })}
          />
          <FormInput
            label="Password"
            styles="w-full"
            disabled={isLoggingIn}
            placeholder="Enter your password"
            type={passwordType}
            error={errors?.password?.message}
            {...register("password", {
              required: "Password cannot be empty",
            })}
            icon={
              <div
                className="absolute top-3.5 right-4 cursor-pointer"
                onClick={() =>
                  setPasswordType((type) =>
                    type === "password" ? "text" : "password",
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
        <p className="dark:text-accent-dark text-center">
          Need an account?{" "}
          <Link
            to="/signup"
            className="text-secondary-dark font-semibold underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
