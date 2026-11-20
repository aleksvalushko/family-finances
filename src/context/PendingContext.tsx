'use client';

import { createContext, ReactNode, useContext, useTransition } from 'react';
import { Loader2 } from 'lucide-react';

const PendingContext = createContext<((action: () => Promise<void>) => void) | null>(null);

export function PendingProvider({ children }: { children: ReactNode }) {
	const [isPending, startTransition] = useTransition();

	function run(action: () => Promise<void>) {
		startTransition(async () => {
			await action();
		});
	}

	return (
		<PendingContext.Provider value={run}>
			{children}
			{isPending && (
				<div className='fixed inset-0 z-50 grid place-items-center bg-[#08111e]/70'>
					<Loader2 className='text-button size-8 animate-spin' />
				</div>
			)}
		</PendingContext.Provider>
	);
}

export function usePending() {
	const run = useContext(PendingContext);
	if (!run) throw new Error('PendingProvider отсутствует');
	return run;
}
