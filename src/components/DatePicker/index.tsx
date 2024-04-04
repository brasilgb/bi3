'use client'
import React, { useState } from 'react'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';

type Props = {}

const index = (props: Props) => {
    const [selectedDay, setSelectedDay] = useState<any>(null);
    return (
        <div className="z-40">
            <DatePicker
                value={selectedDay}
                onChange={setSelectedDay}
                inputPlaceholder="Select a day"
                shouldHighlightWeekends
            />
        </div>
    )
}

export default index