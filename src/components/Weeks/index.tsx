import { useEffect, useState } from 'react';
import { useAppContext } from '@/hooks/useAppContext';

import {Week} from '../../interfaces/Week';

import styles from './styles.module.css';
import { ModalWeekHabit } from '../ModalWeekHabit';


export default function Weeks() {
  const {updateIndex, listWeeks, index} = useAppContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [weekNumber, setWeekNumber] = useState(0);

  
  function loadBoardIndex() {
    const index = String(localStorage.getItem('@mementomori:index'));
    
    if (index) {
      updateIndex(Number(index))
    }
  }

  useEffect(() => {
    loadBoardIndex()
  })
  
  function handleClick(week: Week) {
    setWeekNumber(week.index);
    setModalIsOpen(true);
  }

  return (
    <>
      <ModalWeekHabit weekIndex={weekNumber} weekModalIsOpen={modalIsOpen} handleWeekModalIsOpen={setModalIsOpen} />
      
      <div className={styles.container}>
        
        {listWeeks.map((week) => {
          return (
            <span 
              onClick={() => handleClick(week)} key={week.index}
              className={`${styles.one_week} ${week.index <= index  ? styles.active : ''}`}>
            </span>
          )
        })}
      </div>
    </>
  )
}