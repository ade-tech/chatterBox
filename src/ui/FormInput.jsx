import React from "react";
import { Link } from "react-router-dom";

const inputStyle =
  "rounded-full bg-gray-100 h-12 pl-10 mb-4 placeholder:text-gray-400 focus:outline-none text-gray-600";

const FormInput = React.forwardRef(
  (
    {
      icon,
      type = "text",
      label,
      id,
      placeholder,
      styles,
      disabled,
      error,
      name,
      inputMode = "text",
      autoComplete = "text",
      ...rest
    },
    ref
  ) => {
    if (type === "file") {
      return (
        <>
          <div className="flex items-center">
            <label
              htmlFor="uploadProfile"
              className="w-full h-12 relative text-white rounded-full bg-primary-light items-center justify-center gap-2 flex"
            >
              {icon} Upload Profile Image
            </label>
            <input
              type="file"
              id="uploadProfile"
              accept="image/*"
              className="hidden"
              name={name}
              ref={ref}
              {...rest}
            />
          </div>
          {error && <p className="mt-2 mb-2 text-sm text-red-500">{error}</p>}
        </>
      );
    }
    return (
      <div className="flex flex-col gap-3 w-full dark:text-white">
        {label && (
          <label className="text-md font-medium" htmlFor={id}>
            {label}
          </label>
        )}
        <div className="flex items-center relative">
          <input
            id={id}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            inputMode={inputMode}
            name={name}
            autoComplete={autoComplete}
            className={`${
              error
                ? `${styles} ${inputStyle} bg-red-300 placeholder:text-red-600 border border-red-600 `
                : `${styles} ${inputStyle} dark:bg-surface-dark dark:text-accent-light dark:placeholder:text-accent-light`
            }`}
            ref={ref}
            {...rest}
          />
          {icon}
        </div>
        {error && (
          <p className="mt-[-25px] mb-2 text-sm text-red-500">{error}</p>
        )}
        {type === "password" && label && (
          <Link
            className="text-right text-sm font-semibold mt-[-22px] text-secondary-dark"
            to="/auth/forgot-pass"
          >
            Forgot Password?
          </Link>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
