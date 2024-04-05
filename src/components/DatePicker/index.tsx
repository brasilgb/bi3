'use client'
import React, { useState } from 'react'
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, {
    DayValue,
    DayRange,
} from '@hassanmojab/react-modern-calendar-datepicker';
import moment from 'moment';
import { CustomLocale } from './LocaleCalendar';

type Props = {}

const index = (props: Props) => {
    const dataFiltro = moment();
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
        return `${selectedDay.day + '/' + selectedDay.month + '/' + selectedDay.year}`;
    };

    const formatInputRange = () => {
        if (!selectedRange) return '';
        return `${selectedRange.from?.day + '/' + selectedRange.from?.month + '/' + selectedRange.from?.year + ' - ' + selectedRange.to?.day + '/' + selectedRange.to?.month + '/' + selectedRange.to?.year}`;
    };

    return (
        <div className="">
            {/* <DatePicker
                value={selectedRange}
                onChange={setSelectedRange}
                inputPlaceholder={`${moment(dataFiltro).format('DD/MM/YYYY')}`} // placeholder
                formatInputText={formatInputRange} // format value
                inputClassName="!border-0 outline-none" // custom class
                calendarClassName="responsive-calendar"
                shouldHighlightWeekends
                locale={myCustomLocale}
            /> */}
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
        </div>
    )
}

export default index