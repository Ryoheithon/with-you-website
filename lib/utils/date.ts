import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';

export const formatDate = (dateInput: string | Date): string => {
  // If dateInput is null or undefined, return an empty string
  if (!dateInput) return '';
  
  // Convert to Date object if it's a string
  const date = typeof dateInput === 'string' ? parseISO(dateInput) : dateInput;
  
  return format(date, 'yyyy年MM月dd日', { locale: ja });
};

export const formatDateTime = (dateInput: string | Date): string => {
  // If dateInput is null or undefined, return an empty string
  if (!dateInput) return '';
  
  // Convert to Date object if it's a string
  const date = typeof dateInput === 'string' ? parseISO(dateInput) : dateInput;
  
  return format(date, 'yyyy年MM月dd日 HH:mm', { locale: ja });
};
