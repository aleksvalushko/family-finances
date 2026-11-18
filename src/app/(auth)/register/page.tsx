import { createClient } from '@/lib/supabase/server';
import { RegisterFlow } from '@/components/auth/RegisterFlow';

export default async function RegisterPage() {
	async function signUp(formData: FormData) {
		'use server';

		const supabase = await createClient();
		const email = String(formData.get('email') ?? '');
		const password = String(formData.get('password') ?? '');
		const name = String(formData.get('name') ?? '');
		const familyName = String(formData.get('familyName') ?? '');
		const code = String(formData.get('code') ?? '');
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: { data: { name } },
		});
		if (error) return { error: error.message };
		if (!data.session || !data.user) return { error: 'Не удалось создать сессию' };

		if (familyName) {
			const { data: family, error: familyError } = await supabase
				.from('families')
				.insert({ name: familyName, created_by: data.user.id })
				.select('id, invite_code')
				.single();

			if (familyError || !family) return { error: 'Не удалось создать семью' };

			const { error: updateError } = await supabase
				.from('profiles')
				.update({ family_id: family.id })
				.eq('id', data.user.id);

			if (updateError) return { error: 'Не удалось привязать семью' };

			return { inviteCode: family.invite_code };
		}

		const { data: familyId, error: joinError } = await supabase.rpc('join_family', { code });

		if (joinError || !familyId) return { error: 'Не удалось войти в семью' };

		const { data: family, error: familyError } = await supabase
			.from('families')
			.select('invite_code')
			.eq('id', familyId)
			.single();

		if (familyError || !family) return { error: 'Не удалось получить код приглашения' };

		return { inviteCode: family.invite_code };
	}

	return <RegisterFlow signUpAction={signUp} />;
}
