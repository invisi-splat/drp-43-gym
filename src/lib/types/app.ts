interface WorkoutComponent {
  name: string,
  age: number,
  skill: string, // TODO change this to an enum of some sort (e.g. novice, experienced, ...)
  isFriend: boolean,
  regiment: string, // TODO change this to an enum of some sort (e.g. legs, chest, back, ...)
  desc: string,
  location: string,
  dateTime: Date
}