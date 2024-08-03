import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatWrittenDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const formatter = new Intl.DateTimeFormat('en-US', options);

  const parts = formatter.formatToParts(date);

  const day = parts.find(part => part.type === 'day')?.value ?? '';
  const month = parts.find(part => part.type === 'month')?.value ?? '';
  const year = parts.find(part => part.type === 'year')?.value ?? '';
  const time = (parts.find(part => part.type === 'hour')?.value ?? '') + ':' +
    (parts.find(part => part.type === 'minute')?.value ?? '') +
    (parts.find(part => part.type === 'dayPeriod')?.value ?? '');

  return `${day}${ordinalSuffix(day)} ${month}, ${year} ${time}`;
}

function ordinalSuffix(day: string): string {
  if (day === '11' || day === '12' || day === '13') {
    return 'th';
  }

  const lastDigit = day[day.length - 1];
  if (lastDigit === '1') {
    return 'st';
  } else if (lastDigit === '2') {
    return 'nd';
  } else if (lastDigit === '3') {
    return 'rd';
  } else {
    return 'th';
  }
}

export const handleDateInputFocus = (e: any) => {
    e.target.showPicker()
}

export const handleTab = (val: string, router: any, pathname: string, searchParams: any) => {

  // console.log("^^^^^^^^^^^^^^^^^^^^^^^^")
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  current.set("tab", val);

  const search = current.toString();
  const query = search ? `?${search}` : "";

  router.push(`${pathname}${query}`);
};

export function generateUserApplicationNumber(userId: number) {
  return `INGRYD${String(userId).padStart(4, '0')}`
}


export function convertDurationInMinutesToTimeString(durationInMinutes: number): string {
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:00`;
}

export function formatTime(time: number | Date, isDuration: boolean = false): string {
  if (typeof time === 'number') {
    const hours = Math.floor(isDuration ? time / 3600 : time / 60);
    const minutes = isDuration ? Math.floor((time % 3600) / 60) : time % 60;
    const seconds = isDuration ? time % 60 : 0;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  } else if (time instanceof Date) {
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(time);
  } else {
    return '';
  }
}

export function isDateTodayOrFuture(dateString: string) {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);

      const date = new Date(dateString);
      date.setUTCHours(0, 0, 0, 0); 

      if (date.getTime() === today.getTime()) {
          return true;
      }
      const todayUTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
      const dateUTC = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

  
      return dateUTC >= todayUTC;
}    