import Modal from "react-modal";

import { Settings } from "react-feather";

import styles from "./styles.module.css";
import { useState } from "react";

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
            maxWidth: "620px",
            left: "50%",
            transform: "translateX(-50%)",
          },
        }}
      >
        <h1 className={styles.modal_title}>Habit Track</h1>
        <h2>Eu sou o modal de con figurações</h2>
      </Modal>

      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.logo}>
            Habit <span>track</span>
          </h1>
          <div className={styles.left_icons}>
            <Settings size={24} className={styles.icon} onClick={openModal} />
          </div>
        </div>
      </header>
    </>
  );
}
