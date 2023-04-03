import { createContext, useState, useCallback, useEffect } from 'react';
import { Week } from '@/interfaces/Week';
import { Habit } from '@/interfaces/Habit';

interface IWeeks {
  weekNumber: number;
  updateWeekNumber(index: number): void;
  habits: Habit[],
  setHabits: (newValue: Habit[]) => void,
  setIsAppCreateHabitsMode: (newValue: boolean) => void,
  isAppCreateHabitsMode: boolean,
  weekModalIsOpen: boolean,
  setWeekModalIsOpen: (newValue: boolean) => void,
  weeksWithHabits: Map<number, any>,
  setWeekWithHabits: (newValue: any) => void,
}

const AppContext = createContext<IWeeks>({
  weekNumber: 0,
  updateWeekNumber: () => {},
  habits: [],
  setHabits: () => {},
  setIsAppCreateHabitsMode: () => {},
  isAppCreateHabitsMode: false,
  weekModalIsOpen: false,
  setWeekModalIsOpen: () => {},
  weeksWithHabits: new Map(),
  setWeekWithHabits: () => {},
});


const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [weekModalIsOpen, setWeekModalIsOpen] = useState(false);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isAppCreateHabitsMode, setIsAppCreateHabitsMode] = useState(false);
  const [weekNumber, setWeekNumber] = useState(0);
  const [weeksWithHabits, setWeekWithHabits] = useState(new Map())

  useEffect(() => {
    const localStorageWeekIndex = localStorage.getItem('@mementomori:index');

    if (localStorageWeekIndex) {
      setWeekNumber(Number(localStorageWeekIndex));
    }
  }, [])
  
  const updateWeekNumber = useCallback((idx: number) => {
    localStorage.setItem('@mementomori:index', String(idx));
    setWeekNumber(idx)
  }, [])
  
  return (
    <AppContext.Provider value={{
      weekNumber,
      updateWeekNumber,
      setHabits,
      habits,
      setIsAppCreateHabitsMode,
      isAppCreateHabitsMode,
      weekModalIsOpen,
      setWeekModalIsOpen,
      weeksWithHabits,
      setWeekWithHabits
    }}>
      {children}
    </AppContext.Provider>
  )
};

export {AppContext, AppProvider};