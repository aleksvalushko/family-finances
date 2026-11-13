import Link from 'next/link';

export default function RegisterPage() {
	return (
		<div className="rounded-2xl border border-white/10 bg-gray-900 p-8 shadow-2xl">
			{/* Форма регистрации */}
			<p>
				Уже есть аккаунт?{' '}
				<Link href="/login">Войти</Link>
			</p>
		</div>
	);
}