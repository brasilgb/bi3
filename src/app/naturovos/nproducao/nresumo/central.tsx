'use client'
import { KpiNatur } from "@/components/Kpis";
import birel from "@/services/birel";
import { formatNumber } from "@/utils";
import React, { useEffect, useState } from 'react'
import { IoChevronDown } from "react-icons/io5";

const NCentral = ({ data }: any) => {
    const [centralOpen, setCentralOpen] = useState<boolean>(false);
    const [producaoCentral, setProducaoCentral] = useState<any>([]);

    useEffect(() => {
        const getProducaoCentral = async () => {
            await birel
                .get('(PRODUCAO_CENTRAIS)')
                .then(response => {
                    const { producao } = response.data.prodCent;
                    setProducaoCentral(producao[0]);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        getProducaoCentral();
    }, []);


    return (
        <div className="bg-gray-50 shadow-md rounded-md">
            <div
                onClick={() => setCentralOpen(!centralOpen)}
                className="w-full px-2 bg-solar-orange-prymary rounded-t-md shadow-sm overflow-auto animate__animated animate__fadeIn flex items-center justify-between cursor-pointer">
                <h1 className="text-base font-medium text-center py-1">
                    Central (26)
                </h1>
                <span
                    className={`md:hidden ${centralOpen ? '-rotate-180' : 'rotate-0'} transition duration-300`}
                >
                    <IoChevronDown size={25} />
                </span>
            </div>
           
            <div
                className={`md:grid md:grid-cols-5 gap-4 p-2 ${centralOpen ? 'flex flex-col' : 'hidden'}`}
            >
            <KpiNatur
                title="Estoque Caixas"
                value={formatNumber(producaoCentral?.EstoqueCaixas)}
                titleStyle="text-gray-500 text-base md:text-lg font-semibold"
                valorStyle={`text-solar-orange-prymary text-base md:text-3xl font-semibold`}
                rotuloStyle=""
                kpiStyle="border border-gray-600 bg-white"
            />
                <KpiNatur
                    title="Caixas Mês Anterior"
                    value={formatNumber(producaoCentral?.CxMesAnterior)}
                    titleStyle="text-gray-500 text-base md:text-lg font-semibold"
                    valorStyle={`text-blue-500 text-base md:text-3xl font-semibold`}
                    rotuloStyle=""
                    kpiStyle=""
                />
                <KpiNatur
                    title="Caixas Mês Atual"
                    value={formatNumber(producaoCentral?.CxMesAtual)}
                    titleStyle="text-gray-500 text-base md:text-lg font-semibold"
                    valorStyle={`text-blue-500 text-base md:text-3xl font-semibold`}
                    rotuloStyle=""
                    kpiStyle=""
                />
                <KpiNatur
                    title="Classificados Mês Anterior"
                    value={formatNumber(producaoCentral?.OvosClaMesAnterior)}
                    titleStyle="text-gray-500 text-base md:text-lg font-semibold"
                    valorStyle={`text-blue-500 text-base md:text-3xl font-semibold`}
                    rotuloStyle=""
                    kpiStyle=""
                />{' '}
                <KpiNatur
                    // realTime={true}
                    title="Classificados Mês Atual"
                    value={formatNumber(producaoCentral?.OvosClaMesAtual)}
                    titleStyle="text-gray-500 text-base md:text-lg font-semibold"
                    valorStyle={`text-blue-500 text-base md:text-3xl font-semibold`}
                    rotuloStyle=""
                    kpiStyle=""
                />
            </div>
            <div
                className={`md:grid md:grid-cols-4 gap-4 p-2 ${centralOpen ? 'flex flex-col' : 'hidden'}`}
            >
                <KpiNatur
                    title="Caixas Semana"
                    value={formatNumber(producaoCentral?.CxSemana)}
                    titleStyle="text-gray-500 text-base md:text-lg font-semibold"
                    valorStyle={`text-blue-500 text-base md:text-3xl font-semibold`}
                    rotuloStyle=""
                    kpiStyle=""
                />
                <KpiNatur
                    title="Caixas Dia"
                    value={formatNumber(producaoCentral?.CxDia)}
                    titleStyle="text-gray-500 text-base md:text-lg font-semibold"
                    valorStyle={`text-blue-500 text-base md:text-3xl font-semibold`}
                    rotuloStyle=""
                    kpiStyle=""
                />
                <KpiNatur
                    title="Classificados Semana"
                    value={formatNumber(producaoCentral?.OvosClaSemana)}
                    titleStyle="text-gray-500 text-base md:text-lg font-semibold"
                    valorStyle={`text-blue-500 text-base md:text-3xl font-semibold`}
                    rotuloStyle=""
                    kpiStyle=""
                />
                <KpiNatur
                    title="Classificados Dia"
                    value={formatNumber(producaoCentral?.OvosClaDia)}
                    titleStyle="text-gray-500 text-base md:text-lg font-semibold"
                    valorStyle={`text-blue-500 text-base md:text-3xl font-semibold`}
                    rotuloStyle=""
                    kpiStyle=""
                />
            </div>
        </div>
    )
}

export default NCentral