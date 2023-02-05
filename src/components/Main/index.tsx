import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '@/hooks/useAppContext';

import Weeks from '@/components/Weeks';
import Modal from 'react-modal';
import iconButton from '../../../public/help-button-icon.svg'
import iconCloseButton from '../../../public/close-button-icon.svg'
import styles from './styles.module.css'
import { useReactToPrint } from 'react-to-print';
import {useTheme} from 'next-themes'
import Image from 'next/image';
import Header from '../Header';
import UserInputs from '../UserInputs';

Modal.setAppElement("main");

export default function Main() {
  const [year, setYear] = useState(0);
  const [week, setWeek] = useState(0);
  const [modalIsOpen , setIsOpen] = useState(false)
  const {theme, setTheme}= useTheme()
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Lucas Vieira',
  })
  
  const closeModal =()=>{
    setIsOpen(false)
  }

  const OpenModal =()=>{
    setIsOpen(true)
  }
  
  return (
    <main className={styles.main}>
      <Header />

      <h1 className={styles.title}>Memento Mori</h1>

      <UserInputs />
    
      <button className={styles.button} onClick={()=>OpenModal()}>
        <Image src={iconButton} height={24} width={24} alt='help button'/>
      </button>

      <button onClick={()=>setTheme('dark')}>
        teste
        {/* <Image src={iconButton} height={24} width={24} alt='help button'/> */}
      </button>
      <Modal  
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName={styles.modal_overlay}
        contentLabel="Example Modal"
        className={styles.modal}
        >
        <div className={styles.modal_content}>

          <div className={styles.img_container}>
            <div className={styles.block}></div>
          <p>Um quadrado é equivalente a uma semana do mês</p>
          </div>

          <div className={styles.img_container}>
            <div className={styles.grid_container}>
              <div className={styles.block}></div>
              <div className={styles.block}></div>
              <div className={styles.block}></div>
              <div className={styles.block}></div>
              <div className={styles.block}></div>
              <div className={styles.shadow}></div>
            </div>
            <p>Uma linha tem 52 semanas e representa um ano de vida.</p>
            <p>Na semana de seu aniversário, a linha que representa um ano estará totalmente preenchida</p>
          </div>

          <div className={styles.img_container}>
            <p>Ex: Se você nasceu em <strong>Novembro</strong></p>
            <div className={styles.grid_container}>
              <div className={styles.block}></div>
              <div className={styles.block}></div>
              <div className={styles.block}></div>
              <div className={styles.block}></div>
              <div className={styles.block}></div>
              <div className={styles.shadow}></div>
            </div>

            <div className={styles.img_container}>
              <h2>Como Usar ?</h2>
              <p>O usuário irá preecher a quantidade de linhas equivalente a sua idade. E preencher os meses começando com o mês de aniversário até o mês atual.</p>
            </div>
          </div>
            <button className={styles.close_button} onClick={()=>closeModal()}>
              <Image src={iconCloseButton} width={24} height={24} alt='close modal button'/>
            </button>
        </div>
      </Modal>
      <h1 className={styles.title}>MEMENTO MORI</h1>
      <p className={styles.quotes}>
        <span className={styles.double_quotes}>&quot;</span>
          Mantenha-se simples, bom, puro, sério, livre de afetação, amigo da justiça, temente aos deuses, gentil, apaixonado, vigoroso em todas as suas atitudes. Lute para viver como a filosofia gostaria que vivesse. Reverencie os deuses e ajude os homens. A vida é curta.
        <span className={styles.double_quotes}>&quot;</span>
      </p>
 
      <section className={styles.section} ref={componentRef}>
        <Weeks
          setYear={setYear}
          setWeek={setWeek}
        />
      </section>
    </main>
  )
}