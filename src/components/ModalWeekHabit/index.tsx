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
  const localStorageHabitListWeeks = localStorage.getItem("@mementomori:weeksHabits")

  let habitListWeek = new Map();

  if (localStorageHabitListWeeks) {
    const newHabitListNumbersOfWeek = new Map(JSON.parse(localStorageHabitListWeeks));
    habitListWeek = newHabitListNumbersOfWeek.get(weekNumber) as Habit[][];
  } else {
    habitListWeek = habitListNumbersOfWeek.get(weekNumber) as Habit[][];  
  }

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
      {habitListWeek ? (
        habitListWeek.map((week, i) => {
          return (
            <>
              <h3 key={i}>{weekObject[i]}</h3>
              {week.map((habit: Habit) => {
                return <>
                  <Check key={`${habit.id}${week}`} habit={habit} weekNumber={weekNumber} />
                </>;
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
