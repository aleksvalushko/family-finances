import type { ReactNode } from 'react';

export function ScreenHeading({
	eyebrow,
	title,
	subtitle,
}: {
	eyebrow?: string;
	title: ReactNode;
	subtitle?: string;
}) {
	return (
		<div className='flex w-full flex-col justify-start'>
			{eyebrow ? (
				<p className='text-label mb-[5px] text-[9px] font-extrabold tracking-[.18em] uppercase'>
					{eyebrow}
				</p>
			) : null}
			<h1 className='m-0 text-[45px] leading-[.98] font-normal tracking-[-.065em]'>{title}</h1>
			{subtitle ? (
				<p className='text-label mt-[15px] max-w-[290px] text-[13px] leading-[1.55]'>{subtitle}</p>
			) : null}
		</div>
	);
}
