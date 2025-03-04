import { HiOutlineEye, HiOutlineEyeOff, HiOutlineUpload } from "react-icons/hi";
import Button from "../../ui/Button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FormInput from "../../ui/FormInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";
import { toast } from "react-toastify";

/**
 * SignupForm component handles user registration.
 * @returns {JSX.Element} The rendered SignupForm component.
 */
function Onboarding() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";

  const { handleSubmit, reset, register, getValues, formState, trigger } =
    useForm({
      mode: "onBlur",
    });
  const { errors } = formState;
  const navigate = useNavigate();

  const { signUp, isSigninUp } = useSignup();

  console.log(isSigninUp);

  /**
   * Handles the form submission success.
   * @param {Object} data - The form data.
   * @param {string} data.email - The user's email.
   * @param {string} data.password - The user's password.
   * @param {string} data.username - The user's username.
   * @param {string} data.phone Number - The user's phone Number.
   * @param {string} data.bio - The user's bio.
   */
  function submitSuccessFn(data) {
    signUp(
      {
        email: data.email,
        password: data.password,
        username: data.username,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        bio: data.bio,
        avatar: data.profilePic[0],
      },
      {
        onSuccess: () => {
          navigate("/");
          toast.success(
            "Sign Up successful. Check your email for confirmation."
          );
          reset();
        },
        onError: () => toast.error("We couldn't sign you up, Try Again"),
      }
    );
  }

  const [passwordType, setPasswordType] = useState("password");

  return (
    <div className="w-screen h-[100dvh] px-8 md:basis-1/2 mx-auto py-5 flex flex-col justify-between overflow-hidden">
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
          {page === "1" && (
            <div className="animate-fadeInLeft">
              <FormInput
                error={errors?.username?.message}
                inputMode="text"
                name="username"
                autoComplete="username"
                id="username"
                styles="w-full"
                disabled={isSigninUp}
                {...register("username", {
                  required: "A username must be provided",
                })}
                placeholder="Enter your Preferred Username"
                type="text"
              />
              <FormInput
                id="email"
                styles="w-full"
                error={errors?.email?.message}
                {...register("email", {
                  required: "Enter a valid Email Address",
                })}
                placeholder="Enter your Email"
                inputMode="email"
                name="email"
                autoComplete="email"
                type="email"
                disabled={isSigninUp}
              />
              <FormInput
                id="password"
                inputMode="text"
                name="password"
                autoComplete="password-new"
                styles="w-full"
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
                inputMode="text"
                name="confirm-password"
                styles="w-full"
                disabled={isSigninUp}
                error={errors?.confirmPassword?.message}
                {...register("confirmPassword", {
                  required: "Password cannot be empty",
                  validate: (value) =>
                    value === getValues("password") ||
                    "Input must match Password",
                })}
                placeholder="Confirm Password"
                type="password"
              />
              <Button
                isLoading={isSigninUp}
                type="next"
                name={"Next"}
                disabled={isSigninUp}
                onClick={async (e) => {
                  e.preventDefault();
                  const isValid = await trigger([
                    "confirmPassword",
                    "password",
                    "email",
                    "username",
                  ]);

                  if (isValid) {
                    setSearchParams({ page: String(Number(page) + 1) });
                  }
                }}
              />
            </div>
          )}
          {page === "2" && (
            <div className="animate-fadeInRight duration-200 bg-white dark:bg-dark">
              <FormInput
                error={errors?.bio?.message}
                inputMode="text"
                name="bio"
                autoComplete="bio"
                id="bio"
                styles="w-full"
                disabled={isSigninUp}
                {...register("bio")}
                placeholder="Enter your bio"
                type="text"
              />
              <FormInput
                error={errors?.fullName?.message}
                inputMode="text"
                name="name"
                autoComplete="name"
                id="Full Name"
                styles="w-full"
                disabled={isSigninUp}
                {...register("fullName", {
                  required: "Enter your Full Name",
                })}
                placeholder="Enter your Real Name"
                type="text"
              />
              <FormInput
                error={errors?.phoneNumber?.message}
                id="phoneNumber"
                inputMode="tel"
                name="tel"
                autoComplete="tel"
                styles="w-full"
                disabled={isSigninUp}
                {...register("phoneNumber", {
                  required: "Enter a Phone Number",
                  minLength: {
                    value: 11,
                    message: "Enter a valid Phone Number",
                  },
                })}
                placeholder="Enter your Phone Number"
                type="text"
              />
              <FormInput
                error={errors?.profilePic?.message}
                id="profilePic"
                styles="w-full"
                disabled={isSigninUp}
                {...register("profilePic", {
                  validate: (fileList) => {
                    const file = fileList?.[0];
                    if (!file || typeof file !== "object") return true;
                    if (file && file.size > 4 * 1024 * 1024)
                      return "File size exceeds 4MB";
                    if (file && !file.type.startsWith("image"))
                      return "Upload an image";
                  },
                })}
                type="file"
                icon={<HiOutlineUpload size={25} />}
              />
              <div className="flex gap-2">
                <Button
                  isLoading={isSigninUp}
                  styles="h-12 w-full basis-1/3"
                  ButtonStyletype="secondary"
                  name={"Back"}
                  disabled={isSigninUp}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                  }}
                />
                <Button
                  isLoading={isSigninUp}
                  type="submit"
                  name={"Submit"}
                  disabled={isSigninUp}
                />
              </div>
            </div>
          )}
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

export default Onboarding;
