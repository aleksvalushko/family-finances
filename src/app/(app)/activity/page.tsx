import { createClient } from '@/lib/supabase/server';
import { connection } from 'next/server';
import { Suspense } from 'react';

async function HomeContent() {
	await connection();

	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) return null;

	return <main className='flex flex-col items-center justify-start gap-4 px-4'></main>;
}

export default function Page() {
	return (
		<Suspense fallback={null}>
			<HomeContent />
		</Suspense>
	);
}
