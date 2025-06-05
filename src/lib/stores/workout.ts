import { writable } from 'svelte/store';
export const workouts = writable<WorkoutComponent[]>([]);