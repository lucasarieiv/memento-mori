import { useState } from 'react';
import Modal from 'react-modal';
import Weeks from '@/components/Weeks';
import SwitchMode from '@/components/SwitchMode';
import UserInputs from '@/components/UserInputs';

import { HelpCircle, X as CloseIcon } from 'react-feather';
import styles from './styles.module.css'

Modal.setAppElement("main");

export default function Main() {
  const [modalIsOpen , setIsOpen] = useState(false)
  
  const closeModal =()=>{
    setIsOpen(false)
  }

  const openModal =()=>{
    setIsOpen(true)
  }
  
  return (
    <main className={styles.main}>
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

      {/* <button className={styles.instruction_button} onClick={()=>openModal()}>
        <HelpCircle size={24}/>
      </button> */}
    </main>
  )
}