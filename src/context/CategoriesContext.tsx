'use client';

import { createContext, ReactNode, useContext } from 'react';
import { CATEGORY_TYPE } from '@/types';

const CategoriesContext = createContext<CATEGORY_TYPE[]>([]);

export function CategoriesProvider({
	categories,
	children,
}: {
	categories: CATEGORY_TYPE[];
	children: ReactNode;
}) {
	return <CategoriesContext value={categories}>{children}</CategoriesContext>;
}

export function useCategories() {
	return useContext(CategoriesContext);
}
