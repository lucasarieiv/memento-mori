import { useEffect, useState } from 'react';

import {Week} from '../../interfaces/Week';

import styles from './styles.module.css';



interface WeeksProps {
  setYear: (year: number) => void;
  setWeek: (week: number) => void;
  allWeeks: Week[];
}

export default function Weeks({setYear, setWeek, allWeeks} : WeeksProps) {
  const [weekNumber, setWeekNumber] = useState<number | null>(0);
  
  function loadBoardIndex() {
    const index = String(localStorage.getItem('@mementomori:index'));
    
    if (index) {
      setWeekNumber(Number(index))
    }
  }

  useEffect(() => {
    loadBoardIndex()
  })
  
  function handleClick(week: Week) {
    const year = (week.index + 1) / 26
    setWeekNumber(week.index);

    localStorage.setItem('@mementomori:index', String(week.index));
    
    setWeek(week.index)
    setYear(year / 2)
    console.log(week.index);
    
  }

  return (
    <div className={styles.container}>
      
      {allWeeks.map((week) => {
        return (
          <span 
            onClick={() => handleClick(week)} key={week.index}
            className={`${styles.one_week} ${week.index <= weekNumber  ? styles.active : ''}`}>
          </span>
        )
      })}
    </div>
  )
}

