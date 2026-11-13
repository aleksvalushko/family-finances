import Link from 'next/link';

export default function LoginPage() {
	return (
		<div className="rounded-2xl border border-white/10 bg-gray-900 p-8 shadow-2xl">
			{/* Форма входа */}
			<p>
				Нет аккаунта?{' '}
				<Link href="/register">Зарегистрироваться</Link>
			</p>
		</div>
	);
}