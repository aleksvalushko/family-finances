'use client';

import { usePathname } from 'next/navigation';
import { Plus, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Drawer } from '@base-ui/react/drawer';
import { useTransactionDrawer } from '@/context/TransactionDrawerContext';
import { DrawerForm } from '@/components/family/DrawerForm';

const visibleOn = ['/', '/activity'];

export function AddButton() {
	const pathname = usePathname();
	const { open, draft, openCreate, close } = useTransactionDrawer();

	if (!visibleOn.includes(pathname)) return null;

	return (
		<Drawer.Root
			open={open}
			onOpenChange={(next) => {
				if (!next) close();
			}}>
			<Drawer.Trigger
				render={
					<Button
						aria-label='Добавить'
						className='ring-background fixed right-[45%] bottom-14 z-1 h-[48px] w-[48px] rounded-full p-0 shadow-[0_8px_24px_#2dd4bf47] ring-[5px]'
						onClick={openCreate}
					/>
				}>
				<Plus className='size-5' />
			</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Backdrop className='fixed inset-0 bg-black/60' />
				<Drawer.Viewport className='fixed inset-0 z-2 flex items-end'>
					<Drawer.Popup className='bg-drawer-background w-full rounded-t-3xl p-4'>
						<Drawer.Title>
							<div className='flex items-center justify-between'>
								<div>
									<p className='eyebrow items-start'>Новая операция</p>
									<h2 className='text-[22px] font-normal tracking-[-.04em]'>Добавить транзакцию</h2>
								</div>
								<Drawer.Close
									render={
										<Button
											aria-label='Закрыть'
											className='border-input-border h-11 w-11 rounded-full border bg-[#132131] p-0 text-[#8291a4] shadow-none'
										/>
									}>
									<X />
								</Drawer.Close>
							</div>
						</Drawer.Title>
						<Drawer.Content>
							<DrawerForm key={`${draft?.id ?? 'new'}-${open}`} draft={draft} close={close} />
						</Drawer.Content>
					</Drawer.Popup>
				</Drawer.Viewport>
			</Drawer.Portal>
		</Drawer.Root>
	);
}
