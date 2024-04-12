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

type Props = {};

const index = (props: Props) => {
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
      year: parseInt(moment().format('YYYY')),
      month: parseInt(moment().format('MM')),
      day: parseInt(moment().format('DD')),
    },
    to: {
      year: parseInt(moment().format('YYYY')),
      month: parseInt(moment().format('MM')),
      day: parseInt(moment().format('DD')),
    },
  });

  const formatInputValue = () => {
    if (!selectedDay) return '';
    return moment(selectedDay).format('DD/MM/YYYY');
    // return `${selectedDay.day + '/' + selectedDay.month + '/' + selectedDay.year}`;
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
    <div className="">
      {pathname === '/solar/sfluxo' || pathname === '/solar/semprestimos' ? (
        <DatePicker
          value={selectedRange}
          onChange={setSelectedRange}
          inputPlaceholder={`${moment(dataFiltro).format('DD/MM/YYYY')}`} // placeholder
          formatInputText={formatInputRange} // format value
          inputClassName="!border-0 outline-none !bg-transparent !text-gray-400 !font-medium !text-xs !px-1" // custom class
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
          inputClassName="!border-0 outline-none !bg-transparent !text-gray-400 !font-medium !text-xs !px-0" // custom class
          calendarClassName="responsive-calendar"
          shouldHighlightWeekends
          locale={CustomLocale}
        />
      )}
    </div>
  );
};

export default index;
