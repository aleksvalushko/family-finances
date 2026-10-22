# Family Finances — NOTES

Дневник прогресса. Полный план этапов — в `README.md`.  
Сюда: статус, очередь на ближайшие дни, handoff работа ↔ дом.

**Обновлено:** 2026-10-22  
**Текущий этап по README:** 1 (Фундамент и Auth) — не закрыт

---

## Сейчас (статус)

| Тема                                                         | Статус                    |
| ------------------------------------------------------------ | ------------------------- |
| Этап 0 (подготовка, ключи, Node)                             | ✅                        |
| Next.js 16 + TS + Tailwind (`src/app`)                       | ✅                        |
| Пакеты `@supabase/supabase-js`, `@supabase/ssr`              | ✅                        |
| `.env.local` (URL + `PUBLISHABLE_KEY`)                       | ✅ локально, не в git     |
| `src/lib/supabase/client.ts`                                 | ✅                        |
| `src/lib/supabase/server.ts`                                 | ✅                        |
| `src/lib/supabase/proxy.ts` (`updateSession`, без редиректа) | ✅                        |
| `src/proxy.ts`                                               | ✅                        |
| Старые пустые `lib/supabase/*` в корне                       | ⬜ удалить, если ещё есть |
| Smoke `getClaims`                                            | ⬜                        |
| `/login`, `/register`                                        | ⬜                        |
| `signUp` / `signInWithPassword` / `signOut`                  | ⬜                        |
| Защита роутов + приветствие + выход                          | ⬜                        |
| Этап 2+ (БД, RLS, траты, PWA)                                | ⏸ не начинать             |

---

## Очередь (только ближайшее)

Критерий закрытия этапа 1 — в README, раздел «Этап 1». Здесь — конкретные шаги по порядку:

1. [x] `.env.local` + клиенты + `src/proxy.ts`
2. [x] Smoke: `npm run dev`; серверный `getClaims()` без ошибок env/ключа
3. [ ] `/login` и `/register` (email + пароль)
4. [ ] `signUp` / `signInWithPassword` / `signOut`
5. [ ] Редирект гостя → `/login` в `updateSession`; главная «Привет» + «Выйти»
6. [ ] Отметить в логе: «этап 1 закрыт» → дальше читать README, этап 2

---

## Лог

- 22-10-2026 — каркас Next, supabase-пакеты, пуш
- 22-10-2026 — `src/lib/supabase/*`, `src/proxy.ts`, `.env.local`
- 22-10-2026 — README = полный план этапов 0–8, NOTES = дневник
- 22-10-2026 — smoke тест

---

## Напоминания

- Env: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — как в коде
- Service role не в проект
- Редирект на `/login` — только после появления страниц auth
- Облачный агент видит код после `git push`; локальный Ask — сразу с диска

---

## Handoff

**Где остановился:** клиенты и proxy готовы; этап 1 не закрыт (нет smoke и auth UI)  
**Что работает:** утилиты supabase на месте  
**Не уверен:** smoke не гоняли; имя ключа в env совпадает с кодом  
**Следующий шаг:** очередь п.2 — smoke `getClaims`

---

## Шаблон для локального чата

```text
Открой NOTES.md и при необходимости README.md (текущий этап из NOTES).
Скажи следующий пункт из очереди NOTES и зачем он нужен.
Код — только если попрошу.
```
