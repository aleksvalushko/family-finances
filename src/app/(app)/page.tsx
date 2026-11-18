import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { Suspense } from 'react';
import Button from '@/components/ui/Button';
import { ChevronLeft } from 'lucide-react';
import TextField from '@/components/ui/TextField';

async function createFamily(formData: FormData) {
	'use server';

	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect('/login');
	}

	const name = String(formData.get('name') ?? '');

	const { data: family, error } = await supabase
		.from('families')
		.insert({ name, created_by: user.id })
		.select('id')
		.single();

	if (error || !family) redirect('/?error=create');

	const { error: updateError } = await supabase
		.from('profiles')
		.update({ family_id: family.id })
		.eq('id', user.id);

	if (updateError) redirect('/?error=create');
	redirect('/');
}

async function joinFamily(formData: FormData) {
	'use server';

	const supabase = await createClient();

	const code = String(formData.get('code') ?? '');
	const { error } = await supabase.rpc('join_family', { code });

	if (error) redirect('/?error=join');
	redirect('/');
}

async function signOut() {
	'use server';

	const supabase = await createClient();

	await supabase.auth.signOut();

	redirect('/login');
}

async function HomeContent() {
	await connection();

	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) return null;

	const { data: profile } = await supabase
		.from('profiles')
		.select('family_id')
		.eq('id', user.id)
		.single();

	const name = user.user_metadata?.name ?? user.email;

	let family: { name: string; invite_code: string } | null = null;

	if (profile?.family_id) {
		const { data } = await supabase
			.from('families')
			.select('name, invite_code')
			.eq('id', profile.family_id)
			.single();

		family = data;
	}

	return (
		<main className='flex min-h-screen flex-col items-center justify-center gap-8 px-4'>
			<h1>Привет, {name}</h1>
			{!profile?.family_id ? (
				<>
					<form action={createFamily} className='auth-form'>
						<TextField label='Название семьи' name='name' placeholder='Название семьи' />
						<Button type='submit'>Создать семью</Button>
					</form>
					<form action={joinFamily} className='auth-form'>
						<TextField label='Код' name='code' placeholder='Код приглашения' />
						<Button type='submit'>Войти в семью</Button>
					</form>
				</>
			) : (
				<h3>Код приглашения, {family?.invite_code}</h3>
			)}
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
