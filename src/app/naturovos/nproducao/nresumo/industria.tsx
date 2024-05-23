'use client'
import { formatNumber } from "@/utils";
import React, { useState } from 'react'
import { IoChevronDown } from "react-icons/io5";

const Industria = ({ data }: any) => {
  const [industriaOpen, setIndustriaOpen] = useState<boolean>(false);
  return (
    <div className="bg-gray-50 shadow-md rounded-md">
      <div
        onClick={() => setIndustriaOpen(!industriaOpen)}
        className="w-full px-2 bg-solar-orange-prymary rounded-t-md shadow-sm overflow-auto animate__animated animate__fadeIn flex items-center justify-between cursor-pointer">
        <h1 className="text-base font-medium text-center py-1">
          Indústria (48)
        </h1>
        <span
          className={`md:hidden ${industriaOpen ? '-rotate-180' : 'rotate-0'} transition duration-300`}
        >
          <IoChevronDown size={25} />
        </span>
      </div>
      <div
        className={`md:grid md:grid-cols-2 gap-4 p-2 ${industriaOpen ? 'flex flex-col' : 'hidden'}`}
      >

        <div className="flex flex-col items-center justify-start bg-gray-50 border border-gray-200 rounded-md p-1">
          <h1 className="text-gray-500 text-base md:text-lg font-semibold border-b w-full text-center">Estoque cx</h1>
          <div className="flex flex-col items-center justify-between h-full py-2">
            <h1 className="text-blue-500 text-base md:text-2xl font-semibold">{formatNumber(data?.estoque)}/{formatNumber(4860)}</h1>
            <h1 className="text-blue-500 text-base md:text-2xl font-semibold">{formatNumber((data?.estoque / 4860) * 100)}% <span className="text-base text-gray-500 font-medium">Ocupação</span></h1>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start bg-gray-50 border border-gray-200 rounded-md p-1">
          <h1 className="text-gray-500 text-base md:text-lg font-semibold border-b w-full text-center">Velocidade (m)cx/h</h1>
          <div className="flex items-center justify-start py-2 w-full">
            <div className="flex items-center justify-center bg-green-500 rounded-full w-6 h-6 text-sm text-white font-bold mr-2">HJ</div>
            <div className="text-blue-500 text-base md:text-2xl font-semibold">{formatNumber(data?.consumohr)}</div>
          </div>
          <div className="flex items-center justify-start py-2 w-full">
            <div className="flex items-center justify-center bg-red-500 rounded-full w-6 h-6 text-sm text-white font-bold mr-2">ON</div>
            <div className="text-blue-500 text-base md:text-2xl font-semibold">{formatNumber(data?.consumohrOntem)}</div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start bg-gray-50 border border-gray-200 rounded-md p-1">
          <h1 className="text-gray-500 text-base md:text-lg font-semibold border-b w-full text-center">Paradas do dia p/turno</h1>
          <div className="flex items-center justify-start py-2 w-full">
            <span className="flex items-center justify-center bg-green-500 rounded-full w-6 h-6 text-sm text-white font-bold mr-2">HJ</span>
            <div className="flex-1 text-blue-500 text-base md:text-2xl font-semibold"><span className="text-base text-gray-500 font-medium">A: </span> {data?.paradasA}</div>
            <div className="flex-1 text-blue-500 text-base md:text-2xl font-semibold"><span className="text-base text-gray-500 font-medium">B: </span> {data?.paradasB}</div>
            <div className="flex-1 text-blue-500 text-base md:text-2xl font-semibold"><span className="text-base text-gray-500 font-medium">T: </span> {data?.paradas}</div>
          </div>
          <div className="flex items-center justify-start py-2 w-full">
            <div className="flex items-center justify-center bg-red-500 rounded-full w-6 h-6 text-sm text-white font-bold mr-2">ON</div>
            <div className="flex-1 text-blue-500 text-base md:text-2xl font-semibold"><span className="text-base text-gray-500 font-medium">A: </span> {data?.paradasAOntem}</div>
            <div className="flex-1 text-blue-500 text-base md:text-2xl font-semibold"><span className="text-base text-gray-500 font-medium">B: </span> {data?.paradasBOntem}</div>
            <div className="flex-1 text-blue-500 text-base md:text-2xl font-semibold"><span className="text-base text-gray-500 font-medium">T: </span> {data?.paradasOntem}</div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start bg-gray-50 border border-gray-200 rounded-md p-1">
          <h1 className="text-gray-500 text-base md:text-lg font-semibold border-b w-full text-center">Quebra dia cx/h</h1>
          <div className="flex items-center justify-between w-full py-2">
            <span className="flex items-center justify-center bg-green-500 rounded-full w-6 h-6 text-sm text-white font-bold mr-2">HJ</span>
            <div className="flex-1 text-blue-500 text-base md:text-xl font-semibold">{formatNumber(data?.consumo)}/{formatNumber((data?.metaSemanal / 5))}</div>
            <span className="flex-none font-normal text-center px-2">-</span>
            <div className="flex-none text-blue-500 text-base md:text-xl font-semibold">{((data?.consumo / (data?.metaSemanal / 5)) * 100).toFixed(2)}%</div>
          </div>
          <div className="flex items-center justify-between w-full py-2">
            <span className="flex items-center justify-center bg-red-500 rounded-full w-6 h-6 text-sm text-white font-bold mr-2">ON</span>
            <div className="flex-1 text-blue-500 text-base md:text-xl font-semibold">{formatNumber(data?.consumoOntem)}/{formatNumber((data?.metaSemanal / 5))}</div>
            <span className="flex-none font-normal text-center px-2">-</span>
            <div className="flex-none text-blue-500 text-base md:text-xl font-semibold">{((data?.consumoOntem / (data?.metaSemanal / 5)) * 100).toFixed(2)}%</div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start bg-gray-50 border border-gray-200 rounded-md p-1">
          <h1 className="text-gray-500 text-base md:text-lg font-semibold border-b w-full text-center">Quebra semana cx/h</h1>
          <div className="flex items-center justify-between w-full py-2">
            <div className="flex items-center justify-center bg-green-500 rounded-full w-6 h-6 text-sm text-white font-bold mr-2">AT</div>
            <div className="flex-1 text-blue-500 text-base md:text-xl font-semibold">{formatNumber(data?.consumoSemanal)}/{formatNumber(data?.metaSemanal)}</div>
            <div className="flex-none font-normal text-center px-2">-</div>
            <div className="flex-none text-blue-500 text-base md:text-xl font-semibold">{data?.percSemanal}%</div>
          </div>
          <div className="flex items-center justify-between w-full py-2">
            <div className="flex items-center justify-center bg-red-500 rounded-full w-6 h-6 text-sm text-white font-bold mr-2">AN</div>
            <div className="flex-1 text-blue-500 text-sm md:text-xl font-semibold">{formatNumber(data?.consumoSemanaAnt)}/{formatNumber(data?.metaSemanaAnt)}</div>
            <div className="flex-none font-normal text-center px-2">-</div>
            <div className="flex-none text-blue-500 text-sm md:text-xl font-semibold">{data?.percSemanaAnt}%</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Industria