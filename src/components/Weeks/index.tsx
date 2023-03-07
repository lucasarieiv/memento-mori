import { Week } from "@/interfaces/Week";

import { useEffect, useState } from "react";
import { useAppContext } from "@/hooks/useAppContext";

import { ModalWeekHabit } from "../ModalWeekHabit";
import { ModalCreateHabit } from "../ModalCreateHabit";
import styles from "./styles.module.css";

export default function Weeks() {
  const {
    listWeeks,
    weekNumber,
    isAppCreateHabitsMode,
    weekModalIsOpen,
    setWeekModalIsOpen,
  } = useAppContext();

  const [habitModalIsOpen, setHabitModalIsOpen] = useState(false);
  const [habitInterval, setHabitInterval] = useState([]);
  const [weekNumberSelected, setWeekNumberSelected] = useState(0);

  useEffect(() => {
    setHabitInterval([]);
  }, [isAppCreateHabitsMode]);

  function handleClick(week: Week) {
    setWeekNumberSelected(week.index);
    setWeekModalIsOpen(true);
  }

  function changeHabitInterval(weekNumber: number) {
    if (habitInterval.length == 1) {
      setHabitModalIsOpen(true);
    }

    if (habitInterval.length == 2) {
      setHabitInterval([]);
    }

    setHabitInterval((prev) => {
      return [...prev, weekNumber];
    });
  }

  return (
    <>
      <ModalCreateHabit
        habitModalIsOpen={habitModalIsOpen}
        handleHabitModalIsOpen={setHabitModalIsOpen}
        habitsInterval={habitInterval}
      />

      {weekModalIsOpen && (
        <ModalWeekHabit
          weekModalIsOpen={weekModalIsOpen}
          weekNumberSelected={weekNumberSelected}
        />
      )}

      <div className={styles.container}>
        {!isAppCreateHabitsMode &&
          listWeeks.map((week) => {
            return (
              <span
                onClick={() => handleClick(week)}
                key={week.index}
                className={`${styles.one_week} ${
                  week.index <= weekNumber ? styles.active : ""
                }`}
              ></span>
            );
          })}

        {isAppCreateHabitsMode && habitInterval.length < 2 &&
          listWeeks.map((week) => {
            return (
              <span
                key={week.index}
                onClick={() => {
                  changeHabitInterval(week.index);
                }}
                className={`${styles.one_week} ${
                  habitInterval[0] <= habitInterval[1]
                    ? styles["-register-mode"]
                    : ""
                }`}
              ></span>
            );
          })}

        {isAppCreateHabitsMode && habitInterval.length == 2 &&
          listWeeks.map((week) => {
            return (
              <span
                key={week.index}
                onClick={() => {
                  changeHabitInterval(week.index);
                }}
                className={`${styles.one_week} ${
                  week.index >= habitInterval[0] && week.index <= habitInterval[1]
                    ? styles["-register-mode"]
                    : ""
                }`}
              ></span>
            );
          })}

      </div>
    </>
  );
}
