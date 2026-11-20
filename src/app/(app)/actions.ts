'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { TRANSACTION_OPTION_TYPE, TRANSACTION_TYPE } from '@/types';
import { TRANSACTION_DRAFT } from '@/context/TransactionDrawerContext';

export async function getCategories() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) return [];

	const { data: profile } = await supabase
		.from('profiles')
		.select('family_id')
		.eq('id', user.id)
		.single();

	if (!profile?.family_id) return [];

	const { data: categories } = await supabase
		.from('categories')
		.select('id, name, icon')
		.eq('family_id', profile.family_id);

	if (!categories?.length) return [];

	return categories;
}

export async function getTransactions(limit?: number) {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) return [];

	const { data: profile } = await supabase
		.from('profiles')
		.select('family_id')
		.eq('id', user.id)
		.single();

	if (!profile?.family_id) return [];

	const query = supabase
		.from('transactions')
		.select('id, amount, type, note, created_at, categories(name, icon), category_id')
		.eq('family_id', profile.family_id)
		.order('created_at', { ascending: false });

	const { data: transactions } = await (limit ? query.limit(limit) : query);

	return (transactions ?? []).map((row) => ({
		id: row.id,
		amount: row.amount,
		type: row.type,
		note: row.note,
		created_at: row.created_at,
		categories: (Array.isArray(row.categories) ? row.categories[0] : row.categories) ?? null,
		categoryId: row.category_id,
	})) as unknown as TRANSACTION_TYPE[];
}

export async function createTransaction(input: {
	amount: number;
	type: TRANSACTION_OPTION_TYPE;
	note?: string | null;
	categoryId?: string | null;
}) {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) return { error: 'Нет сессии' };

	const { data: profile } = await supabase
		.from('profiles')
		.select('family_id')
		.eq('id', user.id)
		.single();

	if (!profile?.family_id) return { error: 'Нет семьи' };

	const { error } = await supabase.from('transactions').insert({
		family_id: profile.family_id,
		user_id: user.id,
		amount: input.amount,
		type: input.type,
		note: input?.note?.trim() === '' ? null : input?.note?.trim(),
		category_id: input?.categoryId || null,
	});

	if (error) return { error: error.message };

	revalidatePath('/');
	revalidatePath('/activity');
	return {};
}

export async function updateTransaction(transaction: TRANSACTION_DRAFT) {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) return { error: 'Нет сессии' };

	const { data: profile } = await supabase
		.from('profiles')
		.select('family_id')
		.eq('id', user.id)
		.single();

	if (!profile?.family_id) return { error: 'Нет семьи' };

	const { data, error } = await supabase
		.from('transactions')
		.update({
			amount: transaction.amount,
			type: transaction.type,
			note: transaction.note?.trim() || null,
			category_id: transaction.categoryId || null,
		})
		.eq('id', transaction.id)
		.eq('family_id', profile.family_id)
		.select('id');

	if (error) return { error: error.message };
	if (!data?.length) return { error: 'Запись не найдена' };

	revalidatePath('/');
	revalidatePath('/activity');
	return {};
}

export async function deleteTransaction(transactionId: string) {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) return { error: 'Нет сессии' };

	const { data: profile } = await supabase
		.from('profiles')
		.select('family_id')
		.eq('id', user.id)
		.single();

	if (!profile?.family_id) return { error: 'Нет семьи' };

	const { error } = await supabase
		.from('transactions')
		.delete()
		.eq('id', transactionId)
		.eq('family_id', profile.family_id);

	if (error) return { error: error.message };

	revalidatePath('/');
	revalidatePath('/activity');
	return {};
}
