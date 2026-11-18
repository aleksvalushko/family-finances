'use client';

import { usePathname } from 'next/navigation';
import { ScreenHeading } from '@/components/screen-heading';

const subtitle: Record<string, string> = {
	'/login': 'С возвращением в ваше общее семейное пространство.',
	'/register': 'Создайте пространство для своих семейных финансов.',
};

export function AuthHeader() {
	const pathname = usePathname();

	return (
		<div className='flex w-full flex-col justify-start'>
			<div className='brand-mark mb-[30px]'>
				<span>F</span>
			</div>
			<ScreenHeading
				eyebrow='ПРИВАТНО. СОВМЕСТНО. ПРОСТО.'
				title={
					<>
						Семейный
						<br />
						Бюджет
					</>
				}
				subtitle={subtitle[pathname]}
			/>
		</div>
	);
}
