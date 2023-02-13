import { useAppContext } from '@/hooks/useAppContext';
import Modal from 'react-modal';

import styles from './styles.module.css';
import { Habit } from '@/interfaces/Habit';

interface ModalWeekHabitProps {
  weekNumber: number,
  weekModalIsOpen: boolean;
  handleWeekModalIsOpen: (isOpen: boolean) => void;
}

export function ModalWeekHabit({weekNumber, weekModalIsOpen, handleWeekModalIsOpen}: ModalWeekHabitProps) {
  const { updateIndex, habitListNumbersOfWeek, setHabitListNumbersOfWeek } = useAppContext();
  const newHabitListWeeks: Map<number, Habit[][]> = new Map([...habitListNumbersOfWeek]);
  const habitListWeek = newHabitListWeeks.get(weekNumber) as Habit[][];

  function handleClick() {
    updateIndex(weekNumber)
    localStorage.setItem('@mementomori:index', String(weekNumber));
    closeModal()
  }

  const closeModal = () => {
    handleWeekModalIsOpen(false)
  }

  function handleCompleted(habitId: string, weekDayNumber: number = 0) {
    const newHabitList = habitListWeek[weekDayNumber].map(habit => {
      if (habit.id === habitId) {
        habit.isCompleted = !habit.isCompleted;
      }
      return habit;
    })

    habitListWeek[weekDayNumber] = newHabitList;

    newHabitListWeeks.set(weekNumber, habitListWeek);
    setHabitListNumbersOfWeek(newHabitListWeeks);
  }

  return (
    <Modal
      className={styles.container}
      isOpen={weekModalIsOpen}
      onRequestClose={closeModal}
    >
      <h3>Semana {weekNumber}</h3>

      {habitListWeek ? habitListWeek.map((week, i) => {
        return (
          <>
            <h3 key={i}>Dia {i + 1}</h3>
            {week.map((habit: Habit) => {
              return (
                <p 
                  key={`${i}${habit.id}`}
                  onClick={() => handleCompleted(habit.id, habit.weekNumber)}
                >
                  {habit.isCompleted ? '[x]' : '[ ]'} {habit.text}
                </p>
              )
            })}
          </>
        )
      }) :
        <h1>Não Existem Hábitos cadastrados neste perído</h1>
      }

      <button onClick={handleClick}>Semana concluída</button>
    </Modal>
  )
}