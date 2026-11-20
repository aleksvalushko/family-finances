import { ReactNode, Suspense } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { AddButton } from '@/components/AddButton';
import { getCategories } from '@/app/(app)/actions';
import { connection } from 'next/server';
import { CategoriesProvider } from '@/context/CategoriesContext';
import { TransactionDrawerProvider } from '@/context/TransactionDrawerContext';
import { PendingProvider } from '@/context/PendingContext';
import { AppShell } from '@/components/AppShell';

export default async function AppLayout({ children }: { children: ReactNode }) {
	return (
		<TransactionDrawerProvider>
			<PendingProvider>
				<AppShell>
					<div className='flex flex-1 flex-col'>{children}</div>
					<Suspense fallback={null}>
						<AppMenu />
					</Suspense>
				</AppShell>
			</PendingProvider>
		</TransactionDrawerProvider>
	);
}

async function AppMenu() {
	await connection();
	const categories = await getCategories();

	return (
		<CategoriesProvider categories={categories}>
			<AddButton />
			<BottomNav />
		</CategoriesProvider>
	);
}
