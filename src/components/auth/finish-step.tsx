'use client';

import TextField from '@/components/ui/text-field';
import Button from '@/components/ui/button';
import { StepHeader } from '@/components/step-header';
import { ScreenHeading } from '@/components/screen-heading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight, Home, UsersRound } from 'lucide-react';

type PROPS = {
	finishAction: string | ((formData: FormData) => void | Promise<void>) | undefined;
	setFamilyNameAction: (value: string) => void;
	error?: string | null;
};

export function FinishStep({ finishAction, setFamilyNameAction, error }: PROPS) {
	return (
		<div className='flex h-full w-full flex-col'>
			<div className='mb-10'>
				<div className='mb-8'>
					<div className='mb-4 flex items-center gap-x-2'>
						<div className='brand-mark h-[37px] w-[37px] rounded-[12px]'>
							<span>F</span>
						</div>
						<span>Семейный бюджет</span>
					</div>
					<StepHeader step={2} />
				</div>
				<ScreenHeading
					title='Создайте свое семейное пространство'
					subtitle='Держите семейные расходы в тайне, сделайте их прозрачными и согласованными.'
				/>
			</div>
			<div className='create-card'>
				<Tabs defaultValue='create'>
					<TabsList className='bg-tabs h-[50px] w-full'>
						<TabsTrigger value='create'>Создать</TabsTrigger>
						<TabsTrigger value='join'>У меня есть код</TabsTrigger>
					</TabsList>
					<TabsContent value='create'>
						<form action={finishAction} className='auth-form'>
							<div className='w-full'>
								<div className='brand-mark text-button mb-4 rounded-[14px] border-none'>
									<Home className='size-7' />
								</div>
								<span className='m-0 text-[19px]'>Создайте семью</span>
								<p className='text-label mx-0 mt-[5px] mb-[19px] text-[11px]'>
									Выберите имя, которое оба узнаете.
								</p>
							</div>
							<TextField
								label='Название семьи'
								name='familyName'
								placeholder='Ивановы'
								onChange={(event) => setFamilyNameAction(event.target.value)}
							/>
							{error && <p className='text-sm text-red-400'>{error}</p>}
							<Button type='submit'>
								Создать семью <ChevronRight className='size-4' />
							</Button>
						</form>
					</TabsContent>
					<TabsContent value='join'>
						<div className='w-full'>
							<div className='brand-mark text-button mb-4 rounded-[14px] border-none'>
								<UsersRound className='size-7' />
							</div>
							<span className='m-0 text-[19px]'>Присоединитесь к семье</span>
							<p className='text-label mx-0 mt-[5px] mb-[19px] text-[11px]'>
								Попросите у своего партнёра его персональный код-приглашение.
							</p>
						</div>
						<form action={finishAction} className='auth-form'>
							<TextField label='Код приглашения' name='code' placeholder='560493' />
							{error && <p className='text-sm text-red-400'>{error}</p>}
							<Button type='submit'>
								Войти в семью <ChevronRight className='size-4' />
							</Button>
						</form>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
