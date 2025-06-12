import type { PageLoad, RouteParams } from './$types';
import { supabase } from '$lib/supabase';

const loadWorkout = async (
	params: RouteParams
): Promise<{ workout: WorkoutComponent; regimen_id: number }> => {
	// Check if the ID is castable to a number
	if (isNaN(Number(params.id))) {
		throw new Error('Invalid Workout ID');
	}

	const id = Number(params.id);

	const { data, error } = await supabase
		.from('workouts')
		.select(
			'id, desc, dateTime, isFriend, users ( id, name, age, sex, skill ), regimens ( id, name, description ), gyms ( name )'
		)
		.eq('id', id)
		.single();

	if (error) {
		throw new Error('Failed to load workout data');
	}

	// Flatten the data into a WorkoutComponent
	const workout: WorkoutComponent = {
		id: data.id,
		name: data.users.name,
		age: data.users.age,
		skill: data.users.skill,
		user_id: data.users.id,
		isFriend: data.isFriend,
		regimen: data.regimens.name,
		regimenDesc: data.regimens.description,
		desc: data.desc,
		location: data.gyms.name,
		dateTime: data.dateTime
	};

	return { workout, regimen_id: data.regimens.id };
};

const loadExercises = async (regimen_id: number): Promise<ExerciseComponent[]> => {
	const { data, error } = await supabase
		.from('exercises')
		.select('id, name, description')
		.eq('regimen', regimen_id);

	if (error) {
		throw new Error(`Failed to load exercises data: ${error.message}`);
	}

	return data.map((exercise) => ({
		id: exercise.id,
		name: exercise.name,
		description: exercise.description
	}));
};

export const load: PageLoad = async ({ params }) => {
	const { workout, regimen_id } = await loadWorkout(params);
	const exercises = await loadExercises(regimen_id);
	return { workout, exercises };
};
