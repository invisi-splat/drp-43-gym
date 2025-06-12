import { supabase } from '$lib/supabase';
import type { PageLoad } from './$types';
import { workouts } from '$lib/stores/workout';

const getWorkouts = async (): Promise<WorkoutComponent[]> => {
	const { data, error } = await supabase
		.from('workouts')
		.select(
			'id, desc, dateTime, isFriend, users ( name, age, sex, skill ), regimens ( name ), gyms ( name )'
		);

	if (error) {
		throw new Error('Failed to load workouts data');
	}

	// Map to WorkoutComponent array
	const workoutsTemp: WorkoutComponent[] = data.map((row) => ({
		id: row.id,
		name: row.users.name,
		age: row.users.age,
		skill: row.users.skill,
		isFriend: row.isFriend,
		regimen: row.regimens.name,
		regimenDesc: null, // Assuming regimen description is not needed here
		desc: row.desc,
		location: row.gyms.name,
		dateTime: row.dateTime
	}));

	workouts.set(workoutsTemp);

	return workoutsTemp;
};

const getGyms = async (): Promise<string[]> => {
	const { data, error } = await supabase.from('gyms').select('name');
	if (error) {
		throw new Error('Failed to load gyms data');
	}
	return data.map((gym) => gym.name);
};

const getRegimens = async (): Promise<string[]> => {
	const { data, error } = await supabase.from('regimens').select('name');
	if (error) {
		throw new Error('Failed to load regimens data');
	}
	return data.map((regimen) => regimen.name);
};

export const load: PageLoad = async () => {
	const workoutsTemp = await getWorkouts();
	const gyms = await getGyms();
	const regimens = await getRegimens();

	return { workouts: workoutsTemp, gyms, regimens };
};
