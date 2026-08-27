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
        className={`flex items-center justify-center md:w-36 w-32 py-1 md:my-0 my-2 rounded-full md:text-sm text-[10px] font-medium uppercase border-2 border-gray-200 transition-all duration-200 ease-out hover:bg-solar-blue-primary hover:text-solar-gray-light hover:shadow-sm active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-solar-blue-primary focus-visible:ring-offset-1 ${props.active === removeAcentos(props.title) ? 'text-gray-100 border-white bg-solar-blue-primary' : 'border-gray-200 text-gray-500'}`}
        onClick={props.onclick}
      >
        <span>{props.title}</span> 
      </button>
    </div>
  );
};

export default ButtonAnalise;
