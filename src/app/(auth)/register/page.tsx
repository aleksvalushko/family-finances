import Link from 'next/link';
import TextField from "@/components/ui/text-field";
import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {Suspense} from "react";

export default async function RegisterPage({
                                               searchParams,
                                           }: {
    searchParams: Promise<{ error?: string }>;
}) {

    async function signUp(formData: FormData) {
        'use server';

        const supabase = await createClient();
        const name = String(formData.get('name') ?? '');
        const email = String(formData.get('email') ?? '');
        const password = String(formData.get('password') ?? '');
        const {data, error} = await supabase.auth.signUp({
            email,
            password,
            options: {data: {name}},
        });
        if (error) {
            redirect(`/register?error=${encodeURIComponent(error.message)}`);
        }
        if (!data.session) {
            redirect('/login');
        }
        redirect('/');
    }

    return (
        <form action={signUp}
              className="rounded-2xl border border-white/10 bg-gray-900 p-8 shadow-2xl flex flex-col items-center gap-y-4">
            <TextField label="Имя" name="name" placeholder='Имя'/>
            <TextField label="E-mail" name="email" placeholder='E-mail'/>
            <TextField label="Пароль" name="password" placeholder='Пароль' type="password"/>

            <Suspense fallback={null}>
                <AuthError searchParams={searchParams}/>
            </Suspense>
            <button type="submit"
                    className="w-fit border border-white/30 p-2 rounded-lg cursor-pointer">Зарегистрироваться
            </button>
            <p>
                Уже есть аккаунт?{' '}
                <Link href="/login" className="underline text-blue-700 hover:text-blue-500">Войти</Link>
            </p>
        </form>
    );
}

async function AuthError({
                             searchParams,
                         }: {
    searchParams: Promise<{ error?: string }>;
}) {
    const {error} = await searchParams;
    if (!error) return null;
    return <p className="text-sm text-red-400">{error}</p>;
}