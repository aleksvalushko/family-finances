'use client';

import Link from 'next/link';
import { ChevronRight, UsersRound } from 'lucide-react';
import TextField from '@/components/ui/text-field';
import Button from '@/components/ui/button';
import { AuthHeader } from '@/components/auth/auth-header';
import { signUpFields } from '@/lib/auth-schema';

type PROPS = {
	error: string | null;
	setStepAction: (value: number) => void;
	email: string;
	setEmailAction: (value: string) => void;
	password: string;
	setPasswordAction: (value: string) => void;
	setErrorAction: (value: string | null) => void;
};

export function ZeroStep({
	error,
	setStepAction,
	email,
	setEmailAction,
	password,
	setPasswordAction,
	setErrorAction,
}: PROPS) {
	return (
		<div className='auth-form-wrapper'>
			<AuthHeader />
			<form
				className='auth-form'
				onSubmit={(event) => {
					event.preventDefault();
					const result = signUpFields
						.pick({ email: true, password: true })
						.safeParse({ email, password });
					if (!result.success) {
						setErrorAction(result.error.issues[0]?.message ?? 'Проверьте поля');
						return;
					}
					setErrorAction(null);
					setStepAction(1);
				}}>
				<TextField
					label='E-mail'
					name='email'
					type='email'
					placeholder='E-mail'
					value={email}
					onChange={(event) => setEmailAction(event.target.value)}
				/>
				<TextField
					label='Пароль'
					name='password'
					placeholder='Пароль'
					type='password'
					value={password}
					onChange={(event) => setPasswordAction(event.target.value)}
				/>
				{error && <p className='text-[12px] text-red-400'>{error}</p>}

				<Button type='submit'>
					Зарегистрироваться <ChevronRight className='size-4' />
				</Button>

				<p className='text-label mt-[20px] text-[11px]'>
					Уже есть аккаунт?{' '}
					<Link href='/login' className='font-bold text-teal-300 hover:text-teal-500'>
						Войти
					</Link>
				</p>

				<div>
					<span className='text-label flex items-center gap-x-2 text-[11px]'>
						<UsersRound className='size-4' /> Это создаёт закрытое пространство для вашей семьи.
					</span>
				</div>
			</form>
		</div>
	);
}
