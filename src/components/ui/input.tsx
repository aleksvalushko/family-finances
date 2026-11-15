import React, {type ComponentProps} from "react";

type InputProps = ComponentProps<"input">;

const Input = ({className = '', ...props}: InputProps) => {
    return (
        <input {...props}
               className={`h-[40px] w-full rounded-lg px-2 text-[14px] border bg-input input outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}/>
    );
};

export default Input;