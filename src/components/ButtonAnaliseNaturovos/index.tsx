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
        className={`flex items-center justify-center md:w-40 w-32 md:my-0 my-2 py-1 rounded-full md:text-sm text-[10px]  font-medium uppercase border-2 border-gray-200 transition-all duration-200 ease-out hover:bg-solar-orange-prymary hover:text-gray-800 hover:shadow-sm active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-solar-orange-prymary focus-visible:ring-offset-1 ${props.active === removeAcentos(props.title) ? 'text-gray-800 border-white bg-solar-orange-prymary' : 'border-gray-200 text-gray-500'}`}
        onClick={props.onclick}
      >
        <span>{props.title}</span>
      </button>
    </div>
  );
};

export default ButtonAnaliseNaturovos;