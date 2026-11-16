import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { Suspense } from 'react';
import Button from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

async function HomeContent() {
	await connection();

	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect('/login');
	}

	const name = user.user_metadata?.name ?? user.email;

	async function signOut() {
		'use server';

		const supabase = await createClient();

		await supabase.auth.signOut();

		redirect('/login');
	}

	return (
		<main className='flex min-h-screen flex-col items-center justify-center bg-gray-950 px-4'>
			<h1>Family Finances</h1>
			<h3>Привет, {name}</h3>
			<form action={signOut}>
				<Button type='submit' className='w-fit'>
					<ChevronLeft className='size-4' /> Выйти
				</Button>
			</form>
		</main>
	);
}

export default function Home() {
	return (
		<Suspense fallback={null}>
			<HomeContent />
		</Suspense>
	);
}
