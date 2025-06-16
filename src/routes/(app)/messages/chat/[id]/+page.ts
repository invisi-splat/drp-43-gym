import { supabase } from '$lib/supabase';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	// Check if the ID is castable to a number
	if (isNaN(Number(params.id))) {
		throw new Error('Invalid chat ID');
	}

	const chat_id = Number(params.id);

	const { data, error } = await supabase
		.from('chats')
		.select(
			`
		id, name, messages ( * )
		`
		)
		.eq('id', chat_id)
		.single();

	if (data === null || error) {
		throw new Error('Failed to load chat data');
	}

	return data;
};
