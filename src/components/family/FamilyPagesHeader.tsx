import type { ReactNode } from 'react';
import Button from '@/components/ui/Button';

export async function FamilyPagesHeader({
	eyebrow,
	title,
	userName,
}: {
	eyebrow?: string;
	title: ReactNode | string;
	userName: string;
}) {
	const getShortName = (name: string): string => {
		let shortName = '';
		name.split(' ').forEach((word, index) => {
			if (index < 2) {
				shortName += word[0].toUpperCase();
			}
		});
		return shortName;
	};

	return (
		<div className='flex w-full justify-between'>
			<div className='flex flex-col justify-start'>
				{eyebrow ? <p className='eyebrow items-start'>{eyebrow}</p> : null}
				<h1 className='text-[24px] font-bold tracking-[-.04em]'>{title}</h1>
			</div>
			<Button
				type='button'
				className='bg-avatar border-brand-border relative h-[44px] w-[44px] rounded-full border text-[12px] font-bold text-[#c9fff8]'>
				{userName ? getShortName(userName) : '?'}
				<span className='avatar-dot'></span>
			</Button>
		</div>
	);
}
