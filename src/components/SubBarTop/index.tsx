'use client';
import Link from 'next/link';
import React from 'react';
import { IoMdClock } from 'react-icons/io';
import { IoArrowBack, IoArrowForward, IoCalendar } from 'react-icons/io5';
import { useAuthContext } from '@/contexts/AuthContext';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import DatePickerBI3 from "../DatePicker";

interface SubBarTopProps {
  colors: string;
  back: string;
  forwards: string;
  depto?: string;
  dtatu?: string;
}

const SubBarTop = (props: SubBarTopProps) => {
  const pathname = usePathname();
  const { yearExists, setYearSelected, yearSelected } = useAuthContext();
  const anoAtual: any = yearExists
    ? moment().format('YYYY')
    : moment().add(-1, 'y').format('YYYY');

  return (
    <div className="bg-gray-50 py-1 md:px-0 px-2">
      <div className="container m-auto flex items-center justify-between">
        <div>
          <Link
            className={`${props.back === '' ? 'text-gray-50' : 'text-gray-500'}`}
            href={`${props.back}?depto=${props.depto}`}
          >
            <IoArrowBack size={20} />
          </Link>
        </div>
        <div>
          <div className={`${props.colors}`}>
            <div className="flex items-center justify-center border rounded-md pl-1 text-gray-400">
              <IoCalendar size={18} />
              {pathname === '/solar/sdre' || pathname == '/naturovos/ndre' ? (
                <ul className="flex items-center justify-center gap-2 md:text-sm text-[12px] md:py-0.5 py-1 px-1">
                  <li>
                    <button
                      onClick={() => setYearSelected(anoAtual - 1)}
                      className={`${yearSelected === anoAtual - 1 ? 'bg-solar-green-prymary text-gray-50' : 'bg-gray-300 text-gray-500'} rounded px-1 font-bold shadow-sm`}
                    >
                      {anoAtual - 1}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setYearSelected(anoAtual)}
                      className={`${yearSelected === anoAtual ? 'bg-solar-green-prymary text-gray-50' : 'bg-gray-300 text-gray-500'} rounded px-1 font-bold shadow-sm`}
                    >
                      {anoAtual}
                    </button>
                  </li>
                </ul>
              ) : (
                <DatePickerBI3 />
              )}
            </div>
          </div>
        </div>
        <div>
          <div className={`${props.colors} font-medium`}>
            <div className="flex items-center justify-center border rounded-md px-1 py-1 md:text-xs  text-[10px] gap-3 text-gray-400">
              <IoMdClock size={18} />
              <span>{props.dtatu}</span>
            </div>
          </div>
        </div>
        <div>
          <Link
            className={`${props.forwards === '' ? 'text-gray-50' : 'text-gray-500'}`}
            href={`${props.forwards}?depto=${props.depto}`}
          >
            <IoArrowForward size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubBarTop;
