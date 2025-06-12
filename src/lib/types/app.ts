type Timestampz = string;

interface WorkoutProps {
	regimen: string;
	regimenDesc: string | null;
	desc: string | null;
	location: string;
	dateTime: Timestampz;
}

interface SelfWorkoutComponent extends WorkoutProps {}

interface WorkoutComponent extends WorkoutProps {
	id: number;
	name: string;
	age: number;
	skill: 'novice' | 'experienced' | 'intermediate' | null;
	isFriend: boolean;
}

interface ExerciseComponent {
	id: number;
	name: string;
	description: string | null;
}
