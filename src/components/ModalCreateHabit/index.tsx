import Modal from 'react-modal';

import styles from './styles.module.css';
import { HabitList } from '../HabitList';
import { useAppContext } from '@/hooks/useAppContext';

interface HabitModalProps {
  habitModalIsOpen: boolean;
  handleHabitModalIsOpen: (isOpen: boolean) => void;
  habitsInterval: number[];
}

interface IHabit {
  id: string;
  text: string;
  isCompleted: boolean
}

export function ModalCreateHabit({habitModalIsOpen, handleHabitModalIsOpen, habitsInterval}: HabitModalProps) {
  const { habits, setHabits, habitListNumbersOfWeek, setHabitListNumbersOfWeek } = useAppContext();

  const closeModal = () => {
    handleHabitModalIsOpen(false)
  }

  function handleCreateHabitList() {
    if (habits.length <= 0) return;
    const periodHabits = new Map();
    
    for (let count = habitsInterval[0]; count <= habitsInterval[1]; count++) {
      let weekHabits = [];

      for (let index = 0; index < 5; index++) {
        const newHabitsId = habits.map(habit => {
          return {
            ...habit,
            weekNumber: index
          }
        })

        weekHabits.push(newHabitsId)
      }

      periodHabits.set(count, weekHabits)
    }

    setHabitListNumbersOfWeek(new Map([
      ...habitListNumbersOfWeek,
      ...periodHabits
    ]))

    localStorage.setItem('@mementomori:weeksHabits', JSON.stringify([
      ...habitListNumbersOfWeek,
      ...periodHabits
    ]))

    setHabits([]);
    closeModal();
  }

  return (
    <Modal
      className={styles.container}
      isOpen={habitModalIsOpen}
      onRequestClose={closeModal}
    >
      <div>
        <h1 className={styles.title}>Cadastro de hábitos</h1>

        <div className={styles.inputs_container}>
          <HabitList />

          <button className={styles.btn_confirm} onClick={handleCreateHabitList}>Confirmar</button>
        </div>
      </div>
    </Modal>
  )
}