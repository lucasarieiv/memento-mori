import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Select from 'react-select';

import { useAppContext } from '@/hooks/useAppContext';

import styles from './styles.module.css';

export default function UserInputs() {
  const [isLoadingYear, setIsLoadingYear] = useState(true);
  const [day, setDay] = useState(0)
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const context = useAppContext();
  
  
  const daysOptions = [
    {value: 1, label: '01'},
    {value: 2, label: '02'},
    {value: 3, label: '03'},
    {value: 4, label: '04'},
    {value: 5, label: '05'},
    {value: 6, label: '06'},
    {value: 7, label: '07'},
    {value: 8, label: '08'},
    {value: 9, label: '09'},
    {value: 10, label: '10'},
    {value: 11, label: '11'},
    {value: 12, label: '12'},
    {value: 13, label: '13'},
    {value: 14, label: '14'},
    {value: 15, label: '15'},
    {value: 16, label: '16'},
    {value: 17, label: '17'},
    {value: 18, label: '18'},
    {value: 19, label: '19'},
    {value: 20, label: '20'},
    {value: 21, label: '21'},
    {value: 22, label: '22'},
    {value: 23, label: '23'},
    {value: 24, label: '24'},
    {value: 25, label: '25'},
    {value: 26, label: '26'},
    {value: 27, label: '27'},
    {value: 28, label: '28'},
    {value: 29, label: '29'},
    {value: 30, label: '30'},
    {value: 31, label: '31'},
  ]

  const monthOptions = [
    {value: 1, label: 'Janeiro'},
    {value: 2, label: 'Fevereiro'},
    {value: 3, label: 'Março'},
    {value: 4, label: 'Abril'},
    {value: 5, label: 'Maio'},
    {value: 6, label: 'Junho'},
    {value: 7, label: 'Julho'},
    {value: 8, label: 'Agosto'},
    {value: 9, label: 'Setembro'},
    {value: 10, label: 'Outubro'},
    {value: 11, label: 'Novembro'},
    {value: 12, label: 'Dezembro'},
  ]
  
  const [yearsOptions, setYearsOptions] = useState<{value: number, label: number}[]>([]);

  function generateYears() {
    const currentYear = new Date().getFullYear();
    const newYears: {value: number, label: number}[] = []
    
    for (let index = 1920; index <= currentYear; index++) {
      newYears.push({value: index, label: index});
    }

    setYearsOptions(() => {
      return [...newYears].reverse()
    })
    
    setIsLoadingYear(false)
  }

  function fillWeeks(userBirthdate: string) {
    const currentMomentDate = moment();
    const weeksUntilEndOfYear = 52 - moment(userBirthdate).week();
    const currentYear = currentMomentDate.year();
    
    const userAge = (currentYear - year) - 1;
    const userdWeeksLiveUntilNow = weeksUntilEndOfYear + moment().week();
    
    const fillWeekNumbers = userAge * 52 + userdWeeksLiveUntilNow;
    
    console.log(fillWeekNumbers);
    localStorage.setItem('@mementomori:index', String(fillWeekNumbers));
    context.updateIndex(fillWeekNumbers);
  }

  function handleClick() {
    if (day && month && year) {
      fillWeeks(`${year}-${month}-${day}`)
    }
  }

  useEffect(() => {
    setIsLoadingYear(true)
    generateYears()
  }, [])

  return (
    <div className={styles.container}>

      <p className={styles.text}>Selecione sua data de nascimento 👶</p>

      <div className={styles.inputs_container}>
        <Select 
          instanceId='select-day'
          onChange={(day) => day ? setDay(day?.value) : setDay(0)}
          name='day'
          defaultValue={{value: day, label: '01'}}
          options={ daysOptions }
          isSearchable={true}
        />

        <Select
          instanceId='select-month'
          onChange={(month) => month ? setMonth(month?.value) : setMonth(0)}
          name='month'
          defaultValue={{value: month, label: 'Janeiro'}}
          options={ monthOptions }
          isSearchable={true}
        />

        <Select
          instanceId='select-year'
          onChange={(year) => year ? setYear(year?.value) : setYear(0)}
          defaultValue={{value: year, label: 2023}}
          name='year'
          options={ yearsOptions }
          isLoading={ isLoadingYear }
        />
      </div>

      <button onClick={handleClick} className={styles.btn}>Gerar</button>
    </div>
  );
}