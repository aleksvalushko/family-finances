'use client';

import Button from '@/components/ui/Button';
import { StepHeader } from '@/components/StepHeader';
import { ScreenHeading } from '@/components/ScreenHeading';
import { Check, ChevronRight, Copy } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { flushSync } from 'react-dom';

type PROPS = {
	finishAction: string | ((formData: FormData) => void | Promise<void>) | undefined;
	familyName?: string | null;
	inviteCode?: string | null;
	resetAction: () => void;
};

export function CreatedFamily({ finishAction, familyName, inviteCode, resetAction }: PROPS) {
	const router = useRouter();

	const [isCopied, setIsCopied] = useState<boolean>(false);

	const copyInviteCode = async (): Promise<void> => {
		if (isCopied) return;
		try {
			if (inviteCode) await navigator.clipboard.writeText(inviteCode);
			setIsCopied(true);
			setTimeout(() => {
				setIsCopied(false);
			}, 2000);
		} catch (err) {
			console.error('Не удалось скопировать текст: ', err);
		}
	};

	const goToFamilyBudget = () => {
		flushSync(() => resetAction());
		router.push('/');
	};

	return (
		<div className='flex h-full w-full flex-col'>
			<div className='mb-10'>
				<div className='mb-8'>
					<div className='mb-4 flex items-center gap-x-2'>
						<div className='brand-mark h-[37px] w-[37px] rounded-[12px]'>
							<span>F</span>
						</div>
						<span>Семейный бюджет</span>
					</div>
					<StepHeader step={3} />
				</div>
				<ScreenHeading
					eyebrow='Вы готовы'
					title='Пригласите своего партнёра'
					subtitle='Ваше семейное пространство готово. Поделитесь этим секретным кодом с человеком, с которым вы вместе планируете бюджет.'
				/>
			</div>
			<div className='create-card'>
				<form action={finishAction} className='auth-form'>
					<div className='flex flex-col items-center'>
						<div className='brand-mark text-button mb-4 rounded-[14px] border-none'>
							<Check className='size-7' />
						</div>
						<p className='text-label mx-0 mt-[5px] mb-[19px] text-[11px]'>Пригласите в</p>
						<span className='m-0 text-[19px]'>{familyName}</span>
					</div>
					<div className='border-brand-border flex h-[66px] w-full flex-row items-center justify-between rounded-[16px] border border-dashed bg-[#2dd4bf0d] p-[13px]'>
						<span className='text-[17px] font-bold tracking-[.1em] text-[#dcfffb]'>
							{inviteCode}
						</span>
						<Button
							type='button'
							aria-label='Скопировать'
							className='text-button h-[38px] w-[38px] border border-[#2dd4bf2e] bg-[#2dd4bf17] p-0 shadow-none'
							onClick={copyInviteCode}>
							{isCopied ? <Check className='size-4' /> : <Copy className='size-4' />}
						</Button>
					</div>
					<p className='mx-0 mb-[19px] text-[11px] text-[#708095]'>
						Код можно использовать один раз. Позже вы сможете создать еще один в разделе «Ещё».
					</p>
					<Button type='button' onClick={goToFamilyBudget}>
						Войти в семейный бюджет <ChevronRight className='size-4' />
					</Button>
				</form>
			</div>
		</div>
	);
}
