import { writable } from 'svelte/store';

export const menuButtonRefStore = writable<HTMLButtonElement | null>(null);
