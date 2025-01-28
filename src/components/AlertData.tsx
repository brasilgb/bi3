import React from 'react';
import { IoAlertCircle } from 'react-icons/io5';

const AlertData = () => {
    return (
        <div className='bg-yellow-100 rounded-md shadow-sm p-2 text-red-500 flex gap-1 animate__animated animate__fadeIn'>
            <IoAlertCircle size={22} /> Ainda não há dados para gerar análise neste período.
        </div>
    )
}

export default AlertData;