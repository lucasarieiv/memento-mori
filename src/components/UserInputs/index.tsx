import React, { useState } from 'react';
import styles from './styles.module.css';
import { useAppContext } from '@/hooks/useAppContext';

export default function UserInputs() {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const context = useAppContext();

  function handleClick() {
    context.autoGenerate(Number(year), Number(month))
  }

  return (
    <div className={styles.container}>
      <input value={year} onChange={(event) => setYear(event?.target.value)} className={styles.input_year} type="text" placeholder="Seu ano de nascimento"/>
      <input value={month} onChange={(event) => setMonth(event?.target.value)} className={styles.input_month} type="text" placeholder="Seu mês de aniversário Ex: 01, 02"/>

      <button onClick={handleClick} className={styles.btn}>Gerar</button>
    </div>
  );
}