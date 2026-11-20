'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { TRANSACTION_OPTION_TYPE } from '@/types';

export type TRANSACTION_DRAFT = {
	id: string;
	amount: number;
	type: TRANSACTION_OPTION_TYPE;
	note: string | null;
	categoryId: string | null;
};
type TRANSACTION_DRAWER_CONTEXT_TYPE = {
	open: boolean;
	draft: TRANSACTION_DRAFT | null;
	openCreate: () => void;
	openEdit: (draft: TRANSACTION_DRAFT) => void;
	close: () => void;
};

const TransactionDrawerContext = createContext<TRANSACTION_DRAWER_CONTEXT_TYPE | null>(null);

export function TransactionDrawerProvider({ children }: { children: ReactNode }) {
	const [open, setOpen] = useState<boolean>(false);
	const [draft, setDraft] = useState<TRANSACTION_DRAFT | null>(null);

	function openCreate() {
		setDraft(null);
		setOpen(true);
	}

	function openEdit(next: TRANSACTION_DRAFT) {
		setDraft(next);
		setOpen(true);
	}

	function close() {
		setOpen(false);
	}

	return (
		<TransactionDrawerContext value={{ open, draft, openCreate, openEdit, close }}>
			{children}
		</TransactionDrawerContext>
	);
}

export function useTransactionDrawer() {
	const value = useContext(TransactionDrawerContext);
	if (!value) throw new Error('useTransactionDrawer вызван вне TransactionDrawerProvider');
	return value;
}
