import React, { type ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = ComponentProps<'button'>;

const Button = ({ className = '', ...props }: ButtonProps) => {
	return (
		<button
			{...props}
			className={twMerge(
				`bg-button inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl p-3 text-black disabled:cursor-not-allowed disabled:opacity-50 ${className}`
			)}
		/>
	);
};

export default Button;
