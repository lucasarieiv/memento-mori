import Modal from 'react-modal';
import { HabitList } from '../HabitList';
import { DaysWeek } from '../DaysWeek';
import { useAppContext } from '@/hooks/useAppContext';

import styles from './styles.module.css';
import { useState } from 'react';
import { Day } from '@/interfaces/Day';


interface HabitModalProps {
  habitModalIsOpen: boolean;
  handleHabitModalIsOpen: (isOpen: boolean) => void;
  habitsInterval: number[];
}

export function ModalCreateHabit({habitModalIsOpen, handleHabitModalIsOpen, habitsInterval }: HabitModalProps) {
  const { habits, setHabits, setWeekWithHabits} = useAppContext();
  const [activeDaysWeek, setActiveDaysWeek] = useState([]);


  const closeModal = () => {
    handleHabitModalIsOpen(false)
  }

  function handleCreateHabitList() {
    
    if (habits.length <= 0) return;
    const periodHabits = new Map();
    
    for (let count = habitsInterval[0]; count <= habitsInterval[1]; count++) {
      let weekHabits = new Array(7);

      activeDaysWeek.forEach((day: Day) => {
        if (day.isActive) {
          weekHabits[day.weekIndex - 1] = habits.map(habit => {
            return {
              ...habit,
            }
          })
        } else {
          weekHabits[day.weekIndex - 1] = []
        }
      })
      
      periodHabits.set(count, weekHabits);
    }

    setWeekWithHabits([...periodHabits])
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
          <DaysWeek setActiveDaysWeek={setActiveDaysWeek}/>

          <button className={styles.btn_confirm} onClick={handleCreateHabitList}>Confirmar</button>
        </div>
      </div>
    </Modal>
  )
}