import { supabase } from '$lib/supabase';
import type { Tables } from '$lib/types/supabase';
import type { PageLoad } from './$types';
import { workouts } from '$lib/stores/workout';

export const load: PageLoad = async () => {
	const { data, error } = await supabase
		.from('workouts')
		.select('id, name, age, skill, "isFriend", regimen, "desc", location, "dateTime"');

	if (error) {
		console.error('Error fetching workouts:', error);
		return { workouts: [] };
	}

	// Map to WorkoutComponent array
	const workoutsTemp: WorkoutComponent[] = data.map((row) => ({
		id: row.id,
		name: row.name, // Placeholder
		age: row.age, // Placeholder
		skill: row.skill, // Placeholder
		isFriend: row.isFriend, // Placeholder
		regimen: row.regimen, // Placeholder
		desc: row.desc,
		location: row.location, // Placeholder
		dateTime: row.dateTime // Placeholder
	}));

	workouts.set(workoutsTemp)
	
	return { workouts:data };
};
