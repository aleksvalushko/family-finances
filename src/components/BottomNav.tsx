'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { House, ChartNoAxesCombined, SquareChartGantt, Ellipsis } from 'lucide-react';

const items = [
	{ href: '/', label: 'Главная', icon: House },
	{ href: '/activity', label: 'Активность', icon: ChartNoAxesCombined },
	{ href: '/budget', label: 'Бюджет', icon: SquareChartGantt },
	{ href: '/more', label: 'Еще', icon: Ellipsis },
];

export function BottomNav() {
	const pathname = usePathname();

	if (pathname.startsWith('/categories')) return null;

	return (
		<nav className='bg-background fixed inset-x-0 bottom-0 border-t border-white/10 pb-[env(safe-area-inset-bottom)]'>
			<ul className='flex'>
				{items.map(({ href, label, icon: Icon }) => {
					const active = href === '/' ? pathname === '/' : pathname.startsWith(href);

					return (
						<li key={href} className='flex-1'>
							<Link
								href={href}
								className={`flex flex-col items-center gap-1 py-3 text-[10px] ${active ? 'text-button' : 'text-label'}`}>
								<Icon className='size-5' />
								{label}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
