import { useEffect, useState } from 'react';
import { useAppContext } from '@/hooks/useAppContext';

import {Week} from '../../interfaces/Week';

import styles from './styles.module.css';
import { ModalWeekHabit } from '../ModalWeekHabit';
import { ModalCreateHabit } from '../ModalCreateHabit';


export default function Weeks() {
  const {updateIndex, listWeeks, index, isAppCreateHabitsMode} = useAppContext();

  const [habitModalIsOpen, setHabitModalIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [weekNumber, setWeekNumber] = useState(0);
  const [habitInterval, setHabitInterval] = useState([]);
  
  function loadBoardIndex() {
    const index = String(localStorage.getItem('@mementomori:index'));
    
    if (index) {
      updateIndex(Number(index))
    }
  }

  useEffect(() => {
    setHabitInterval([])
  }, [isAppCreateHabitsMode])

  useEffect(() => {
    loadBoardIndex()
  })
  
  function handleClick(week: Week) {
    setWeekNumber(week.index);
    setModalIsOpen(true);
  }

  function changeHabitInterval(weekNumber: number) {
    if (habitInterval.length == 1) {
      setHabitModalIsOpen(true)

    }
    
    if (habitInterval.length == 2) {
      setHabitInterval([])
    }

    setHabitInterval(prev => {
      return [...prev, weekNumber]
    })
  }

  return (
    <>
    <ModalCreateHabit 
      habitModalIsOpen={habitModalIsOpen}
      handleHabitModalIsOpen={setHabitModalIsOpen}
      habitsInterval={habitInterval}
    />

    {modalIsOpen && <ModalWeekHabit weekNumber={weekNumber} weekModalIsOpen={modalIsOpen} handleWeekModalIsOpen={setModalIsOpen} />}

    <div className={styles.container}>
        {!isAppCreateHabitsMode ? 
          listWeeks.map((week) => {
            return (
              <span 
                onClick={() => handleClick(week)} key={week.index}
                className={`${styles.one_week} ${week.index <= index  ? styles.active : ''}`}>
              </span>
            )
          })
          :
          listWeeks.map((week) => {
            return (
              <span 
                key={week.index}
                onClick={() => {
                  changeHabitInterval(week.index);
                }}
                className={`${styles.one_week} ${styles['-register-mode']} ${week.index <= index  ? styles.active : ''}`}>
              </span>
            )
          })
        }
        
      </div>
    </>
  )
}