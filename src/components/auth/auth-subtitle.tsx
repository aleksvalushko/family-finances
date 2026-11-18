'use client';

import { usePathname } from 'next/navigation';

const text: Record<string, string> = {
	'/login': 'С возвращением в ваше общее семейное пространство.',
	'/register': 'Создайте пространство для своих семейных финансов.',
};

export function AuthSubtitle() {
	const pathname = usePathname();

	return (
		<p className='text-label mt-[15px] max-w-[290px] text-[13px] leading-[1.55]'>
			{text[pathname]}
		</p>
	);
}
