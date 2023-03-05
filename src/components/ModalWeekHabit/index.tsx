import { useAppContext } from "@/hooks/useAppContext";
import Modal from "react-modal";

import { Habit } from "@/interfaces/Habit";
import { Check } from "../Check";

import styles from "./styles.module.css";

interface ModalWeekHabitProps {
  weekNumber: number;
  weekModalIsOpen: boolean;
  handleWeekModalIsOpen: (isOpen: boolean) => void;
}

export function ModalWeekHabit({
  weekNumber,
  weekModalIsOpen,
  handleWeekModalIsOpen,
}: ModalWeekHabitProps) {
  const { updateIndex, habitListNumbersOfWeek, setHabitListNumbersOfWeek } = useAppContext();
  

  console.log('Line 26 habitListNumbersOfWeek: ', habitListNumbersOfWeek);

  const habitListWeek = habitListNumbersOfWeek.get(weekNumber) as Habit[][];

  function handleClick() {
    updateIndex(weekNumber);
    localStorage.setItem("@mementomori:index", String(weekNumber));
    closeModal();
  }

  const closeModal = () => {
    handleWeekModalIsOpen(false);
  };

  const weekObject: {[key: number] : string} = {
    0: 'Segunda-Feira',
    1: 'Terça-feira',
    2: 'Quarta-feira',
    3: 'Quinta-feira',
    4: 'Sexta-feira'
  }

  return (
    <Modal
      className={styles.container}
      isOpen={weekModalIsOpen}
      onRequestClose={closeModal}
    >
      <h3>Semana {weekNumber}</h3>

      {habitListWeek ? (
        habitListWeek.map((week, i) => {
          return (
            <>
              <h3 key={i}>{weekObject[i]}</h3>
              {week.map((habit: Habit) => {
                return <Check key={habit.id} habit={habit} />;
              })}
            </>
          );
        })
      ) : (
        <h1>Não Existem Hábitos cadastrados neste perído</h1>
      )}

      <button onClick={handleClick}>Semana concluída</button>
    </Modal>
  );
}
