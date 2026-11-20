import { TRANSACTION_DRAFT } from '@/context/TransactionDrawerContext';
import { useState } from 'react';
import { TRANSACTION_OPTION_TYPE } from '@/types';
import { EXPENSE, INCOME } from '@/constants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Transaction } from '@/components/family/Transaction';
import {
	createTransaction as createTransactionToDb,
	updateTransaction as updateTransactionInDB,
} from '@/app/(app)/actions';
import { usePending } from '@/context/PendingContext';

export function DrawerForm({
	draft,
	close,
}: {
	draft: TRANSACTION_DRAFT | null;
	close: () => void;
}) {
	const run = usePending();
	const [amount, setAmount] = useState(draft?.amount ?? 0);
	const [note, setNote] = useState(draft?.note ?? '');
	const [categoryId, setCategoryId] = useState(draft?.categoryId ?? '');
	const [type, setType] = useState<TRANSACTION_OPTION_TYPE>(draft?.type ?? EXPENSE);
	const initialRaw = draft ? draft.amount.toFixed(2).replace('.', ',') : '0';

	async function createTransaction(type: TRANSACTION_OPTION_TYPE) {
		if (amount <= 0) return;
		run(async () => {
			let result = null;
			if (draft) {
				result = await updateTransactionInDB({
					id: draft.id,
					amount,
					type,
					note,
					categoryId,
				});
			} else {
				result = await createTransactionToDb({
					amount,
					type,
					note,
					categoryId,
				});
			}
			if (result?.error) return;
			close();
		});
	}

	return (
		<Tabs value={type} onValueChange={(value) => setType(value as TRANSACTION_OPTION_TYPE)}>
			<TabsList className='bg-tabs mt-[15px] h-[50px] w-full'>
				<TabsTrigger value={EXPENSE}>Расход</TabsTrigger>
				<TabsTrigger value={INCOME}>Доход</TabsTrigger>
			</TabsList>
			<TabsContent value={EXPENSE}>
				<Transaction
					key={draft?.id ?? 'new'}
					initialRaw={initialRaw}
					createTransaction={createTransaction}
					transactionType={EXPENSE}
					setAmountAction={setAmount}
					categoryId={categoryId}
					setCategoryIdAction={setCategoryId}
					note={note}
					setNoteAction={setNote}
				/>
			</TabsContent>
			<TabsContent value={INCOME}>
				<Transaction
					key={draft?.id ?? 'new'}
					initialRaw={initialRaw}
					createTransaction={createTransaction}
					transactionType={INCOME}
					setAmountAction={setAmount}
					categoryId={categoryId}
					setCategoryIdAction={setCategoryId}
					note={note}
					setNoteAction={setNote}
				/>
			</TabsContent>
		</Tabs>
	);
}
