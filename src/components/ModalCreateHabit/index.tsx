import Select from 'react-select';
import Modal from 'react-modal';

import styles from './styles.module.css';
import { useState } from 'react';
import { HabitList } from '../HabitList';
import { useAppContext } from '@/hooks/useAppContext';
import uuid from 'react-uuid';

interface HabitModalProps {
  habitModalIsOpen: boolean;
  handleHabitModalIsOpen: (isOpen: boolean) => void;
}

interface IHabit {
  id: string;
  text: string;
  isCompleted: boolean
}

export function ModalCreateHabit({habitModalIsOpen, handleHabitModalIsOpen}: HabitModalProps) {
  const { habits, setHabits, habitListNumbersOfWeek, setHabitListNumbersOfWeek } = useAppContext();
  const agesOptions = [
    {value: 1, label: 1},
    {value: 2, label: 2},
    {value: 3, label: 3},
    {value: 4, label: 4},
    {value: 5, label: 5},
    {value: 6, label: 6},
    {value: 7, label: 7},
    {value: 8, label: 8},
    {value: 9, label: 9},
    {value: 10, label: 10},
    {value: 11, label: 11},
    {value: 12, label: 12},
    {value: 13, label: 13},
    {value: 14, label: 14},
    {value: 15, label: 15},
    {value: 16, label: 16},
    {value: 17, label: 17},
    {value: 18, label: 18},
    {value: 19, label: 19},
    {value: 20, label: 20},
    {value: 21, label: 21},
    {value: 22, label: 22},
    {value: 23, label: 23},
    {value: 24, label: 24},
    {value: 25, label: 25},
    {value: 26, label: 26},
    {value: 27, label: 27},
    {value: 28, label: 28},
    {value: 29, label: 29},
    {value: 30, label: 30},
    {value: 31, label: 31},
    {value: 32, label: 32},
    {value: 33, label: 33},
    {value: 34, label: 34},
    {value: 35, label: 35},
    {value: 36, label: 36},
    {value: 37, label: 37},
    {value: 38, label: 38},
    {value: 39, label: 39},
    {value: 40, label: 40},
    {value: 41, label: 41},
    {value: 42, label: 42},
    {value: 43, label: 43},
    {value: 44, label: 44},
    {value: 45, label: 45},
    {value: 46, label: 46},
    {value: 47, label: 47},
    {value: 48, label: 48},
    {value: 49, label: 49},
    {value: 50, label: 50},
    {value: 51, label: 51},
    {value: 52, label: 52},
    {value: 53, label: 53},
    {value: 54, label: 54},
    {value: 55, label: 55},
    {value: 56, label: 56},
    {value: 57, label: 57},
    {value: 58, label: 58},
    {value: 59, label: 59},
    {value: 60, label: 60},
    {value: 61, label: 61},
    {value: 62, label: 62},
    {value: 63, label: 63},
    {value: 64, label: 64},
    {value: 65, label: 65},
    {value: 66, label: 66},
    {value: 67, label: 67},
    {value: 68, label: 68},
    {value: 69, label: 69},
    {value: 70, label: 70},
    {value: 71, label: 71},
    {value: 72, label: 72},
    {value: 73, label: 73},
    {value: 74, label: 74},
    {value: 75, label: 75},
    {value: 76, label: 76},
    {value: 77, label: 77},
    {value: 78, label: 78},
    {value: 79, label: 79},
    {value: 80, label: 80}
  ]

  agesOptions.reverse();

  const [optionOne, setOptionOne] = useState(0);
  const [optionTwo, setOptionTwo] = useState(0);

  const closeModal = () => {
    handleHabitModalIsOpen(false)
  }

  function handleCreateHabitList() {
    if (optionOne != 0 && optionTwo != 0) {
      if (optionOne > optionTwo) return;

      const optionOneIndex = (optionOne * 52) - 52;
      const optionTwoIndex = optionTwo * 52;

      const periodHabits = new Map();
      
      for (let count = optionOneIndex; count <= optionTwoIndex; count++) {
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

      setOptionOne(0);
      setOptionTwo(0)
      setHabits([]);
      closeModal();
    }
  }

  return (
    <Modal
      className={styles.container}
      isOpen={habitModalIsOpen}
      onRequestClose={closeModal}
    >
      <div>
        <h1 className={styles.title}>Selecione o período de idades onde esses hábitos serão aplicados</h1>

        <div className={styles.inputs_container}>
          <Select 
            instanceId='age-option-one'
            options={ agesOptions }
            name='ageOne'
            isSearchable={true}
            onChange={(item) => item ? setOptionOne(item?.value) : setOptionOne(0)}
          />
          <span>até</span>
          <Select 
            instanceId='age-option-two'
            options={ agesOptions }
            name='ageTwo'
            isSearchable={true}
            onChange={(item) => item ? setOptionTwo(item?.value) : setOptionTwo(0)}
          />

          <HabitList />

          <button className={styles.btn_confirm} onClick={handleCreateHabitList}>Confirmar</button>
        </div>
      </div>
    </Modal>
  )
}