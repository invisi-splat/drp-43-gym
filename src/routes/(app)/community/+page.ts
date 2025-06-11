import { supabase } from '$lib/supabase';
import type { PageLoad } from './$types';
import { workouts } from '$lib/stores/workout';

export const load: PageLoad = async () => {
	const { data, error } = await supabase
		.from('workouts')
		.select(
			'id, desc, dateTime, isFriend, users ( name, age, sex, skill ), regimens ( name ), gyms ( name )'
		);

	if (error) {
		console.error('Error fetching workouts:', error);
		return { workouts: [] };
	}

	// Map to WorkoutComponent array
	const workoutsTemp: WorkoutComponent[] = data.map((row) => ({
		id: row.id,
		name: row.users.name,
		age: row.users.age,
		skill: row.users.skill,
		isFriend: row.isFriend,
		regimen: row.regimens.name,
		desc: row.desc,
		location: row.gyms.name,
		dateTime: row.dateTime
	}));

	workouts.set(workoutsTemp);

	return { workouts: workoutsTemp };
};
