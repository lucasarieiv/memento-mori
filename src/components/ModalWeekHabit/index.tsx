import { useAppContext } from '@/hooks/useAppContext';
import Modal from 'react-modal';

import styles from './styles.module.css';

interface ModalWeekHabitProps {
  weekIndex: number,
  weekModalIsOpen: boolean;
  handleWeekModalIsOpen: (isOpen: boolean) => void;
}

export function ModalWeekHabit({weekIndex, weekModalIsOpen, handleWeekModalIsOpen}: ModalWeekHabitProps) {
  const { index, updateIndex} = useAppContext();
  
  function handleClick() {    
    updateIndex(weekIndex)
    localStorage.setItem('@mementomori:index', String(weekIndex));
  }

  const closeModal = () => {
    handleWeekModalIsOpen(false)
  }

  return (
    <Modal
      className={styles.container}
      isOpen={weekModalIsOpen}
      onRequestClose={closeModal}
    >
      <h3>Semana {weekIndex}</h3>

      <h3>Dia 01</h3>
        <p>Habito 01</p>
        <p>Habito 02</p>
        <p>Habito 03</p>
        <p>Habito 04</p>
        <p>Habito 05</p>
      <h3>Dia 02</h3>
        <p>Habito 01</p>
        <p>Habito 02</p>
        <p>Habito 03</p>
        <p>Habito 04</p>
        <p>Habito 05</p>
      <h3>Dia 03</h3>
        <p>Habito 01</p>
        <p>Habito 02</p>
        <p>Habito 03</p>
        <p>Habito 04</p>
        <p>Habito 05</p>
      <h3>Dia 04</h3>
        <p>Habito 01</p>
        <p>Habito 02</p>
        <p>Habito 03</p>
        <p>Habito 04</p>
        <p>Habito 05</p>
      <h3>Dia 05</h3>
        <p>Habito 01</p>
        <p>Habito 02</p>
        <p>Habito 03</p>
        <p>Habito 04</p>
        <p>Habito 05</p>

      <button onClick={handleClick}>Semana concluída</button>
    </Modal>
  )
}