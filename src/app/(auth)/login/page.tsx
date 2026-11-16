import Link from 'next/link';
import TextField from '@/components/ui/text-field';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Button from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Suspense } from 'react';

export default function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
	async function signIn(formData: FormData) {
		'use server';

		const supabase = await createClient();
		const email = String(formData.get('email') ?? '');
		const password = String(formData.get('password') ?? '');
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			redirect(`/login?error=${encodeURIComponent(error.message)}`);
		}
		if (!data.session) {
			redirect('/login');
		}
		redirect('/');
	}

	return (
		<form action={signIn} className='auth-form'>
			<TextField label='E-mail' name='email' placeholder='E-mail' />

			<TextField label='Пароль' name='password' placeholder='Пароль' type='password' />

			<Suspense fallback={null}>
				<AuthError searchParams={searchParams} />
			</Suspense>

			<Button type='submit'>
				Войти <ChevronRight className='size-4' />
			</Button>
			<p className='text-[14px]'>
				Нет аккаунта?{' '}
				<Link href='/register' className='text-teal-300 hover:text-teal-500'>
					Зарегистрироваться
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
