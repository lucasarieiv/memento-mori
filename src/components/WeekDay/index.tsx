
import { Check } from "@/components/Check";
import { Habit } from "@/interfaces/Habit";
import { Calendar } from "react-feather";

import styles from "./styles.module.css";

interface WeekDayProps {
  weekHabits: Habit[];
  weekDay: number;
  weekSelected: number;
}

const weekObject: { [key: number]: string } = {
  0: "Segunda-Feira",
  1: "Terça-feira",
  2: "Quarta-feira",
  3: "Quinta-feira",
  4: "Sexta-feira",
  5: "Sábado",
  6: "Domingo",
};

export function WeekDay({
  weekHabits,
  weekDay,
  weekSelected,
}: WeekDayProps) {
  
  return (
    <div className={styles.container}>
      <p className={styles.title}><Calendar size={18} /> {weekObject[weekDay]}</p>

      {weekHabits.length >= 1 ?
        (weekHabits.map((habit: Habit, idxHabit: number) => {
          return (
            <Check
              key={`${habit.id}${weekDay}`}
              habit={habit}
              weekNumberSelected={weekSelected}
              weekDay={weekDay}
              habitPosition={idxHabit}
            />
          );
        }))
      :
        <p>Você não possui hábitos cadastrados neste dia.</p>
      }
    </div>
  );
}
