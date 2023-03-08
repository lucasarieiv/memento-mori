import { Check } from "@/components/Check";
import { Habit } from "@/interfaces/Habit";


interface WeekDayProps {
  weekHabits: Habit[],
  weekDay: number,
  weekHabitList: Habit[][],
  weekSelected: number
}

const weekObject: {[key: number] : string} = {
  0: 'Segunda-Feira',
  1: 'Terça-feira',
  2: 'Quarta-feira',
  3: 'Quinta-feira',
  4: 'Sexta-feira'
}

export function WeekDay({weekHabits, weekDay, weekHabitList, weekSelected}: WeekDayProps) {
  return (
    <>
      <h3>{weekObject[weekDay]}</h3>
      {weekHabits.map((habit: Habit) => {
        return <Check key={`${habit.id}${weekDay}`} habit={habit} weekNumber={weekSelected} weekHabitList={weekHabitList} />;
      })}
    </>
  )
}