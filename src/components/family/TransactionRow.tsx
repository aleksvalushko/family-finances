'use client';

import { CategoryIcon } from '@/lib/category-icons';
import { deleteTransaction } from '@/app/(app)/actions';
import { TRANSACTION_OPTION_TYPE, TRANSACTION_TYPE } from '@/types';
import { Pencil, Trash } from 'lucide-react';
import { useRef, useState } from 'react';
import { useTransactionDrawer } from '@/context/TransactionDrawerContext';
import {
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	TrailingActions,
	Type,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { usePending } from '@/context/PendingContext';

export function TransactionRow({
	transaction,
	amount,
}: {
	transaction: TRANSACTION_TYPE;
	amount: string;
}) {
	const { openEdit } = useTransactionDrawer();
	const run = usePending();
	const [actionsKey, setActionsKey] = useState(0);
	const startX = useRef(0);

	function getAmount(value: string, type: TRANSACTION_OPTION_TYPE): string {
		return type === 'expense' ? `- ${value}` : `+ ${value}`;
	}

	function getTransactionTime(date: string): string {
		const hours = new Date(date).getHours();
		const minutes = new Date(date).getMinutes();
		return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
	}

	function updateTransaction() {
		openEdit({
			id: transaction.id,
			amount: Number(transaction.amount),
			type: transaction.type,
			note: transaction.note,
			categoryId: transaction.categoryId ?? null,
		});
	}

	function removeTransaction() {
		run(async () => {
			await deleteTransaction(transaction.id);
		});
	}

	function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
		startX.current = event.clientX;
	}

	function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
		if (Math.abs(event.clientX - startX.current) > 10) return;

		const transform = event.currentTarget.parentElement?.style.transform ?? '';
		const opened = transform !== '' && !transform.endsWith('(0px)') && !transform.endsWith('(0)');

		if (opened) {
			setActionsKey((key) => key + 1);
			return;
		}

		updateTransaction();
	}

	return (
		<SwipeableList key={actionsKey} type={Type.IOS} fullSwipe={false}>
			<SwipeableListItem
				trailingActions={
					<TrailingActions>
						<SwipeAction onClick={updateTransaction}>
							<span className='flex h-full w-[71px] items-center !justify-center border-b bg-[#1b5660] text-white'>
								<Pencil className='size-5' />
							</span>
						</SwipeAction>
						<SwipeAction onClick={removeTransaction}>
							<span className='flex h-full w-[71px] items-center !justify-center border-b bg-[#9d3544] text-white'>
								<Trash className='size-5' />
							</span>
						</SwipeAction>
					</TrailingActions>
				}>
				<div
					onPointerDown={onPointerDown}
					onPointerUp={onPointerUp}
					className='flex h-[70px] w-full items-center justify-between border-b bg-[#111f30] px-[10px] py-[14px]'>
					<div className='flex flex-row items-center gap-[2px]'>
						<div
							className={`grid h-[41px] w-[41px] place-items-center rounded-[10px] ${transaction.type === 'income' ? 'text-button bg-button/10' : 'bg-[#192a3d] text-[#8fa2b8]'}`}>
							<CategoryIcon name={transaction.categories?.icon} className='size-4' />
						</div>
						<div className='ml-[12px] flex flex-col'>
							<span className='text-[13px] font-semibold'>{transaction.categories?.name}</span>
							<span className='text-[11px] text-[#718095]'>{transaction.note}</span>
						</div>
					</div>
					<div className='ml-[12px] flex flex-col items-end'>
						<span
							className={`text-[13px] font-semibold ${transaction.type === 'income' ? 'text-button' : ''}`}>
							{getAmount(amount, transaction.type)}
						</span>
						<time dateTime={transaction.created_at} className='text-[11px] text-[#718095]'>
							{getTransactionTime(transaction.created_at)}
						</time>
					</div>
				</div>
			</SwipeableListItem>
		</SwipeableList>
	);
}
