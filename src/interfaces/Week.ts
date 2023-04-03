import { Habit } from "./Habit";

export interface Week {
  index: number,
  weekHabits: {[key: number]: Habit[]}
}