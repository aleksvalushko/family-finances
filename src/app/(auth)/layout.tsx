import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className='flex min-h-screen px-[22px] pt-[28px] pb-[34px]'>
			<div className='w-full'>{children}</div>
		</div>
	);
}
