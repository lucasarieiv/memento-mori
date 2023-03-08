import { Habit } from "@/interfaces/Habit";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from '@radix-ui/react-icons';

import styles from './styles.module.css';
import { useAppContext } from "@/hooks/useAppContext";

interface CheckboxProps {
  habit: Habit,
  weekNumber: number,
  weekHabitList: Habit[][]
}

export function Check({habit, weekNumber, weekHabitList}: CheckboxProps) {
  const { setHabitListNumbersOfWeek } = useAppContext();

  function handleCompleted(habitId: string, weekDayNumber: number = 0) {
    
    const newWeekHabitList = weekHabitList[weekDayNumber].map((habit) => {
      if (habit.id === habitId) {
        habit.isCompleted = !habit.isCompleted;
      }
      return habit;
    });

    const newHabitListWeeks: Map<number, Habit[][]> = new Map([...JSON.parse(localStorage.getItem('@mementomori:weeksHabits'))]);
  
    weekHabitList[weekDayNumber] = newWeekHabitList;
  
    newHabitListWeeks.set(weekNumber, weekHabitList);
    setHabitListNumbersOfWeek(newHabitListWeeks);
    localStorage.setItem('@mementomori:weeksHabits', JSON.stringify([...newHabitListWeeks]))
  }

  return (
    <div
      className={styles.CheckboxContainer}
      key={habit.id}
      onClick={() => handleCompleted(habit.id, habit.weekNumber)}
    >
      <Checkbox.Root className={styles.CheckboxRoot} checked={habit.isCompleted}>
        <Checkbox.Indicator className={styles.CheckboxIndicator}>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <p>{habit.text}</p>
    </div>
  );
}
