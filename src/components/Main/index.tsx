import { useState } from 'react';

import Weeks from '@/components/Weeks';
import Modal from 'react-modal';

import styles from './styles.module.css'
import { useReactToPrint } from 'react-to-print';
import {useTheme} from 'next-themes'
import Image from 'next/image';
import Header from '../Header';
import UserInputs from '../UserInputs';
import { Moon, HelpCircle, Sun, X as CloseIcon } from 'react-feather';
import SwitchMode from '../SwitchMode';

Modal.setAppElement("main");

export default function Main() {
  const [year, setYear] = useState(0);
  const [week, setWeek] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [modalIsOpen , setIsOpen] = useState(false)
  const {theme, setTheme}= useTheme()
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Lucas Vieira',
  })

  const handleButton = ()=>{
    setToggle(!toggle)
    toggle ? setTheme('dark') : setTheme('light')
  }
  
  const closeModal =()=>{
    setIsOpen(false)
  }

  const openModal =()=>{
    setIsOpen(true)
  }
  
  return (
    <main className={styles.main}>
     
      <button className={styles.dark_mode_button} onClick={()=>handleButton()}>
        {          
          toggle ? <Moon size={24}/> : <Sun size={24}/>
        }
        
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
              <CloseIcon size={24} color={'black'}/>
            </button>
        </div>
      </Modal>

      <UserInputs />

      <section className={styles.section}>
        <SwitchMode />
        <Weeks />
      </section>

      <button className={styles.instruction_button} onClick={()=>openModal()}>
        <HelpCircle size={24}/>
      </button>
    </main>
  )
}