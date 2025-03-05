import Button from "../../ui/Button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FormInput from "../../ui/FormInput";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useGetIn } from "./useSignup";
import { toast } from "react-toastify";
import { sendOTP } from "../../services/SignupApi";
import { checkUserExistence } from "../../services/SignupApi";

/**
 * SignupForm component handles user registration.
 * @returns {JSX.Element} The rendered SignupForm component.
 */
function SignupForm() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || "1";
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const {
    handleSubmit,
    register,
    setValue,
    formState,
    watch,
    setFocus,
    trigger,
  } = useForm({
    mode: "onBlur",
  });
  const { errors } = formState;
  const navigate = useNavigate();
  const email = watch("email");

  const { getIn, isGettingIn } = useGetIn();

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6).split("");
    paste.forEach((val, i) => {
      setValue(`code_${i}`, val);
    });

    setFocus(`code_${5}`);
  };

  /**
   * Handles the form submission success.
   * @param {Object} data - The form data.
   * @param {string} data.email - The user's email.
   * @param {string} data.password - The user's password.
   * @param {string} data.username - The user's username.
   * @param {string} data.phone Number - The user's phone Number.
   * @param {string} data.bio - The user's bio.
   */
  async function submitSuccessFn(data) {
    const code = Object.values(data)
      .filter((val) => val.length === 1)
      .join("");
    if (!data.email) navigate(-1);

    getIn(
      { email: data.email, token: code },
      {
        onSuccess: async (userData) => {
          toast.success("Welcome");
          const hasProfile = await checkUserExistence(userData.user.id);
          if (hasProfile.length > 0) {
            console.log("tiggered cha");
            navigate("/chats");
          } else {
            console.log("tiggered by onb");
            navigate("/onboarding");
          }
        },
        onError: () => toast.error("Code entered is not correct"),
      },
    );
  }

  return (
    <div className="mx-auto flex basis-full flex-col justify-between justify-self-center overflow-hidden px-8 py-5 md:basis-1/2">
      <div className="logo-side flex items-center gap-2">
        <img src="/Asset 1.svg" className="w-10" />
        <h1 className="text-2xl font-bold dark:text-white">ChatterBox</h1>
      </div>

      <div className="flex max-w-128 flex-col gap-6">
        <div>
          <h1 className="dark:text-accent-dark mb-2 text-2xl font-extrabold">
            Welcome
          </h1>
          <p className="dark:text-accent-light">
            Let&apos;s get you into the app suuuuuuuper fasssst⚡
          </p>
        </div>
        <form onSubmit={handleSubmit(submitSuccessFn)}>
          {page === "1" && (
            <div className="animate-fadeInLeft duration-300">
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
                disabled={isGettingIn}
              />

              <Button
                isLoading={isGettingIn}
                type="next"
                name={"Next"}
                disabled={isGettingIn}
                onClick={async (e) => {
                  e.preventDefault();
                  const isValid = await trigger(["email"]);

                  if (isValid) {
                    setSearchParams({ page: String(Number(page) + 1) });
                    sendOTP(email);
                  }
                }}
              />
            </div>
          )}
          {page === "2" && (
            <div className="animate-fadeInRight dark:bg-dark bg-white duration-200">
              <div className="flex flex-col gap-2">
                <div className="flex gap-3">
                  {inputRefs.map((ref, index) => (
                    <input
                      key={index}
                      ref={ref}
                      {...register(`code_${index}`)}
                      type="text"
                      className="bg-surface-dark focus:ring-accent-light text-primary-dark h-14 w-1/7 rounded-lg text-center text-3xl focus:ring-1 focus:outline-0 md:h-16"
                      onPaste={handlePaste}
                      onChange={(e) => {
                        if (e.target.value && index < 5) {
                          setFocus(`code_${index + 1}`);
                          setValue(`code_${index + 1}`, "");
                        }
                      }}
                      maxLength={1}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    isLoading={isGettingIn}
                    styles="h-12 w-full basis-1/3"
                    ButtonStyletype="secondary"
                    name={"Back"}
                    disabled={isGettingIn}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(-1);
                    }}
                  />
                  <Button
                    isLoading={isGettingIn}
                    type="submit"
                    name={"Submit"}
                    disabled={isGettingIn}
                  />
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
      <div className="w-full pb-4">
        <p className="dark:text-accent-dark text-center">
          Already have an account?
          <Link
            to="/login"
            className="text-secondary-dark font-semibold underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
