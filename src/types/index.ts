export type TRANSACTION_OPTION_TYPE = 'expense' | 'income';

export type CATEGORY_TYPE = {
	id: string;
	name: string;
	icon: string;
};

export type TRANSACTION_TYPE = {
	id: string;
	amount: number;
	type: TRANSACTION_OPTION_TYPE;
	note: string | null;
	created_at: string;
	categories: { icon: string; name: string } | null;
	categoryId: string | null;
};
