let workouts: WorkoutComponent[] = $state([]);

export const getWorkouts = (): WorkoutComponent[] => {
	return workouts;
};

export const setWorkouts = (newWorkouts: WorkoutComponent[]) => {
	workouts = newWorkouts;
};
