import { format, formatDistanceToNow, parseISO, differenceInHours } from 'date-fns';

const formatTime = (dateString) => {
  const date = parseISO(dateString);
  const now = new Date();
  
  const diffInHours = differenceInHours(now, date);

  if (diffInHours < 24) {
    return formatDistanceToNow(date, { addSuffix: true });
  } else {
    return format(date, 'dd-MM-yyyy'); // or any other format you prefer, e.g., 'MMM dd, yyyy'
  }
};

export default formatTime;
