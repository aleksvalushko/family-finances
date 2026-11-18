import React, { type ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = ComponentProps<'button'>;

const Button = ({ className = '', type = 'button', ...props }: ButtonProps) => {
	return (
		<button
			{...props}
			type={type}
			className={twMerge(
				`bg-button py-o inline-flex h-[52px] w-full cursor-pointer items-center justify-center gap-[7px] rounded-[15px] px-[17px] text-[13px] font-extrabold text-black shadow-[0_9px_24px_#2dd4bf2e] disabled:cursor-not-allowed disabled:opacity-50 ${className}`
			)}
		/>
	);
};

export default Button;
