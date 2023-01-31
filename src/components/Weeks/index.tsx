import { useEffect, useState } from 'react';
import { useAppContext } from '@/hooks/useAppContext';

import {Week} from '../../interfaces/Week';

import styles from './styles.module.css';


interface WeeksProps {
  setYear: (year: number) => void;
  setWeek: (week: number) => void;
}

export default function Weeks({setYear, setWeek} : WeeksProps) {
  const context = useAppContext();
  
  function loadBoardIndex() {
    const index = String(localStorage.getItem('@mementomori:index'));
    
    if (index) {
      context.updateIndex(Number(index))
    }
  }

  useEffect(() => {
    loadBoardIndex()
  })
  
  function handleClick(week: Week) {
    const year = (week.index + 1) / 26
    context.updateIndex(week.index)
    
    context.updateIndex(week.index)
    localStorage.setItem('@mementomori:index', String(week.index));
    
    setWeek(week.index)
    setYear(year / 2)
  }

  return (
    <div className={styles.container}>
      
      {context.listWeeks.map((week) => {
        return (
          <span 
            onClick={() => handleClick(week)} key={week.index}
            className={`${styles.one_week} ${week.index <= context.index  ? styles.active : ''}`}>
          </span>
        )
      })}
    </div>
  )
}