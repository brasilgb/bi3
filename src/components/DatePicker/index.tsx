'use client';
import React, { useEffect, useState } from 'react';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, {
  DayValue,
  DayRange,
} from '@hassanmojab/react-modern-calendar-datepicker';
import moment from 'moment';
import { CustomLocale } from './LocaleCalendar';
import { useAuthContext } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';

const DatePickerBI3 = () => {
  const {
    dataFiltro,
    setDataFiltro,
    setDataInicial,
    dataInicial,
    setDataFinal,
    dataFinal,
  } = useAuthContext();

  const [selectedDay, setSelectedDay] = useState<DayValue>(null);
  const [selectedRange, setSelectedRange] = useState<DayRange>({
    from: {
      year: parseInt(moment(dataInicial).format('YYYY')),
      month: parseInt(moment(dataInicial).format('MM')),
      day: parseInt(moment(dataInicial).format('DD')),
    },
    to: {
      year: parseInt(moment(dataFinal).format('YYYY')),
      month: parseInt(moment(dataFinal).format('MM')),
      day: parseInt(moment(dataFinal).format('DD')),
    },
  });

  const formatInputValue = () => {
    if (!selectedDay) return '';
    return `${('0' + selectedDay.day).slice(-2) + '/' + ('0' + selectedDay.month).slice(-2) + '/' + selectedDay.year}`;
  };

  const formatInputRange = () => {
    if (!selectedRange) return '';
    return `${('0' + selectedRange.from?.day).slice(-2) + '/' + ('0' + selectedRange.from?.month).slice(-2) + '/' + selectedRange.from?.year + ' - ' + ('0' + selectedRange.to?.day).slice(-2) + '/' + ('0' + selectedRange.to?.month).slice(-2) + '/' + selectedRange.to?.year}`;
  };

  useEffect(() => {
    if (selectedRange) {
      setDataInicial(
        moment(
          selectedRange.from?.year +
          '-' +
          selectedRange.from?.month +
          '-' +
          selectedRange.from?.day,
          'YYYY-MM-DD'
        ).toDate()
      );
      setDataFinal(
        moment(
          selectedRange.to?.year +
          '-' +
          selectedRange.to?.month +
          '-' +
          selectedRange.to?.day,
          'YYYY-MM-DD'
        ).toDate()
      );
    }
  }, [selectedRange, setDataInicial, setDataFinal]);

  useEffect(() => {
    if (selectedDay) {
      setDataFiltro(
        moment(
          selectedDay?.year + '-' + selectedDay?.month + '-' + selectedDay?.day,
          'YYYY-MM-DD'
        ).toDate()
      );
    }
  }, [selectedDay, setDataFiltro]);

  const pathname = usePathname();
  return (
    <>
      {pathname === '/solar/sfluxo' || pathname === '/solar/semprestimos' || pathname === '/naturovos/nfluxo' || pathname === '/naturovos/nproducao' ? (
        <DatePicker
          value={selectedRange}
          onChange={setSelectedRange}
          inputPlaceholder={`${moment(dataFiltro).format('DD/MM/YYYY')}`} // placeholder
          formatInputText={formatInputRange} // format value
          inputClassName="!border-0 outline-none !bg-transparent !text-gray-400 !font-medium md:!text-xs !text-[10px] !px-1" // custom class
          calendarClassName="responsive-calendar"
          shouldHighlightWeekends
          locale={CustomLocale}
        />
      ) : (
        <DatePicker
          value={selectedDay}
          onChange={setSelectedDay}
          inputPlaceholder={`${moment(dataFiltro).format('DD/MM/YYYY')}`} // placeholder
          formatInputText={formatInputValue} // format value
          inputClassName="!border-0 outline-none !bg-transparent !text-gray-400 !font-medium md:!text-xs !text-[10px] !px-0" // custom class
          calendarClassName="responsive-calendar"
          shouldHighlightWeekends
          locale={CustomLocale}
        />
      )}
    </>
  );
};

export default DatePickerBI3;
