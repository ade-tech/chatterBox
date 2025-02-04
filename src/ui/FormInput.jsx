import React from "react";
import { Link } from "react-router-dom";

const FormInput = React.forwardRef(
  ({ icon, type, label, id, placeholder, disabled, error, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-3 w-full">
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
            className={`${
              error
                ? "rounded-full w-full h-12 bg-gray-100 pl-10 mb-4 placeholder:text-gray-400 text-gray-600 focus:outline-none border border-red-600"
                : "rounded-full w-full h-12 bg-gray-100 pl-10 mb-4 placeholder:text-gray-400 text-gray-600 focus:outline-none"
            }`}
            autoComplete="true"
            ref={ref}
            {...rest} // Ensures react-hook-form props are applied
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

FormInput.displayName = "FormInput"; // Helps with debugging in React DevTools

export default FormInput;
