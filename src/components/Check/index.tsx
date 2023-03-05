import { Habit } from "@/interfaces/Habit";
import * as Checkbox from "@radix-ui/react-checkbox";

import styles from './styles.module.css';

interface CheckboxProps {
  habit: Habit
}

export function Check({habit}: CheckboxProps) {

  function handleCompleted(habitId: string, weekDayNumber: number = 0) {
    const newHabitList = habitListWeek[weekDayNumber].map((habit) => {
      if (habit.id === habitId) {
        habit.isCompleted = !habit.isCompleted;
      }
      return habit;
    });
  
    habitListWeek[weekDayNumber] = newHabitList;
  
    newHabitListWeeks.set(weekNumber, habitListWeek);
    setHabitListNumbersOfWeek(newHabitListWeeks);
  }

  return (
    <div
      className={styles.CheckboxContainer}
      key={`${habit.id}`}
      onClick={() => handleCompleted(habit.id, habit.weekNumber)}
    >
      <Checkbox.Root className={styles.CheckboxRoot}>
        <Checkbox.Indicator className={styles.CheckboxIndicator}>
          x
        </Checkbox.Indicator>
      </Checkbox.Root>
      <p>{habit.text}</p>
    </div>
  );
}
