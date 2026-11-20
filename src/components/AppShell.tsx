'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export function AppShell({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	const withNav = !pathname.startsWith('/categories');

	return (
		<div className={`flex min-h-full flex-col pt-[27px] ${withNav ? 'pb-20' : ''}`}>{children}</div>
	);
}
