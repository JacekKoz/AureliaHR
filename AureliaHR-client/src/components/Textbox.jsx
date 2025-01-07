import React from "react";
import clsx from "clsx";

const Textbox = React.forwardRef(
  ({ type, placeholder, label, className, register, name, error }, ref) => {
    return (
      <div className='w-full flex flex-col gap-1'>
        {label && (
          <label htmlFor={name} className='text-white'>
            {label}
          </label>
        )}

        <div>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            {...register}
            aria-invalid={error ? "true" : "false"}
            className={clsx(
              "bg-transparent px-3 py-2.5 2xl:py-3 border border-button_color placeholder-accent_color_2 text-black outline-none text-base focus:ring-2 ring-button_color",
              className
            )}
          />
        </div>
        {error && (
          <span className='text-xs text-red mt-0.5 '>{error}</span>
        )}
      </div>
    );
  }
);
export default Textbox;