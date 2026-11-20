import Button from '@/components/ui/Button';
import { Check, ChevronRight, Plus, X } from 'lucide-react';
import { useState } from 'react';
import TextField from '@/components/ui/TextField';
import { TRANSACTION_OPTION_TYPE } from '@/types';
import { useCategories } from '@/context/CategoriesContext';
import { CategoryIcon } from '@/lib/category-icons';
import Link from 'next/link';
import { useTransactionDrawer } from '@/context/TransactionDrawerContext';

type PROPS = {
	createTransaction: (value: TRANSACTION_OPTION_TYPE) => Promise<void>;
	transactionType: TRANSACTION_OPTION_TYPE;
	setAmountAction: (value: number) => void;
	categoryId?: string | null;
	setCategoryIdAction: (value: string) => void;
	note?: string | null;
	setNoteAction: (value: string) => void;
	initialRaw?: string;
};

const KEYS: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '0', 'back'];

export function Transaction({
	createTransaction,
	transactionType,
	setAmountAction,
	categoryId,
	setCategoryIdAction,
	note,
	setNoteAction,
	initialRaw,
}: PROPS) {
	const categories = useCategories();
	const { close } = useTransactionDrawer();

	const [raw, setRaw] = useState(initialRaw ?? '0');

	const currency = new Intl.NumberFormat('be-BY', {
		style: 'currency',
		currency: 'BYN',
		maximumFractionDigits: 0,
	})
		.formatToParts(0)
		.find((part) => part.type === 'currency')?.value;

	function press(key: string) {
		if (key === 'back') {
			const next = raw.slice(0, -1);
			const value = next === '' ? '0' : next;
			setRaw(value);
			setAmountAction(Number(value.replace(',', '.')) || 0);
			return;
		}

		if (key === ',') {
			if (raw.includes(',')) return;
			setRaw(`${raw},`);
			return;
		}

		const [whole, fraction = ''] = raw.split(',');
		if (raw.includes(',') ? fraction.length >= 2 : whole.length >= 7) return;

		const next = raw === '0' ? key : raw + key;
		setRaw(next);
		setAmountAction(Number(next.replace(',', '.')) || 0);
	}

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				createTransaction(transactionType);
			}}
			className='bg-drawer-background'>
			<div className='flex w-full flex-col items-center justify-center pt-[16px] pb-[12px]'>
				<p className='eyebrow'>СУММА</p>
				<div className='text-[39px] font-semibold tracking-[.05em]'>
					<span>{raw}</span>
					<span className='ml-[7px] text-[22px] text-[#718095]'>{currency}</span>
				</div>
			</div>
			<div className='grid grid-cols-6 gap-4'>
				{categories.map((item) => {
					const active = item.id === categoryId;

					return (
						<Button
							key={item.name}
							type='button'
							onClick={() => setCategoryIdAction(item.id)}
							className={`flex h-[61px] flex-col bg-transparent p-[2px] shadow-none ${active ? 'text-button' : 'text-[#66768b]'}`}>
							<span
								className={`flex h-[34px] w-[34px] items-center justify-center rounded-[12px] border ${active ? 'border-button bg-button/10' : 'border-input-border'}`}>
								<CategoryIcon name={item.icon} className='size-4' />
							</span>
							<span className='text-[7px]'>{item.name}</span>
						</Button>
					);
				})}
			</div>
			<Link
				href='/categories/new'
				onClick={close}
				className='mt-4 flex items-center justify-between gap-[7px] text-[9px] text-[#66768b]'>
				<div className='flex items-center gap-x-2'>
					<span className='border-button/20 text-button flex h-[25px] w-[25px] items-center justify-center rounded-[8px] border border-dashed'>
						<Plus className='size-3' />
					</span>
					<span>Создать свою категорию</span>
				</div>
				<ChevronRight className='size-4' />
			</Link>
			<div className='mt-[14px]'>
				<TextField
					label='Заметка'
					placeholder='Для чего это было?'
					name='note'
					value={note ?? ''}
					onChange={(event) => setNoteAction(event.target.value)}
					icon={
						note ? (
							<button type='button' aria-label='Очистить' onClick={() => setNoteAction('')}>
								<X className='size-4' />
							</button>
						) : null
					}
				/>
			</div>
			<div className='my-[11px] grid grid-cols-3 gap-2'>
				{KEYS.map((key) => (
					<Button
						key={key}
						type='button'
						className='h-[38px] rounded-[10px] bg-transparent text-[18px] text-[#d9e0e9] shadow-none'
						onClick={() => press(key)}>
						{key === 'back' ? '⌫' : key}
					</Button>
				))}
			</div>
			<Button type='submit'>
				Сохранить {transactionType === 'expense' ? 'расход' : 'доход'} <Check className='size-4' />
			</Button>
		</form>
	);
}
