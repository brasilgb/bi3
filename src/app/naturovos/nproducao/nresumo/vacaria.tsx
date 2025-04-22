'use client'
import { KpiNatur } from "@/components/Kpis";
import birel from "@/services/birel";
import { formatNumber } from "@/utils";
import React, { useEffect, useState } from 'react'
import { IoChevronDown } from "react-icons/io5";

const NVacaria = ({ data }: any) => {
    const [vacariaOpen, setVacariaOpen] = useState<boolean>(false);
    const [producaoVacaria, setProducaoVacaria] = useState<any>([]);

    useEffect(() => {
        const getProducaoVacaria = async () => {
            await birel
                .get('(PRODUCAO_CENTRAIS)')
                .then(response => {
                    const { producao } = response.data.prodCent;
                    setProducaoVacaria(producao[1]);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        getProducaoVacaria();
    }, []);

    return (
        <div className="bg-gray-50 shadow-md rounded-md">
            <div
                onClick={() => setVacariaOpen(!vacariaOpen)}
                className="w-full px-2 bg-solar-orange-prymary rounded-t-md shadow-sm overflow-auto animate__animated animate__fadeIn flex items-center justify-between cursor-pointer">
                <h1 className="text-base font-medium text-center py-1">
                    Central (26)
                </h1>
                <span
                    className={`md:hidden ${vacariaOpen ? '-rotate-180' : 'rotate-0'} transition duration-300`}
                >
                    <IoChevronDown size={25} />
                </span>
            </div>

            <div
                className={`md:grid md:grid-cols-5 gap-4 p-2 ${vacariaOpen ? 'flex flex-col' : 'hidden'}`}
            >
                <KpiNatur
                    title="Estoque Caixas"
                    value={formatNumber(producaoVacaria?.EstoqueCaixas)}
                    titleStyle="text-gray-500 text-base md:text-lg font-semibold"
                    valorStyle={`text-solar-orange-prymary text-base md:text-3xl font-semibold`}
                    rotuloStyle=""
                    kpiStyle="border border-gray-600 bg-white"
                />
                <KpiNatur
                    title="Caixas Mês Anterior"
                    value={formatNumber(producaoVacaria?.CxMesAnterior)}
                    titleStyle="text-gray-500 text-base md:text-lg font-semibold"
                    valorStyle={`text-blue-500 text-base md:text-3xl font-semibold`}
                    rotuloStyle=""
                    kpiStyle=""
                />
                <KpiNatur
                    title="Caixas Mês Atual"
                    value={formatNumber(producaoVacaria?.CxMesAtual)}
                    titleStyle="text-gray-500 text-base md:text-lg font-semibold"
                    valorStyle={`text-blue-500 text-base md:text-3xl font-semibold`}
                    rotuloStyle=""
                    kpiStyle=""
                />
                <KpiNatur
                    title="Classificados Mês Anterior"
                    value={formatNumber(producaoVacaria?.OvosClaMesAnterior)}
                    titleStyle="text-gray-500 text-base md:text-lg font-semibold"
                    valorStyle={`text-blue-500 text-base md:text-3xl font-semibold`}
                    rotuloStyle=""
                    kpiStyle=""
                />{' '}
                <KpiNatur
                    // realTime={true}
                    title="Classificados Mês Atual"
                    value={formatNumber(producaoVacaria?.OvosClaMesAtual)}
                    titleStyle="text-gray-500 text-base md:text-lg font-semibold"
                    valorStyle={`text-blue-500 text-base md:text-3xl font-semibold`}
                    rotuloStyle=""
                    kpiStyle=""
                />
            </div>
            <div
                className={`md:grid md:grid-cols-4 gap-4 p-2 ${vacariaOpen ? 'flex flex-col' : 'hidden'}`}
            >
                <KpiNatur
                    title="Caixas Semana"
                    value={formatNumber(producaoVacaria?.CxSemana)}
                    titleStyle="text-gray-500 text-base md:text-lg font-semibold"
                    valorStyle={`text-blue-500 text-base md:text-3xl font-semibold`}
                    rotuloStyle=""
                    kpiStyle=""
                />
                <KpiNatur
                    title="Caixas Dia"
                    value={formatNumber(producaoVacaria?.CxDia)}
                    titleStyle="text-gray-500 text-base md:text-lg font-semibold"
                    valorStyle={`text-blue-500 text-base md:text-3xl font-semibold`}
                    rotuloStyle=""
                    kpiStyle=""
                />
                <KpiNatur
                    title="Classificados Semana"
                    value={formatNumber(producaoVacaria?.OvosClaSemana)}
                    titleStyle="text-gray-500 text-base md:text-lg font-semibold"
                    valorStyle={`text-blue-500 text-base md:text-3xl font-semibold`}
                    rotuloStyle=""
                    kpiStyle=""
                />
                <KpiNatur
                    title="Classificados Dia"
                    value={formatNumber(producaoVacaria?.OvosClaDia)}
                    titleStyle="text-gray-500 text-base md:text-lg font-semibold"
                    valorStyle={`text-blue-500 text-base md:text-3xl font-semibold`}
                    rotuloStyle=""
                    kpiStyle=""
                />
            </div>
        </div>
    )
}

export default NVacaria