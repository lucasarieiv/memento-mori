import { useAppContext } from "@/hooks/useAppContext";
import Modal from "react-modal";

import { Habit } from "@/interfaces/Habit";

import styles from "./styles.module.css";
import { WeekDay } from "../WeekDay";


interface ModalWeekHabitProps {
  weekModalIsOpen: boolean;
  weekNumberSelected: number;
}

export function ModalWeekHabit({
  weekModalIsOpen,
  weekNumberSelected,
}: ModalWeekHabitProps) {
  const { updateWeekNumber, setWeekModalIsOpen, weeksWithHabits } = useAppContext();

  const getWeeksWithHabits = new Map(weeksWithHabits)
  
  const weekHabitList = getWeeksWithHabits.get(weekNumberSelected);

  function handleClick() {
    updateWeekNumber(weekNumberSelected);
    closeModal();
  }

  function calculateProgress() {
    if (!weekHabitList) return;

    let totalWeekCompleted = 0;
    const totalWeeksWithHabits = weekHabitList.filter(habitList => habitList.length > 0).length ;
    
    weekHabitList.forEach((habitsWeek, i) => {
      let totalHabitsWeekCompleted = habitsWeek.filter((habitWeek) => habitWeek.isCompleted);
      
      let completedCount = totalHabitsWeekCompleted.length;
      let totalCompleted = (completedCount / habitsWeek.length) * 100 ? (completedCount / habitsWeek.length) * 100 : 0;
      totalWeekCompleted += totalCompleted;
    })

    return Math.round((totalWeekCompleted / totalWeeksWithHabits) * 100 / 100 );
  }

  const closeModal = () => {
    setWeekModalIsOpen(false);
  };


  return (
    <Modal
      className={styles.container}
      isOpen={weekModalIsOpen}
      onRequestClose={closeModal}
    >
      {weekHabitList && (
        <h1 className={styles.title}>Lista de hábitos da semana {calculateProgress()}%</h1>
      )}

      {weekHabitList && weekHabitList.map((weekHabits: Habit[], i: number) => {
        return (
          <WeekDay
            key={i}
            weekHabits={weekHabits}
            weekDay={i}
            weekSelected={weekNumberSelected}
          />
        );
      })}

      <button className={styles.btn} onClick={handleClick}>
        Marcar semana como concluída
      </button>
    </Modal>
  );
}
