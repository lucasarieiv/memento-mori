
import { Check } from "@/components/Check";
import { Habit } from "@/interfaces/Habit";
import { Calendar } from "react-feather";

import styles from "./styles.module.css";

interface WeekDayProps {
  weekHabits: Habit[];
  weekDay: number;
  weekHabitList: Habit[][];
  weekSelected: number;
}

const weekObject: { [key: number]: string } = {
  0: "Segunda-Feira",
  1: "Terça-feira",
  2: "Quarta-feira",
  3: "Quinta-feira",
  4: "Sexta-feira",
};

export function WeekDay({
  weekHabits,
  weekDay,
  weekHabitList,
  weekSelected,
}: WeekDayProps) {
  return (
    <div className={styles.container}>
      <p className={styles.title}><Calendar size={18} /> {weekObject[weekDay]}</p>
      {weekHabits.map((habit: Habit) => {
        return (
          <Check
            key={`${habit.id}${weekDay}`}
            habit={habit}
            weekNumber={weekSelected}
            weekHabitList={weekHabitList}
          />
        );
      })}
    </div>
  );
}
