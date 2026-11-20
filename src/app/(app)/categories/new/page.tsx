'use client';

import Button from '@/components/ui/Button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NewCategory() {
	const router = useRouter();

	return (
		<div className='px-4'>
			<Button
				type='button'
				aria-label='Назад'
				onClick={() => router.back()}
				className='border-input-border h-11 w-11 rounded-full border bg-[#132131] p-0 text-[#8291a4] shadow-none'>
				<ChevronLeft />
			</Button>
		</div>
	);
}
