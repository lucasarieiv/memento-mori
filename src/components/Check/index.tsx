import { Habit } from "@/interfaces/Habit";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from '@radix-ui/react-icons';

import styles from './styles.module.css';
import { useAppContext } from "@/hooks/useAppContext";

interface CheckboxProps {
  habit: Habit,
  weekNumberSelected: number,
  weekDay: number,
  habitPosition: number
}

export function Check({habit, weekNumberSelected, weekDay, habitPosition}: CheckboxProps) {
  const { weeksWithHabits, setWeekWithHabits } = useAppContext();

  const newWeeksWithHabits = new Map([...weeksWithHabits])
  const weekHabitList = newWeeksWithHabits.get(weekNumberSelected);

  function handleCompleted() {
    weekHabitList[weekDay][habitPosition].isCompleted = !habit.isCompleted;
    newWeeksWithHabits.set(weekNumberSelected, weekHabitList);
    setWeekWithHabits(newWeeksWithHabits);
  }

  return (
    <div
      className={styles.CheckboxContainer}
      key={habit.id}
      onClick={() => handleCompleted()}
    >
      <Checkbox.Root className={styles.CheckboxRoot} checked={habit.isCompleted}>
        <Checkbox.Indicator className={styles.CheckboxIndicator}>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <p className={styles.text}>{habit.text}</p>
    </div>
  );
}
