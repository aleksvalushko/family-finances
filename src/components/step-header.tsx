export function StepHeader({ step }: { step: 1 | 2 | 3 }) {
	return (
		<div>
			<div className='flex gap-2'>
				<div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-button' : 'bg-white/15'}`} />
				<div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-button' : 'bg-white/15'}`} />
			</div>
			<span className='text-label mt-[3px] text-[8px] font-bold tracking-[.1em] uppercase'>
				{step === 1 ? 'Шаг 1 из 2' : step === 2 ? 'Шаг 2 из 2' : 'Семья создана'}
			</span>
		</div>
	);
}
