import Modal from 'react-modal';

import Image from "next/image"

import styles from './styles.module.css';
import { useState } from 'react';

export default function Header() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Modal 
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            maxWidth: '620px',
            left: '50%',
            transform: 'translateX(-50%)'
          }
        }}

      >
        <h1 className={styles.modal_title}>Memento mori</h1>
        <h2>Eu sou o modal de configurações</h2>
      </Modal>
      <header className={styles.header}>
        <div className={styles.left_icons}>
          {/* <Image onClick={openModal} src='/icons/settings.svg' width={24} height={24} alt="Ícone de engrenagem" /> */}
        </div>
      </header>
    </>
  )
}