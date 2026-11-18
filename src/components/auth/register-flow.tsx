'use client';

import { useState } from 'react';
import { ZeroStep } from '@/components/auth/zero-step';
import { NameStep } from '@/components/auth/name-step';
import { FinishStep } from '@/components/auth/finish-step';
import { CreatedFamily } from '@/components/auth/created-family';
import { signUpSchema } from '@/lib/auth-schema';

type SignUpResult = { error?: string; inviteCode?: string };

export function RegisterFlow({
	signUpAction,
}: {
	signUpAction: (formData: FormData) => Promise<SignUpResult>;
}) {
	const [step, setStep] = useState(0);
	const [error, setError] = useState<string | null>(null);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [familyName, setFamilyName] = useState('');
	const [inviteCode, setInviteCode] = useState('');

	function reset() {
		setStep(0);
		setError(null);
		setEmail('');
		setPassword('');
		setName('');
		setFamilyName('');
		setInviteCode('');
	}

	async function finish(formData: FormData) {
		formData.set('email', email);
		formData.set('password', password);
		formData.set('name', name);

		const validation = signUpSchema.safeParse({
			email,
			password,
			name,
			familyName: String(formData.get('familyName') ?? ''),
			code: String(formData.get('code') ?? ''),
		});
		if (!validation.success) {
			setError(validation.error.issues[0]?.message ?? 'Проверьте поля');
			return;
		}
		setError(null);

		const result = await signUpAction(formData);

		if (result.error || !result.inviteCode) {
			setError(result.error ?? 'Не получилось завершить регистрацию');
			return;
		}

		setInviteCode(result.inviteCode);
		setStep(3);
	}

	if (step === 0) {
		return (
			<ZeroStep
				error={error}
				setErrorAction={setError}
				setStepAction={setStep}
				email={email}
				setEmailAction={setEmail}
				password={password}
				setPasswordAction={setPassword}
			/>
		);
	}

	if (step === 1) {
		return (
			<NameStep
				setStepAction={setStep}
				email={email}
				setErrorAction={setError}
				name={name}
				error={error}
				setNameAction={setName}
			/>
		);
	}

	if (step === 2) {
		return <FinishStep setFamilyNameAction={setFamilyName} finishAction={finish} error={error} />;
	}

	return (
		<CreatedFamily
			familyName={familyName}
			inviteCode={inviteCode}
			finishAction={finish}
			resetAction={reset}
		/>
	);
}
