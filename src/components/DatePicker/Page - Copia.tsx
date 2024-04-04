import React, { Fragment, useContext, useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import {
  IoArrowBack,
  IoArrowBackOutline,
  IoArrowForward,
  IoCalendar,
  IoHomeOutline,
} from 'react-icons/io5';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import {
  AtuFluxo,
  AtuLojas,
  AtuNaturovos,
  AtuSupermercados,
} from '../Atualizacoes';

import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, {
  DayValue,
  DayRange,
} from '@hassanmojab/react-modern-calendar-datepicker';
import moment, { now } from 'moment';

const myCustomLocale = {
  // months list by order
  months: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Augosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],

  // week days by order
  weekDays: [
    {
      name: 'Domingo', // used for accessibility
      short: 'D', // displayed at the top of days' rows
      isWeekend: true, // is it a formal weekend or not?
    },
    {
      name: 'Segunda',
      short: 'S',
    },
    {
      name: 'Terça',
      short: 'T',
    },
    {
      name: 'Quarta',
      short: 'Q',
    },
    {
      name: 'Quinta',
      short: 'Q',
    },
    {
      name: 'Sexta',
      short: 'S',
    },
    {
      name: 'Sábado',
      short: 'S',
      isWeekend: true,
    },
  ],

  // just play around with this number between 0 and 6
  weekStartingIndex: 0,

  // return a { year: number, month: number, day: number } object
  getToday(gregorainTodayObject: any) {
    return gregorainTodayObject;
  },

  // return a native JavaScript date here
  toNativeDate(date: any) {
    return new Date(date.year, date.month - 1, date.day);
  },

  // return a number for date's month length
  getMonthLength(date: any) {
    return new Date(date.year, date.month, 0).getDate();
  },

  // return a transformed digit to your locale
  transformDigit(digit: any) {
    return digit;
  },

  // texts in the date picker
  nextMonth: 'Next Month',
  previousMonth: 'Previous Month',
  openMonthSelector: 'Open Month Selector',
  openYearSelector: 'Open Year Selector',
  closeMonthSelector: 'Close Month Selector',
  closeYearSelector: 'Close Year Selector',
  defaultPlaceholder: 'Select...',

  // for input range value
  from: 'from',
  to: 'to',

  // used for input value when multi dates are selected
  digitSeparator: ',',

  // if your provide -2 for example, year will be 2 digited
  yearLetterSkip: 0,

  // is your language rtl or ltr?
  isRtl: false,
};

const convertLocationName = (value: string) => {
  switch (value) {
    case 'emprestimos':
      return 'Empréstimos';
    case 'servicos':
      return 'Serviços';
    default:
      return value;
  }
};

type Props = {};

const Page = (props: Props) => {
  const {
    dataFiltro,
    setDataFiltro,
    setDataFluxo1,
    setDataFluxo2,
    nextPage,
    backPage,
  } = useContext(AuthContext);

  const [selectedDay, setSelectedDay] = useState<DayValue>(null);
  const [selectedRange, setSelectedRange] = useState<DayRange>({
    from: {
      year: parseInt(moment(now()).format('YYYY')),
      month: parseInt(moment(now()).format('MM')),
      day: parseInt(moment(now()).format('DD')),
    },
    to: {
      year: parseInt(moment(now()).format('YYYY')),
      month: parseInt(moment(now()).format('MM')),
      day: parseInt(moment(now()).format('DD')),
    },
  });

  const navigate = useNavigate();
  const location = useLocation().pathname.split('/')[1];
  const location2 = useLocation().pathname.split('/')[2];
  const locationName = useLocation().pathname;

  const styleLojas = {
    title: 'Lojas Solar',
    fontColor: 'text-gray-100',
    bgColor: 'bg-solar-blue-300',
    url: 'lojas',
  };

  const styleNaturovos = {
    title: 'Naturovos',
    fontColor: 'text-gray-700',
    bgColor: 'bg-solar-yellow-200',
    url: 'naturovos',
  };

  const styleSupermercado = {
    title: 'Supermercados',
    fontColor: 'text-gray-100',
    bgColor: 'bg-solar-yellow-300',
    url: 'supermercados',
  };

  const styleHeaderPage = () => {
    switch (location) {
      case 'lojas':
        return styleLojas;
      case 'naturovos':
        return styleNaturovos;
      case 'supermercados':
        return styleSupermercado;
    }
  };

  useEffect(() => {
    if (selectedRange) {
      setDataFluxo1(
        moment(
          selectedRange.from?.year +
            '-' +
            selectedRange.from?.month +
            '-' +
            selectedRange.from?.day,
          'YYYY-MM-DD'
        ).toDate()
      );
      setDataFluxo2(
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
  }, [selectedRange, setDataFluxo1, setDataFluxo2]);

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

  const formatInputValue = () => {
    if (!selectedDay) return '';
    return `${selectedDay.day + '/' + selectedDay.month + '/' + selectedDay.year}`;
  };

  const formatInputRange = () => {
    if (!selectedRange) return '';
    return `${selectedRange.from?.day + '/' + selectedRange.from?.month + '/' + selectedRange.from?.year + ' - ' + selectedRange.to?.day + '/' + selectedRange.to?.month + '/' + selectedRange.to?.year}`;
  };

  const setorName = nextPage?.split('/')[0];
  const pageName = nextPage?.split('/')[1];
  return (
    <Fragment>
      <nav
        className={`${styleHeaderPage()?.bgColor ? styleHeaderPage()?.bgColor : 'bg-solar-blue-200'} shadow border-b-2`}
      >
        <div className="px-4 py-2 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <IconContext.Provider
                value={{
                  color: '',
                  className: `${styleHeaderPage()?.fontColor ? styleHeaderPage()?.fontColor : 'text-gray-100'}`,
                }}
              >
                <div>
                  {locationName === '/lojas' ||
                  locationName === '/naturovos' ||
                  locationName === '/supermercados' ? (
                    <IoArrowBackOutline
                      onClick={() => navigate('/')}
                      className="cursor-pointer text-2xl md:text-4xl"
                    />
                  ) : (
                    <IoArrowBackOutline
                      onClick={() => navigate(`${styleHeaderPage()?.url}`)}
                      className="cursor-pointer text-2xl md:text-4xl"
                    />
                  )}
                </div>
                <span className=" text-sm text-gray-100"></span>
              </IconContext.Provider>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div>
                <h1
                  className={`text-2xl font-semibold ${styleHeaderPage()?.fontColor ? styleHeaderPage()?.fontColor : 'text-gray-100'} uppercase`}
                >
                  {styleHeaderPage()?.title}
                </h1>
              </div>
              <div>
                <h1
                  className={`text-lg font-semibold ${styleHeaderPage()?.fontColor ? styleHeaderPage()?.fontColor : 'text-gray-100'} uppercase`}
                >
                  {locationName === '/lojas' ||
                  locationName === '/naturovos' ||
                  locationName === '/supermercados'
                    ? 'Relatórios Administrativos'
                    : convertLocationName(location2)}
                </h1>
              </div>
            </div>

            <div className="flex items-center z-10">
              <IconContext.Provider
                value={{
                  color: '',
                  className: `${styleHeaderPage()?.fontColor ? styleHeaderPage()?.fontColor : 'text-gray-100'}`,
                }}
              >
                <div>
                  <IoHomeOutline
                    onClick={() => navigate('/')}
                    className="cursor-pointer text-2xl md:text-4xl"
                  />
                </div>
              </IconContext.Provider>
            </div>
          </div>

          {location === 'lojas' &&
            location2 !== 'fluxo' &&
            location2 !== 'inadimplencia' && <AtuLojas />}

          {location === 'naturovos' && location2 !== 'fluxo' && (
            <AtuNaturovos />
          )}
          {location === 'supermercados' && location2 !== 'fluxo' && (
            <AtuSupermercados />
          )}

          {location2 === 'fluxo' && <AtuFluxo />}
        </div>
      </nav>
      <div className="react-component py-5 flex items-center justify-between h-8 px-6 bg-white border-b">
        <div>
          <IconContext.Provider
            value={{
              className: `${backPage === 'disabled' ? 'text-gray-300' : 'text-gray-500 cursor-pointer'} text-2xl`,
            }}
          >
            {backPage === 'disabled' ? (
              <IoArrowBack />
            ) : (
              <IoArrowBack
                onClick={() => navigate(`${backPage}`)}
                title={setorName + ' ' + pageName}
              />
            )}
          </IconContext.Provider>
        </div>
        {location2 !== 'inadimplencia' && (
          <div>
            {location2 === 'fluxo' ||
            location2 === 'emprestimos' ||
            location2 === 'producao' ? (
              <div className="flex items-center rounded border px-2">
                <IconContext.Provider
                  value={{ className: 'text-gray-500 text-2xl' }}
                >
                  <IoCalendar />
                </IconContext.Provider>
                <DatePicker
                  value={selectedRange}
                  onChange={setSelectedRange}
                  inputPlaceholder={`${moment(dataFiltro).format('DD/MM/YYYY')}`} // placeholder
                  formatInputText={formatInputRange} // format value
                  inputClassName="!border-0 outline-none" // custom class
                  calendarClassName="responsive-calendar"
                  shouldHighlightWeekends
                  locale={myCustomLocale}
                />
              </div>
            ) : (
              <div className="flex items-center rounded border px-2">
                <IconContext.Provider
                  value={{ className: 'text-gray-500 text-2xl' }}
                >
                  <IoCalendar />
                </IconContext.Provider>
                <DatePicker
                  value={selectedDay}
                  onChange={setSelectedDay}
                  inputPlaceholder={`${moment(dataFiltro).format('DD/MM/YYYY')}`} // placeholder
                  formatInputText={formatInputValue} // format value
                  inputClassName="!border-0 outline-none" // custom class
                  calendarClassName="responsive-calendar"
                  shouldHighlightWeekends
                  locale={myCustomLocale}
                />
              </div>
            )}
          </div>
        )}
        <div>
          <IconContext.Provider
            value={{
              className: `${nextPage === 'disabled' ? 'text-gray-200' : 'text-gray-500 cursor-pointer'} text-2xl`,
            }}
          >
            {nextPage === 'disabled' ? (
              <IoArrowForward />
            ) : (
              <IoArrowForward
                onClick={() => navigate(`${nextPage}`)}
                title={setorName + ' ' + pageName}
              />
            )}
          </IconContext.Provider>
        </div>
      </div>
    </Fragment>
  );
};

export default Page;
