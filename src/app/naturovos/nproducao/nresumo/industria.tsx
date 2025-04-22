'use client'
import birel from "@/services/birel";
import { formatNumber } from "@/utils";
import React, { useEffect, useState } from 'react'
import { IoChevronDown } from "react-icons/io5";

const NIndustria = ({ data }: any) => {
  const [industriaOpen, setIndustriaOpen] = useState<boolean>(false);
  const [producaoIndustria, setProducaoIndústria] = useState<any>([]);

  useEffect(() => {
    const getResumoProducao = async () => {
      await birel
        .get('(RESUMO_PRODUCAO)')
        .then(response => {
          const { bidata } = response.data.bi064;
          const filial48 = bidata.filter((fil: any) => fil.filial === 48);
          setProducaoIndústria(filial48[0]);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getResumoProducao();
  }, []);

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
          <div className="w-full flex items-center justify-around py-2">
            <h1 className="text-blue-500 text-base md:text-2xl font-semibold">{formatNumber(producaoIndustria?.estoque)}/{formatNumber(4860)}</h1>
            <h1 className="text-blue-500 text-base md:text-2xl font-semibold">{formatNumber((producaoIndustria?.estoque / 4860) * 100)}% <span className="text-base text-gray-500 font-medium">Ocupação</span></h1>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start bg-gray-50 border border-gray-200 rounded-md p-1">
          <h1 className="text-gray-500 text-base md:text-lg font-semibold border-b w-full text-center">Velocidade (m)cx/h</h1>
          <div className="flex items-center justify-around w-full">
          <div className="flex items-center justify-center py-2 w-full">
            <div className="flex items-center justify-center bg-green-500 rounded-full w-6 h-6 text-sm text-white font-bold mr-2">HJ</div>
            <div className="text-blue-500 text-base md:text-2xl font-semibold">{formatNumber(producaoIndustria?.consumohr)}</div>
          </div>
          <div className="flex items-center justify-center py-2 w-full">
            <div className="flex items-center justify-center bg-red-500 rounded-full w-6 h-6 text-sm text-white font-bold mr-2">ON</div>
            <div className="text-blue-500 text-base md:text-2xl font-semibold">{formatNumber(producaoIndustria?.consumohrOntem)}</div>
          </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start bg-gray-50 border border-gray-200 rounded-md p-1">
          <h1 className="text-gray-500 text-base md:text-lg font-semibold border-b w-full text-center">Paradas do dia p/turno</h1>
          <div className="px-4 w-full">
          <div className="flex items-center justify-start py-2 w-full">
            <span className="flex items-center justify-center bg-green-500 rounded-full w-6 h-6 text-sm text-white font-bold mr-2">HJ</span>
            <div className="flex-1 text-blue-500 text-base md:text-2xl font-semibold"><span className="text-base text-gray-500 font-medium">A: </span> {producaoIndustria?.paradasA}</div>
            <div className="flex-1 text-blue-500 text-base md:text-2xl font-semibold"><span className="text-base text-gray-500 font-medium">B: </span> {producaoIndustria?.paradasB}</div>
            <div className="flex-1 text-blue-500 text-base md:text-2xl font-semibold"><span className="text-base text-gray-500 font-medium">T: </span> {producaoIndustria?.paradas}</div>
          </div>
          <div className="flex items-center justify-start py-2 w-full">
            <div className="flex items-center justify-center bg-red-500 rounded-full w-6 h-6 text-sm text-white font-bold mr-2">ON</div>
            <div className="flex-1 text-blue-500 text-base md:text-2xl font-semibold"><span className="text-base text-gray-500 font-medium">A: </span> {producaoIndustria?.paradasAOntem}</div>
            <div className="flex-1 text-blue-500 text-base md:text-2xl font-semibold"><span className="text-base text-gray-500 font-medium">B: </span> {producaoIndustria?.paradasBOntem}</div>
            <div className="flex-1 text-blue-500 text-base md:text-2xl font-semibold"><span className="text-base text-gray-500 font-medium">T: </span> {producaoIndustria?.paradasOntem}</div>
          </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start bg-gray-50 border border-gray-200 rounded-md p-1">
          <h1 className="text-gray-500 text-base md:text-lg font-semibold border-b w-full text-center">Quebra dia cx/h</h1>
          <div className="px-4 w-full">
          <div className="flex items-center justify-between w-full py-2">
            <span className="flex items-center justify-center bg-green-500 rounded-full w-6 h-6 text-sm text-white font-bold mr-2">HJ</span>
            <div className="flex-1 text-blue-500 text-base md:text-xl font-semibold">{formatNumber(producaoIndustria?.consumo)}/{formatNumber((producaoIndustria?.metaSemanal / 5))}</div>
            <span className="flex-none font-normal text-center px-2">-</span>
            <div className="flex-none text-blue-500 text-base md:text-xl font-semibold">{((producaoIndustria?.consumo / (producaoIndustria?.metaSemanal / 5)) * 100).toFixed(2)}%</div>
          </div>
          <div className="flex items-center justify-between w-full py-2">
            <span className="flex items-center justify-center bg-red-500 rounded-full w-6 h-6 text-sm text-white font-bold mr-2">ON</span>
            <div className="flex-1 text-blue-500 text-base md:text-xl font-semibold">{formatNumber(producaoIndustria?.consumoOntem)}/{formatNumber((producaoIndustria?.metaSemanal / 5))}</div>
            <span className="flex-none font-normal text-center px-2">-</span>
            <div className="flex-none text-blue-500 text-base md:text-xl font-semibold">{((producaoIndustria?.consumoOntem / (producaoIndustria?.metaSemanal / 5)) * 100).toFixed(2)}%</div>
          </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start bg-gray-50 border border-gray-200 rounded-md p-1">
          <h1 className="text-gray-500 text-base md:text-lg font-semibold border-b w-full text-center">Quebra semana cx/h</h1>
          <div className="px-4 w-full">
          <div className="flex items-center justify-between w-full py-2">
            <div className="flex items-center justify-center bg-green-500 rounded-full w-6 h-6 text-sm text-white font-bold mr-2">AT</div>
            <div className="flex-1 text-blue-500 text-base md:text-xl font-semibold">{formatNumber(producaoIndustria?.consumoSemanal)}/{formatNumber(producaoIndustria?.metaSemanal)}</div>
            <div className="flex-none font-normal text-center px-2">-</div>
            <div className="flex-none text-blue-500 text-base md:text-xl font-semibold">{producaoIndustria?.percSemanal}%</div>
          </div>
          <div className="flex items-center justify-between w-full py-2">
            <div className="flex items-center justify-center bg-red-500 rounded-full w-6 h-6 text-sm text-white font-bold mr-2">AN</div>
            <div className="flex-1 text-blue-500 text-sm md:text-xl font-semibold">{formatNumber(producaoIndustria?.consumoSemanaAnt)}/{formatNumber(producaoIndustria?.metaSemanaAnt)}</div>
            <div className="flex-none font-normal text-center px-2">-</div>
            <div className="flex-none text-blue-500 text-sm md:text-xl font-semibold">{producaoIndustria?.percSemanaAnt}%</div>
          </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default NIndustria