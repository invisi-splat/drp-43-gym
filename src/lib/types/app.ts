type Timestampz = string;
type Skill = 'novice' | 'experienced' | 'intermediate' | null;

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
	user_id: number;
	skill: Skill;
	isFriend: boolean;
}

interface ExerciseComponent {
	id: number;
	name: string;
	description: string | null;
}

interface UserProps {
	id: number;
	name: string;
	age: number;
	sex: string;
	skill: Skill;
}
