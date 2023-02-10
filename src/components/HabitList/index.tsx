import { useState, KeyboardEvent, Dispatch } from "react";
import { useAppContext } from "@/hooks/useAppContext";
import uuid from 'react-uuid';
import { Habit } from '@/interfaces/Habit';

import {Trash} from 'react-feather';

import styles from "./styles.module.css";

export function HabitList() {
  const { setHabits, habits } = useAppContext();
  const [habit, setHabit] = useState('');

  function addHabitToList() {
    if (habit === '') return
    const newHabit = {
      id: uuid(),
      text: habit
    }

    const newHabitsList = [
      ...habits,
      newHabit
    ]

    setHabits(newHabitsList)
    setHabit('')
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      addHabitToList()
    }
  }

  function handleRemoveHabit(habit: Habit) {
    const newList = habits.filter(item => item.id !== habit.id);
    setHabits(newList)
  }

  return (
    <div className={styles.container}>
      <ul className={styles.habits_container}>
        {habits.map((habit) => (
          <div className={styles.habit_item} key={habit.id}>
            <li className={styles.text}>{habit.text}</li>
            <span className={styles.delete} onClick={() => handleRemoveHabit(habit)}>
              <Trash size={24} className={styles.icon}/>
            </span>
          </div>
        ))}
      </ul>
      
      <div className={styles.button_container}>
        <input
          className={styles.input}
          type="text"
          placeholder='Digite
          um
          novo
          hábito'
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
          onKeyDown={handleKeyDown} 
        />

        <button className={styles.btn_add} onClick={addHabitToList}>Adicionar</button>
      </div>
    </div>
  );
}
