import { z } from 'zod';

export const signUpFields = z.object({
	email: z.email({ error: 'Введите почту' }),
	password: z.string().min(6, { error: 'Пароль должен быть не короче 6 символов' }),
	name: z.string().trim().min(1, { error: 'Введите имя' }),
	familyName: z.string().trim().optional(),
	code: z.string().trim().optional(),
});

export const signUpSchema = signUpFields.refine((data) => data.familyName || data.code, {
	error: 'Введите название семьи или код приглашения',
});
