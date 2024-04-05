import { removeAcentos } from '@/utils';
import React from 'react'

interface ButtonAnaliseProps {
    title: string;
    onclick: any;
    active: string;
}

const ButtonAnalise = (props: ButtonAnaliseProps) => {
console.log(removeAcentos(props.title) );

    return (
        <button
            className={`flex items-center justify-center md:w-32 w-28 py-1 rounded-full md:text-sm text-[10px] text-center font-medium uppercase border-2 border-gray-200 hover:bg-solar-blue-dark hover:text-solar-gray-light duration-300 ${props.active === removeAcentos(props.title) ? 'text-gray-100 border-white bg-solar-blue-dark' : 'border-gray-200 text-gray-500'}`}
            onClick={props.onclick}
        >
            <span>{props.title}</span>
        </button>
    )
}

export default ButtonAnalise