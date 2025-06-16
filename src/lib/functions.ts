import { goto } from '$app/navigation';
import { supabase } from '$lib/supabase';

export async function messageUser(user1: number, user2: number) {
	// Attempt to fetch the private chat between the two users
	const { data, error } = await supabase.rpc('get_private_chat', { user1, user2 });
	if (error) {
		throw new Error(`Error fetching chat: ${error.message}`);
	}

	if (data.length === 0) {
		// If no chat exists, create a new one
		const { data, error } = await supabase.from('chats').insert({}).select('id').single();
		if (error) {
			throw new Error(`Error creating chat: ${error.message}`);
		}

		const chatId = data.id;

		// Insert the users into the chat
		await Promise.all([
			supabase.from('users_chats').insert({ user_id: user1, chat_id: chatId }),
			supabase.from('users_chats').insert({ user_id: user2, chat_id: chatId })
		]).then(() => {
			// Redirect to the new chat
			goto(`/messages/chat/${chatId}`);
		});
	} else {
		// If a chat exists, just redirect to it
		goto(`/messages/chat/${data[0].chat_id}`);
	}
}

// HACK this is not great --- should really ideally be in the db
export const muscleGroupImageMap: Record<string, string> = {
	legs: 'Leg-workout-muscles-broad.png',
	arms: 'arm-workout-muscles.png',
	chest: 'chest-workout-muscles.png',
	back: 'back-workout-muscles.png',
	abs: 'ab-workout-muscles.png',
	shoulders: 'shoulder-workout-muscles.png',
	cardio: 'athletes-heart.webp'
};
