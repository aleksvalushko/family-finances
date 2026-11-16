import Link from 'next/link';
import TextField from '@/components/ui/text-field';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import Button from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default async function RegisterPage({
	searchParams,
}: {
	searchParams: Promise<{ error?: string }>;
}) {
	async function signUp(formData: FormData) {
		'use server';

		const supabase = await createClient();
		const name = String(formData.get('name') ?? '');
		const email = String(formData.get('email') ?? '');
		const password = String(formData.get('password') ?? '');
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: { data: { name } },
		});
		if (error) {
			redirect(`/register?error=${encodeURIComponent(error.message)}`);
		}
		if (!data.session) {
			redirect('/login');
		}
		redirect('/');
	}

	return (
		<form action={signUp} className='auth-form'>
			<TextField label='Имя' name='name' placeholder='Имя' />
			<TextField label='E-mail' name='email' placeholder='E-mail' />
			<TextField label='Пароль' name='password' placeholder='Пароль' type='password' />

			<Suspense fallback={null}>
				<AuthError searchParams={searchParams} />
			</Suspense>

			<Button type='submit'>
				Зарегистрироваться <ChevronRight className='size-4' />
			</Button>

			<p className='text-[14px]'>
				Уже есть аккаунт?{' '}
				<Link href='/login' className='text-teal-300 hover:text-teal-500'>
					Войти
				</Link>
			</p>
		</form>
	);
}

async function AuthError({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
	const { error } = await searchParams;
	if (!error) return null;
	return <p className='text-sm text-red-400'>{error}</p>;
}
