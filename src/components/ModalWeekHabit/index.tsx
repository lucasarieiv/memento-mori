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
  const { updateWeekNumber, setWeekModalIsOpen, habitListNumbersOfWeek } = useAppContext();
  const weekHabitList = habitListNumbersOfWeek.get(weekNumberSelected) as Habit[][];

  function handleClick() {
    updateWeekNumber(weekNumberSelected);
    closeModal();
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
      
      {weekHabitList && <h1 className={styles.title}>Lista de hábitos da semana</h1>}

      {weekHabitList ? (
        weekHabitList.map((weekHabits, i) => {
          return <WeekDay key={i} weekHabits={weekHabits} weekDay={i} weekHabitList={weekHabitList} weekSelected={weekNumberSelected}/>;
        })
      ) : (
        <h1 className={styles.title}>Não Existem Hábitos cadastrados neste perído</h1>
      )}

      <button className={styles.btn}onClick={handleClick}>Marcar semana como concluída</button>
    </Modal>
  );
}
