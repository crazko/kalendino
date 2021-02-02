import { format } from 'date-fns';

export const formatDate = (date: Date) => `${format(date, 'yyyy-MM-dd')}T${format(date, 'HH:mm:ss')}`;
