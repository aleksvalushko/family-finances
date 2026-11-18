'use client';

import { Check, ChevronRight, UsersRound, X } from 'lucide-react';
import TextField from '@/components/ui/text-field';
import Button from '@/components/ui/button';
import { StepHeader } from '@/components/step-header';
import { ScreenHeading } from '@/components/screen-heading';
import { signUpFields } from '@/lib/auth-schema';

type PROPS = {
	setStepAction: (value: number) => void;
	email?: string;
	name: string;
	error?: string | null;
	setNameAction: (value: string) => void;
	setErrorAction: (value: string | null) => void;
};

export function NameStep({
	setStepAction,
	email,
	name,
	error,
	setNameAction,
	setErrorAction,
}: PROPS) {
	return (
		<div className='flex h-full w-full flex-col justify-between'>
			<div>
				<div className='mb-8'>
					<div className='mb-4 flex items-center gap-x-2'>
						<div className='brand-mark h-[37px] w-[37px] rounded-[12px]'>
							<span>F</span>
						</div>
						<span>Семейный бюджет</span>
					</div>
					<StepHeader step={1} />
				</div>
				<ScreenHeading
					eyebrow='ВАШ ПРОФИЛЬ'
					title='Каким вас должен видеть ваш партнёр?'
					subtitle='Ваш профиль виден только в рамках вашего закрытого семейного пространства. Вы сможете изменить его позже.'
				/>
			</div>
			<form
				className='auth-form'
				onSubmit={(event) => {
					event.preventDefault();
					const result = signUpFields.pick({ name: true }).safeParse({ name });
					if (!result.success) {
						setErrorAction(result.error.issues[0]?.message ?? 'Проверьте поля');
						return;
					}
					setErrorAction(null);
					setStepAction(2);
				}}>
				<div className='relative w-fit'>
					<div className='brand-mark m-0 h-[70px] w-[70px] rounded-[23px]'>
						<span>{name ? name[0].toUpperCase() : '?'}</span>
					</div>
					<span className='bg-button ring-background absolute -right-1 -bottom-1 flex size-[28px] items-center justify-center rounded-[10px] text-black ring-4'>
						<UsersRound className='size-4.5' />
					</span>
				</div>
				<TextField
					label='Имя'
					name='name'
					value={name}
					onChange={(event) => setNameAction(event.target.value)}
					icon={
						name ? (
							<button type='button' aria-label='Очистить' onClick={() => setNameAction('')}>
								<X className='size-4' />
							</button>
						) : null
					}
				/>
				<TextField
					label='E-mail'
					name='email'
					placeholder='E-mail'
					value={email}
					disabled={true}
					icon={
						email ? (
							<button
								type='button'
								aria-label='Очистить'
								className='text-button'
								onClick={() => setNameAction('')}>
								<Check className='size-4' />
							</button>
						) : null
					}
				/>
				{error && <p className='text-sm text-red-400'>{error}</p>}
				<Button type='submit'>
					Дальше <ChevronRight className='size-4' />
				</Button>
				<div className='flex justify-center'>
					<span className='text-label flex items-center gap-x-2 text-[11px]'>
						<UsersRound className='size-4' /> Этот профиль могут видеть только члены семьи.
					</span>
				</div>
			</form>
		</div>
	);
}
