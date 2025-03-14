import React from "react";
import { Link } from "react-router-dom";

const inputStyle =
  "rounded-full bg-gray-100 h-12 pl-10 mb-4 placeholder:text-gray-400 focus:outline-none text-gray-600";

const FormInput = React.forwardRef(
  (
    {
      validating,
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
    ref,
  ) => {
    if (type === "file" && id !== "image-upload") {
      return (
        <>
          <div className="flex items-center">
            <label
              htmlFor="uploadProfile"
              className="bg-primary-light relative flex h-12 w-full items-center justify-center gap-2 rounded-full text-white"
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
          {error ? (
            <p className="mt-2 mb-2 text-sm text-red-500">{error}</p>
          ) : (
            validating && (
              <p className="mt-2 mb-2 text-sm text-green-500">Validating...</p>
            )
          )}
        </>
      );
    }
    return (
      <div className="flex w-full flex-col dark:text-white">
        {label && (
          <label className="text-md font-medium" htmlFor={id}>
            {label}
          </label>
        )}
        <div className="relative flex items-center justify-center">
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
                ? `${styles} ${inputStyle} border border-red-600 bg-red-300 placeholder:text-red-600`
                : `${styles} ${inputStyle} dark:bg-surface-dark dark:text-accent-light dark:placeholder:text-accent-light`
            }`}
            ref={ref}
            {...rest}
          />
          {icon}
        </div>
        {error ? (
          <p className="mt-[-5px] mb-2 text-sm text-red-500">{error}</p>
        ) : (
          validating && (
            <p className="mb-2 text-sm text-green-500">Validating...</p>
          )
        )}
        {type === "password" && label && (
          <Link
            className="text-secondary-dark mt-[-22px] text-right text-sm font-semibold"
            to="/auth/forgot-pass"
          >
            Forgot Password?
          </Link>
        )}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

export default FormInput;
