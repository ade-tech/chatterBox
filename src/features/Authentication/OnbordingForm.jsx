import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CiCircleInfo } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";
import FormInput from "../../ui/FormInput";
import Button from "../../ui/Button";
import supabase from "../../services/supabase";

function OnbordingForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [preview, setPreview] = useState(null);
  const page = searchParams.get("step") || "1";
  const { handleSubmit, register, trigger, watch, formState, control } =
    useForm({
      mode: "onBlur",
    });

  const { errors, isValidating } = formState;
  const selectedFile = watch("avatar_url");

  async function handleNext(e) {
    e.preventDefault();
    const isValid = await trigger(["username", "fullname", "avatar_url"]);
    console.log(isValid);
    if (isValid) setSearchParams({ step: "2" });
  }
  function handlePrev(e) {
    e.preventDefault();
    setSearchParams({ step: "1" });
  }
  return (
    <div className="flex w-full flex-col md:w-140 md:justify-center">
      <h1 className="mb-5 basis-0.5 text-center text-2xl font-bold md:mt-0 dark:text-white">
        Let's Know More About <span className="text-primary-light">You.</span>
      </h1>
      <div className="flex flex-col items-center px-2">
        <div className="flex w-8/10 items-center self-center md:w-9/10">
          <h1 className="text-md bg-primary-light rounded-full px-4 py-2 font-medium text-white">
            1
          </h1>
          <div
            className={`${page === "2" ? "bg-primary-light dark:bg-primary-light" : "dark:bg-bg-dark bg-gray-100"} h-0.5 flex-1`}
          ></div>
          <h1
            className={`${page === "2" ? "bg-primary-light border-1 border-transparent text-white" : "dark:border-primary-light dark:text-primary-light border-1 border-gray-200 text-gray-400"} text-md rounded-full px-4 py-2 font-medium transition-all duration-150`}
          >
            2
          </h1>
        </div>
        <div className="mt-4 flex w-9/10 justify-between md:w-full">
          <p className="text-xs text-gray-500">
            How do you want <br />
            to be addressed?
          </p>
          <p className="text-xs text-gray-500">
            How do you want <br />
            to be addressed?
          </p>
        </div>
      </div>
      <form
        className="md:dark:bg-bg-dark mt-12 flex flex-col items-center justify-center overflow-hidden px-6 py-4 md:mt-4 md:rounded-2xl md:bg-gray-50 md:px-10 md:py-8"
        onSubmit={handleSubmit}
      >
        {page === "1" && (
          <>
            <div className="mb-5 ml-18 flex w-full items-center gap-2 md:ml-0 md:w-fit">
              <label
                htmlFor="avatar_url"
                className="group dark:bg-accent-light relative cursor-pointer rounded-full bg-white"
              >
                <div
                  className={`dark:text-accent-light group-hover:bg-dar z-2 h-20 w-20 overflow-hidden rounded-full border-1 transition-colors duration-200 ease-in ${
                    selectedFile
                      ? "border-green-500"
                      : errors?.avatar_url?.message
                        ? "border-red-500"
                        : "border-primary-light/20"
                  }`}
                >
                  <span className="bg-dark/40 absolute rounded-full px-5 py-6 text-center text-xs/tight font-semibold text-white opacity-0 transition-all duration-200 ease-in group-hover:opacity-100">
                    Upload <br /> Image
                  </span>
                  <img
                    src={preview || "/default-user.jpg"}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
              </label>
              <div className="ml-3">
                <label
                  htmlFor="avatar_url"
                  className="text-md font-semibold dark:text-white"
                >
                  Upload A Profile Image
                </label>
                <p className="text-xs font-light text-gray-400">
                  <CiCircleInfo className="mr-1 inline" />
                  <i>
                    max. Image size is <b>5MB</b>
                  </i>
                </p>
              </div>
              <Controller
                control={control}
                name="avatar_url"
                rules={{
                  required: "You should upload an Image",
                  validate: {
                    isImage: (file) => {
                      if (!file || typeof file !== "object") return true;
                      return (
                        file.type.startsWith("image/") ||
                        "File must be an image"
                      );
                    },
                    isSizeValid: (file) => {
                      if (!file || typeof file !== "object") return true;
                      return (
                        file.size <= 5 * 1024 * 1024 ||
                        "File size must be less than 5MB"
                      );
                    },
                  },
                }}
                render={({ field }) => {
                  return (
                    <input
                      id="avatar_url"
                      type="file"
                      className="hidden w-0"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setPreview(URL.createObjectURL(file));
                        field.onChange(file);
                      }}
                    />
                  );
                }}
              />
            </div>
            <div className="mb-5 w-full">
              <input
                type="text"
                {...register("username", {
                  required: "Enter a unique username",
                  validate: async (value) => {
                    const { data } = await supabase
                      .from("profiles")
                      .select("username")
                      .eq("username", value);
                    if (data.length) return "Username has been taken";
                  },
                })}
                placeholder="Choose a preferred username "
                className={`${errors?.username?.message && "border-1 border-red-500"} dark:bg-bg-dark dark:text-primary-dark placeholder:dark:text-primary-dark h-12 w-full rounded-full bg-gray-100 pl-8 text-sm drop-shadow-xs placeholder:text-sm focus:outline-0 dark:drop-shadow-none`}
              />

              <span
                className={`${errors?.username?.message ? "text-red-500" : isValidating ? "text-green-500" : ""} ml-4 text-xs`}
              >
                {isValidating
                  ? "Validating your username..."
                  : errors?.username?.message}
              </span>
            </div>
            <div className="w-full">
              <input
                type="text"
                {...register("fullname", {
                  required: "Enter your government name",
                })}
                placeholder="Enter your full name"
                className={`${errors?.fullname?.message && "border-1 border-red-500"} dark:bg-bg-dark dark:text-primary-dark placeholder:dark:text-primary-dark h-12 w-full rounded-full bg-gray-100 pl-8 text-sm drop-shadow-xs placeholder:text-sm focus:outline-0 dark:drop-shadow-none`}
              />
              <span
                className={`${errors?.fullname?.message ? "text-red-500" : isValidating ? "text-green-500" : ""} ml-4 text-xs`}
              >
                {errors?.fullname?.message}
              </span>
            </div>
          </>
        )}
        {page === "2" && (
          <>
            <div className="mb-5 w-full">
              <input
                type="email"
                disabled
                value={"adede"}
                {...register("username", {
                  required: "Enter a unique username",
                  validate: async (value) => {
                    const { data } = await supabase
                      .from("profiles")
                      .select("username")
                      .eq("username", value);
                    if (data.length) return "Username has been taken";
                  },
                })}
                placeholder="Choose a preferred username "
                className={`${errors?.username?.message && "border-1 border-red-500"} dark:bg-bg-dark dark:text-primary-dark placeholder:dark:text-primary-dark mt-7 h-12 w-full rounded-full bg-gray-200 pl-8 text-sm opacity-50 drop-shadow-xs placeholder:text-sm focus:outline-0 dark:drop-shadow-none`}
              />

              <span
                className={`${errors?.username?.message ? "text-red-500" : isValidating ? "text-green-500" : ""} ml-4 text-xs`}
              >
                {isValidating
                  ? "Validating your username..."
                  : errors?.username?.message}
              </span>
            </div>
            <div className="mb-5 w-full">
              <input
                type="text"
                {...register("PhoneNumber", {
                  required: "Enter your Phone Number",
                })}
                placeholder="Enter your Phone Number"
                className={`${errors?.PhoneNumber?.message && "border-1 border-red-500"} dark:bg-bg-dark dark:text-primary-dark placeholder:dark:text-primary-dark h-12 w-full rounded-full bg-gray-100 pl-8 text-sm drop-shadow-xs placeholder:text-sm focus:outline-0 dark:drop-shadow-none`}
              />
              <span
                className={`${errors?.PhoneNumber?.message && "text-red-500"} ml-4 text-xs`}
              >
                {errors?.PhoneNumber?.message}
              </span>
            </div>
            <div className="w-full">
              <input
                type="text"
                {...register("bio", {
                  required: "Enter your A bio",
                })}
                value="i'm using chatterbox by Abdone"
                placeholder="Enter your Bio"
                className={`${errors?.bio?.message && "border-1 border-red-500"} dark:bg-bg-dark dark:text-primary-dark placeholder:dark:text-primary-dark h-12 w-full rounded-full bg-gray-100 pl-8 text-sm drop-shadow-xs placeholder:text-sm focus:outline-0 dark:drop-shadow-none`}
              />
              <span
                className={`${errors?.bio?.message && "text-red-500"} ml-4 text-xs`}
              >
                {errors?.bio?.message}
              </span>
            </div>
          </>
        )}
        <div className="buttons flex w-full gap-2">
          {page === "2" && (
            <Button
              styles="w-fit px-4 mr-auto h-12 text-gray-700"
              name="&larr; Back"
              ButtonStyletype="secondary"
              onClick={handlePrev}
            />
          )}
          <Button
            styles="w-24 h-12 ml-auto"
            type={page === "2" && "submit"}
            name={`${page === "1" ? "Next \u2192" : "Submit"}`}
            onClick={page === "1" && handleNext}
          />
        </div>
      </form>
    </div>
  );
}

export default OnbordingForm;
