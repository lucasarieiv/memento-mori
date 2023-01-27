import { useState } from 'react';

import {Week} from '../../interfaces/Week';

import styles from './styles.module.css';



interface WeeksProps {
  setYear: (year: number) => void;
  setWeek: (week: number) => void;
  setMainBoardWeeks: (weeks: any) => void;
  weeksIndex: number;
  allWeeks: {weeks: Week[], middleWeeks: [number]}[];
  cleanWeeks: {weeks: Week[]}[];
}

export default function Weeks({setYear, setWeek, setMainBoardWeeks, weeksIndex, allWeeks, cleanWeeks} : WeeksProps) {
  const cleanWeeksBoard: Week[] = [...cleanWeeks[weeksIndex].weeks]
  
  function handleClick(week: Week) {
    const year = (week.index + 1) / 26

    setWeek(week.index)
    setYear(year / 2)
    console.log(week.index);
    
    updateAllWeeksActives(week.index);
  }

  function updateAllWeeksActives(position: number) {
    
    setMainBoardWeeks(() => {
      const newWeeks = [...cleanWeeks];
      for (let count = 0; count <= weeksIndex; count++) {

        newWeeks[count].weeks.forEach(item => {
          if (item.index <= position) {
            item.isActive = true;
          }
        })
      }
      
      return newWeeks;
    })
  }

  function middleWeeks(week: number) {
    const hasFound = allWeeks[weeksIndex].middleWeeks.findIndex((element) => week === element)
    
    if (hasFound < 0) return false
    return true
  }

  return (
    <div className={styles.container}>
      
      {allWeeks[weeksIndex].weeks.map((week) => {
        return (
          <span 
            onClick={() => handleClick(week)} key={week.index}
            className={`${styles.one_week} ${middleWeeks(week.index) ? styles.red : ''} ${week.isActive ? styles.active : ''}`}>
          </span>
        )
      })}
    </div>
  )
}

