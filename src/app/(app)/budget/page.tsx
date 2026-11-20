import { createClient } from '@/lib/supabase/server';
import { connection } from 'next/server';
import { Suspense } from 'react';
import { FamilyPagesHeader } from '@/components/family/FamilyPagesHeader';

async function HomeContent() {
	await connection();

	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) return null;

	const now = new Date();
	const start = new Date(now.getFullYear(), now.getMonth(), 1);
	const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

	const { data: profile } = await supabase
		.from('profiles')
		.select('family_id')
		.eq('id', user.id)
		.single();

	let income = 0;
	let expense = 0;

	if (profile?.family_id) {
		const { data: rows } = await supabase
			.from('transactions')
			.select('amount, type')
			.eq('family_id', profile.family_id)
			.gte('created_at', start.toISOString())
			.lt('created_at', end.toISOString());

		for (const row of rows ?? []) {
			const amount = Number(row.amount);
			if (row.type === 'income') income += amount;
			else expense += amount;
		}
	}

	const balance = income - expense;

	const money = new Intl.NumberFormat('be-BY', {
		style: 'currency',
		currency: 'BYN',
		maximumFractionDigits: 2,
	});

	return (
		<main className='flex flex-col items-center justify-start gap-4 px-4'>
			<FamilyPagesHeader
				eyebrow='Наш бюджет'
				title='Ноябрь 2026'
				userName={user.user_metadata.name}
			/>
			<div className='balance-card'>
				<p>{money.format(balance)}</p>
				<p>Доход {money.format(income)}</p>
				<p>Расход {money.format(expense)}</p>
			</div>
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
