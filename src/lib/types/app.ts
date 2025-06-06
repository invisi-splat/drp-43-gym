interface WorkoutProps {
	regimen: string; // TODO change this to an enum of some sort (e.g. legs, chest, back, ...)
	desc: string;
	location: string;
	dateTime: Date;
}

interface SelfWorkoutComponent extends WorkoutProps { }

interface WorkoutComponent extends WorkoutProps {
	id: bigint;
	name: string;
	age: number;
	skill: string; // TODO change this to an enum of some sort (e.g. novice, experienced, ...)
	isFriend: boolean;
}
