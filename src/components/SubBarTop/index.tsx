'use client'
import Link from "next/link";
import React from 'react'
import { IoMdClock } from "react-icons/io";
import { IoArrowBack, IoArrowForward, IoCalendar } from "react-icons/io5";
import DatePicker from "../DatePicker";

interface SubBarTopProps {
    colors: string;
    back: string;
    forwards: string;
}

const SubBarTop = (props: SubBarTopProps) => {
    return (
        <div className="bg-gray-50 py-1 md:px-0 px-2">
            <div className="container m-auto flex items-center justify-between">
                <div>
                    <Link
                        href={props.back}
                    >
                        <IoArrowBack size={20} />
                    </Link>
                </div>
                <div>
                    <div className={`${props.colors}`}>
                         <div className="flex items-center justify-center border rounded-md pl-1 text-gray-400"><IoCalendar size={18} /><DatePicker /></div>
                    </div>
                </div>
                <div>
                    <div className={`${props.colors} font-medium`}>
                    <div className="flex items-center justify-center border rounded-md px-1 py-1 text-xs gap-3 text-gray-400"><IoMdClock size={18} /> <span>03/04/2024 11:07</span></div>
                    </div>
                </div>
                <div>
                    <Link
                        href={props.forwards}
                    >
                        <IoArrowForward size={20} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SubBarTop