import { supabase } from '$lib/supabase';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	// Check if the ID is castable to a number
	if (isNaN(Number(params.id))) {
		throw new Error('Invalid Workout ID');
	}

	const id = Number(params.id);

	const { data, error } = await supabase.from('users').select('*').eq('id', id).single();

	if (error) {
		throw new Error('Failed to load user data');
	}

	const userProps: UserProps = {
		id: data.id,
		name: data.name,
		age: data.age,
		sex: data.sex,
		skill: data.skill
	};

	return { userProps };
};
