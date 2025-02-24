import React from "react";

const SpecialInputs = React.forwardRef(
  ({ label, type, icon, fileType, onClose, onClick, fileAction }, ref) => {
    return (
      <div className="mb-1">
        <label
          htmlFor={label}
          className="cursor-pointer w-full flex items-center justify-start pl-4 h-12 text-lg hover:bg-gray-200 dark:hover:bg-border-dark transition-colors duration-400 ease-in-out text-gray-600  dark:text-primary-dark font-medium"
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
  }
);

SpecialInputs.displayName = "SpecialInputs";

export default SpecialInputs;
