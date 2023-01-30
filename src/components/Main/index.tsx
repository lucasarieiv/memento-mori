import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '@/hooks/useAppContext';

import Weeks from '@/components/Weeks';

import styles from './styles.module.css'
import { useReactToPrint } from 'react-to-print';
import Header from '../Header';
import UserInputs from '../UserInputs';

export default function Main() {
  const [year, setYear] = useState(0);
  const [week, setWeek] = useState(0);
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Lucas Vieira',
  })
  
  return (
    <main className={styles.main}>
      <Header />

      <h1 className={styles.title}>Memento Mori</h1>

      <UserInputs />

      <section className={styles.section} ref={componentRef}>
        <Weeks
          setYear={setYear}
          setWeek={setWeek}
        />
      </section>
    </main>
  )
}