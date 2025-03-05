import React from "react";

const SpecialInputs = React.forwardRef(
  ({ label, type, icon, fileType, onClose, onClick, fileAction }, ref) => {
    return (
      <div className="mb-1">
        <label
          htmlFor={label}
          className="dark:hover:bg-border-dark dark:text-primary-dark flex h-12 w-full cursor-pointer items-center justify-start pl-4 text-lg font-medium text-gray-600 transition-colors duration-400 ease-in-out hover:bg-gray-200"
        >
          {icon}
          {label}
        </label>
        <input
          ref={ref}
          className="hidden"
          type={type}
          id={label}
          onClick={onClose}
          onChange={(e) => {
            const file = e.target.files[0];
            fileAction(file);
            onClick();
          }}
          accept={fileType}
        />
      </div>
    );
  },
);

SpecialInputs.displayName = "SpecialInputs";

export default SpecialInputs;
