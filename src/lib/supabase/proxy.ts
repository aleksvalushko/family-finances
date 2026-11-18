import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({ request });
	let pendingCookies: {
		name: string;
		value: string;
		options?: Parameters<typeof supabaseResponse.cookies.set>[2];
	}[] = [];

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet, headers) {
					pendingCookies = cookiesToSet;
					cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
					supabaseResponse = NextResponse.next({ request });
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options)
					);
					Object.entries(headers).forEach(([key, value]) =>
						supabaseResponse.headers.set(key, value)
					);
				},
			},
		}
	);

	// Не вставляй свой код между createServerClient и getClaims
	const { data } = await supabase.auth.getClaims();
	const user = data?.claims;
	const path = request.nextUrl.pathname;
	const isAuthPage = path.startsWith('/login') || path.startsWith('/register');

	if (!user && !isAuthPage) {
		const url = request.nextUrl.clone();
		url.pathname = '/login';
		const redirectResponse = NextResponse.redirect(url);
		pendingCookies.forEach(({ name, value, options }) => {
			redirectResponse.cookies.set(name, value, options);
		});
		return redirectResponse;
	}

	if (user && isAuthPage) {
		const url = request.nextUrl.clone();
		url.pathname = '/';
		const redirectResponse = NextResponse.redirect(url);
		pendingCookies.forEach(({ name, value, options }) => {
			redirectResponse.cookies.set(name, value, options);
		});
		return redirectResponse;
	}

	return supabaseResponse;
}
