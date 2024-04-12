import { removeAcentos } from '@/utils';
import React from 'react';

interface ButtonAnaliseProps {
  title: string;
  onclick: any;
  active: string;
}

const ButtonAnalise = (props: ButtonAnaliseProps) => {
  return (
    <div>
      <button
        className={`flex items-center justify-center md:w-36 w-24  py-1 rounded-full md:text-sm text-[10px]  font-medium uppercase border-2 border-gray-200 hover:bg-solar-blue-dark hover:text-solar-gray-light duration-300 ${props.active === removeAcentos(props.title) ? 'text-gray-100 border-white bg-solar-blue-dark' : 'border-gray-200 text-gray-500'}`}
        onClick={props.onclick}
      >
        <span>{props.title}</span>
      </button>
    </div>
  );
};

export default ButtonAnalise;
