import { useContext } from 'react';
import {AppContext} from '@/context/AppContext';

export const useAppContext = () => {
  const context = useContext(AppContext);

  return context;
}