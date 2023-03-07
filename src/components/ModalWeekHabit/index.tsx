import { useAppContext } from "@/hooks/useAppContext";
import Modal from "react-modal";

import { Habit } from "@/interfaces/Habit";
import { Check } from "../Check";

import styles from "./styles.module.css";

interface ModalWeekHabitProps {
  weekModalIsOpen: boolean;
  weekNumberSelected: number;
}

export function ModalWeekHabit({
  weekModalIsOpen,
  weekNumberSelected,
}: ModalWeekHabitProps) {
  const { updateWeekNumber, setWeekModalIsOpen, habitListNumbersOfWeek } = useAppContext();

  let habitListWeek = new Map();
  habitListWeek = habitListNumbersOfWeek.get(weekNumberSelected) as Habit[][];  

  function handleClick() {
    updateWeekNumber(weekNumberSelected);
    closeModal();
  }

  const closeModal = () => {
    setWeekModalIsOpen(false);
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
      {habitListWeek ? (
        habitListWeek.map((week, i) => {
          return (
            <>
              <h3 key={i}>{weekObject[i]}</h3>
              {week.map((habit: Habit) => {
                return (
                  <Check key={`${habit.id}${week}`} habit={habit} weekNumber={weekNumberSelected} />
                  );
              })}
            </>
          );
        })
      ) : (
        <p>Não Existem Hábitos cadastrados neste perído</p>
      )}

      <button onClick={handleClick}>Semana concluída</button>
    </Modal>
  );
}
