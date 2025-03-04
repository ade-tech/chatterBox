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
    <div className="w-full md:w-140 md:justify-center flex flex-col">
      <h1 className="text-center text-2xl mb-5 md:mt-0 font-bold dark:text-white basis-0.5">
        Let's Know More About <span className="text-primary-light">You.</span>
      </h1>
      <div className="flex flex-col px-2 items-center">
        <div className="self-center w-8/10 md:w-9/10 flex items-center">
          <h1 className="px-4 py-2 text-white text-md font-medium bg-primary-light rounded-full">
            1
          </h1>
          <div
            className={`${page === "2" ? "bg-primary-light dark:bg-primary-light" : "bg-gray-100 dark:bg-bg-dark"} flex-1 h-0.5 `}
          ></div>
          <h1
            className={`${page === "2" ? "bg-primary-light text-white" : "border-1 border-gray-200 text-gray-400 dark:border-primary-light dark:text-primary-light"} px-4 py-2  text-md font-medium  rounded-full transition-all duration-150`}
          >
            2
          </h1>
        </div>
        <div className="w-9/10 md:w-full flex justify-between mt-4">
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
        className="flex items-center flex-col justify-around md:h-fit  md:rounded-2xl mt-12 md:mt-4 md:px-10 px-6 py-4 md:py-8 md:bg-gray-50 md:dark:bg-bg-dark overflow-hidden"
        onSubmit={handleSubmit}
      >
        <div className="w-full md:w-fit ml-18 md:ml-0 flex items-center gap-2">
          <label
            htmlFor="avatar_url"
            className="group bg-white dark:bg-accent-light rounded-full relative cursor-pointer"
          >
            <div
              className={`w-20 h-20 rounded-full z-2 overflow-hidden dark:text-accent-light border-1 group-hover:bg-dar transition-colors duration-200 ease-in ${
                selectedFile
                  ? "border-green-500"
                  : errors?.avatar_url?.message
                    ? "border-red-500"
                    : "border-primary-light/20"
              }`}
            >
              <span className="absolute top-6 font-semibold transition-all duration-200 ease-in text-white text-xs/tight left-5 text-center opacity-0 group-hover:opacity-100">
                Upload <br /> Image
              </span>
              <img
                src={preview || "/default-user.jpg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </label>
          <div className="ml-3">
            <label
              htmlFor="avatar_url"
              className="dark:text-white font-semibold text-md"
            >
              Upload A Profile Image
            </label>
            <p className="text-xs text-gray-400 font-light">
              <CiCircleInfo className="inline mr-1" />
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
                    file.type.startsWith("image/") || "File must be an image"
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
                  className="hidden w-0 "
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
        <FormInput
          error={errors?.username?.message}
          styles="w-full mt-8"
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
          placeholder="Enter username"
        />
        <FormInput
          validating={isValidating}
          error={errors?.username?.message}
          styles="w-full"
          {...register("fullname", {
            required: "Enter your government name",
          })}
          placeholder="Enter Your Full name"
        />

        <div className="buttons flex gap-2 w-full">
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
            name="Next &rarr;"
            onClick={handleNext}
          />
        </div>
      </form>
    </div>
  );
}

export default OnbordingForm;
