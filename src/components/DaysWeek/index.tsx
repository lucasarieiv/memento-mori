import { useState } from 'react';
import { DaySelector } from './DaySelector';
import { Day } from '@/interfaces/Day';

import styles from './styles.module.css';

interface DaysWeekProps {
  setActiveDaysWeek(daysWeek: any): void;
}

export function DaysWeek({setActiveDaysWeek}: DaysWeekProps) {
  const [daysWeek, setDaysWeek] = useState<Day[]>([
    {name: 'S', weekIndex: 1, isActive: false},
    {name: 'T', weekIndex: 2, isActive: false},
    {name: 'Q', weekIndex: 3, isActive: false},
    {name: 'Q', weekIndex: 4, isActive: false},
    {name: 'S', weekIndex: 5, isActive: false},
    {name: 'S', weekIndex: 6, isActive: false},
    {name: 'D', weekIndex: 7, isActive: false}
  ]);

  function handleClick(day: Day) {
    const newDaysWeek = daysWeek.map(findDay => {
      if (findDay.weekIndex == day.weekIndex) {
        findDay.isActive = day.isActive
      }
      return findDay
    })

    setDaysWeek(newDaysWeek);
    setActiveDaysWeek(daysWeek);
  }

  return (
    <div className={styles.container}>
      <p className={styles.text}>Escolha os dias da semana onde serão aplicados os hábitos</p>
      <div className={styles.habits_container}>
        {daysWeek.map(day => (
          <DaySelector handleDayWeek={handleClick} key={day.weekIndex} day={day} />
        ))}
      </div>
    </div>
  )
}