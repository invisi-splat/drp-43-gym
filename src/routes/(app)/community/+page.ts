import { supabase } from '$lib/supabase';
import type { Tables } from '$lib/types/supabase';
import type { PageLoad } from './$types';
import type { WorkoutComponent } from '$lib/types/app';

export const load: PageLoad = async () => {
    console.log(">>>>>>>>>RUNNING page.ts load functon")
	const { data, error } = await supabase
		.from('workouts')
		.select('id, description, machine');

	if (error) {
		console.error('Error fetching workouts:', error);
		return { workouts: [] };
	}

	// Map to WorkoutComponent array
	const workouts: WorkoutComponent[] = data.map(row => ({
		name: 'Default name', // Placeholder
		age: 25,              // Placeholder
		skill: 'Novice',      // Placeholder
		isFriend: false,      // Placeholder
		regimen: 'Unknown',   // Placeholder
		desc: row.description,
		location: 'Gym',      // Placeholder
		dateTime: new Date(), // Placeholder
	}));

    console.log(">>>>>>>>returning workouts: ", workouts)
	return { workouts };
};
