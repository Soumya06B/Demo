import { format } from 'date-fns';

export const formatDate = (date, pattern = 'PPP') => format(new Date(date), pattern);
