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
                    <div className={`${props.colors} font-medium px-3 py-1 text-sm drop-shadow flex items-center justify-center gap-1`}>
                        <IoCalendar size={18} /> <div className=""><DatePicker /></div>
                    </div>
                </div>
                <div>
                    <div className={`${props.colors} font-medium px-3 py-1 text-sm drop-shadow flex items-center justify-center gap-1`}>
                        <IoMdClock size={18} /> <span>03/04/2024 11:07</span>
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