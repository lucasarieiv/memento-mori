import { useAppContext } from "@/hooks/useAppContext";
import Modal from "react-modal";

import { Habit } from "@/interfaces/Habit";
import { Check } from "../Check";

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
      {weekHabitList ? (
        weekHabitList.map((weekHabits, i) => {
          return <WeekDay key={i} weekHabits={weekHabits} weekDay={i} weekHabitList={weekHabitList} weekSelected={weekNumberSelected}/>;
        })
      ) : (
        <p>Não Existem Hábitos cadastrados neste perído</p>
      )}

      <button onClick={handleClick}>Semana concluída</button>
    </Modal>
  );
}
