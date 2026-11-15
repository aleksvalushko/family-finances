import Link from 'next/link';
import TextField from "@/components/ui/text-field";

export default function LoginPage() {
	return (
		<div className="rounded-2xl border border-white/10 bg-gray-900 p-8 shadow-2xl flex flex-col items-center gap-y-4">
			<TextField label="Логин" placeholder='Логин' />

			<TextField label="Пароль" placeholder='Пароль' type='password' />

			<button type="button" className="w-fit border border-white/30 p-2 rounded-lg cursor-pointer">Войти</button>
			<p>
				Нет аккаунта?{' '}
				<Link href="/register" className="underline text-blue-700 hover:text-blue-500">Зарегистрироваться</Link>
			</p>
		</div>
	);
}