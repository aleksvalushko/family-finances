import { createClient } from '@/lib/supabase/server';
import { connection } from 'next/server';
import { Suspense } from 'react';
import { FamilyPagesHeader } from '@/components/family/FamilyPagesHeader';
import Button from '@/components/ui/Button';
import { ChevronRight } from 'lucide-react';
import { getTransactions } from '@/app/(app)/actions';
import { TransactionRow } from '@/components/family/TransactionRow';

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

	const balanceText = money
		.formatToParts(balance)
		.filter((part) => part.type !== 'currency' && part.type !== 'literal')
		.map((part) => part.value)
		.join('');

	const currency = money.formatToParts(0).find((part) => part.type === 'currency')?.value;

	const monthTitle = new Intl.DateTimeFormat('ru-RU', {
		month: 'long',
		year: 'numeric',
	})
		.formatToParts(now)
		.filter((part) => part.type === 'month' || part.type === 'year')
		.map((part) => part.value)
		.join(' ');

	const month = monthTitle.split(' ')[0];
	const title = monthTitle.charAt(0).toUpperCase() + monthTitle.slice(1);

	const latestTransactions = await getTransactions(5);

	return (
		<main className='flex flex-col items-center justify-start gap-4 px-4'>
			<FamilyPagesHeader eyebrow='Наш бюджет' title={title} userName={user.user_metadata.name} />
			<div className='balance-card'>
				<div className='flex flex-col'>
					<span className='mb-[5px] text-[13px] text-[#8e9aac]'>Месячный баланс</span>
					<h2 className='text-[42px] font-semibold tracking-[-.055em]'>
						{balanceText}
						<span className='ml-2 text-[25px] text-[#99a7b8]'>{currency}</span>
					</h2>
				</div>
				<div className='border-input-border mt-[23px] flex flex-row gap-12 border-t pt-[18px]'>
					<div>
						<div className='flex items-center gap-x-1'>
							<span className='meta-dot income-dot'></span>
							<span className='text-[11px] text-[#77869a]'>Доход</span>
						</div>
						<span className='mt-[2px] text-[13px]'>{money.format(income)}</span>
					</div>
					<div>
						<div className='flex items-center gap-x-1'>
							<span className='meta-dot expense-dot'></span>
							<span className='text-[11px] text-[#77869a]'>Расход</span>
						</div>
						<span className='mt-[2px] text-[13px]'>{money.format(expense)}</span>
					</div>
				</div>
			</div>
			<div className='flex w-full items-center justify-between'>
				<div className='flex flex-col justify-start'>
					<p className='eyebrow items-start'>{month}</p>
					<h1 className='text-[19px] tracking-[-.03em]'>Недавняя активность</h1>
				</div>
				<Button type='button' className='text-button w-fit bg-transparent shadow-none'>
					Все <ChevronRight className='size-4' />
				</Button>
			</div>
			{/*[&>*:last-child_.border-b] означает «у последнего прямого потомка найди элементы с border-b»*/}
			<ul className='create-card h-full w-full overflow-hidden p-0 [&>*:last-child_.border-b]:border-b-0'>
				{latestTransactions.map((transaction) => {
					return (
						<li key={transaction.id}>
							<TransactionRow
								transaction={transaction}
								amount={money.format(Number(transaction.amount))}
							/>
						</li>
					);
				})}
			</ul>
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
