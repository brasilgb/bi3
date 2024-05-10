import { removeAcentos } from '@/utils';
import React from 'react';

interface ButtonAnaliseNaturovosProps {
  title: string;
  onclick: any;
  active: string;
}

const ButtonAnaliseNaturovos = (props: ButtonAnaliseNaturovosProps) => {
  return (
    <div>
      <button
        className={`flex items-center justify-center md:w-40 w-32  py-1 rounded-full md:text-sm text-[10px]  font-medium uppercase border-2 border-gray-200 hover:bg-solar-orange-prymary hover:text-gray-800 duration-300 ${props.active === removeAcentos(props.title) ? 'text-gray-800 border-white bg-solar-orange-prymary' : 'border-gray-200 text-gray-500'}`}
        onClick={props.onclick}
      >
        <span>{props.title}</span>
      </button>
    </div>
  );
};

export default ButtonAnaliseNaturovos;
