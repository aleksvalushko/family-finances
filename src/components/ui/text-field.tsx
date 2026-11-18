import { type ComponentProps, ReactNode, useId } from 'react';
import Input from '@/components/ui/input';

type TextFieldProps = ComponentProps<'input'> & {
	label: string;
	error?: string;
	hint?: string;
	icon?: ReactNode;
};

const TextField = ({ label, error, hint, id, icon, className, ...props }: TextFieldProps) => {
	const autoId = useId();
	const inputId = id ?? autoId;
	const messageId = `${inputId}-message`;
	const message = error ?? hint;

	return (
		<div className='flex w-full flex-col'>
			<label
				htmlFor={inputId}
				className='text-label mb-[7px] text-[10px] font-bold tracking-[.05em]'>
				{label}
			</label>
			<div className='relative'>
				<Input
					id={inputId}
					aria-invalid={error ? true : undefined}
					aria-describedby={message ? messageId : undefined}
					className={`${icon ? 'pr-10' : ''} ${className ?? ''}`}
					{...props}
				/>
				{icon ? (
					<div className='absolute top-1/2 right-3 flex -translate-y-1/2 items-center'>{icon}</div>
				) : null}
			</div>
			{message ? (
				<p id={messageId} className={error ? 'text-sm text-red-400' : 'text-sm text-white/60'}>
					{message}
				</p>
			) : null}
		</div>
	);
};

export default TextField;
