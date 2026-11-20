import {
	CarFront,
	CircleDollarSign,
	Ellipsis,
	Groceries,
	Home,
	type LucideIcon,
	Popcorn,
} from 'lucide-react';
import { createElement } from 'react';

export const categoryIcons = {
	Groceries,
	CarFront,
	Home,
	Popcorn,
	CircleDollarSign,
	Ellipsis,
} satisfies Record<string, LucideIcon>;

export type CategoryIconName = keyof typeof categoryIcons;

function isCategoryIconName(name: string): name is CategoryIconName {
	return Object.hasOwn(categoryIcons, name);
}

export function getCategoryIcon(name: string): LucideIcon {
	if (isCategoryIconName(name)) return categoryIcons[name];
	return Ellipsis;
}

export function CategoryIcon({ name, className }: { name?: string | null; className?: string }) {
	return createElement(getCategoryIcon(name ?? ''), { className });
}
