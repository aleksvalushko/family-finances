import React, { type ComponentProps } from 'react';

type InputProps = ComponentProps<'input'>;

const Input = ({ className = '', ...props }: InputProps) => {
	return (
		<input
			{...props}
			className={`bg-input input placeholder:text-muted-foreground h-[51px] w-full rounded-[14px] border px-2 text-[13px] outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
		/>
	);
};

export default Input;
