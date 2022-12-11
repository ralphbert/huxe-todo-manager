import { format } from 'date-fns';

export function formatDateTime(dateString: string) {
  return format(new Date(dateString), 'dd.MM.yyyy, HH:mm');
}
