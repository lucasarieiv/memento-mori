import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Modal from "react-modal";
import { Settings, Moon, Sun } from "react-feather";

import styles from "./styles.module.css";

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [modalIsOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    if (theme == 'dark') {
      setToggle(false)
    }
  }, [])

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleToggleTheme = () => {
    if (theme == 'light') {
      setTheme('dark')
      setToggle(false)
    } else {
      setTheme('light')
      setToggle(true)
    }
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
            {toggle ? <Moon className={styles.icon} size={24} onClick={handleToggleTheme} /> : <Sun className={styles.icon} size={24} onClick={handleToggleTheme}/>}
            {/* <Settings size={24} className={styles.icon} onClick={openModal} /> */}
          </div>
        </div>
      </header>
    </>
  );
}
