import { useState } from 'react';

import {Week} from '../../interfaces/Week';

import styles from './styles.module.css';


interface WeeksProps {
  setYear: (year: number) => void;
  setWeek: (week: number) => void;
  setMainBoardWeeks: (weeks: any) => void;
  receivedWeeks: Week[];
  weeksIndex: number;
  allWeeks: {weeks: Week[]}[];
}

export default function Weeks({setYear, setWeek, setMainBoardWeeks, receivedWeeks, weeksIndex, allWeeks} : WeeksProps) {
  const cleanWeeks: Week[] = [...receivedWeeks]
  
  const [weeks, setWeeks] = useState(() => {
    return [...receivedWeeks]
  })

  function handleClick(week: Week) {
    const year = (week.index + 1) / 26
    console.log(allWeeks.length);
    console.log(weeksIndex);
    
    
    setWeek(week.index)
    setYear(year / 2)

    setWeeks(() => {
      const newWeek = [...cleanWeeks];

      newWeek.forEach(item => {
        if (item.index <= week.index) {
          item.isActive = true;
        }
      })

      setMainBoardWeeks((prev: any) => {
        const newBoardWeeks = [...prev]
        newBoardWeeks[weeksIndex].weeks = [...newWeek]
        return newBoardWeeks;
      })

      return newWeek;
    })
    
  }

  function handleOver(index: number) {
    console.log(index);
  }

  return (
    <div className={styles.container}>
      
      {weeks.map((week) => {
        return (
          <span onClick={() => handleClick(week)} key={week.index}
            className={`${styles.one_week} ${week.isActive ? styles.active : ''}`}></span>
        )
      })}
    </div>
  )
}