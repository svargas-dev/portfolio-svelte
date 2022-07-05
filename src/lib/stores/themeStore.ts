import { writable } from 'svelte/store';

export type ThemeType = 'light' | 'dark' | undefined;
export const themeStore = writable<ThemeType>(undefined);
