import { Day } from '@/interfaces/Day';
import styles from './styles.module.css';

interface DaySelectorProps {
  day: Day;
  handleDayWeek: (day: Day) => void;
}

export function DaySelector({day, handleDayWeek}: DaySelectorProps) {

  return (
    <button onClick={() => handleDayWeek({...day, isActive: !day.isActive})} className={`${styles.week_name} ${day.isActive && styles['-active']}`}>{day.name}</button>
  )
}