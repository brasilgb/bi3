'use client'
import { KpiNatur } from "@/components/Kpis";
import { formatNumber } from "@/utils";
import React, { useState } from 'react'
import { IoChevronDown } from "react-icons/io5";

const Vacaria = ({ data }: any) => {
    const [vacariaOpen, setVacariaOpen] = useState<boolean>(false);

    return (
        <div className="bg-gray-50 shadow-md rounded-md">
            <div 
            onClick={() => setVacariaOpen(!vacariaOpen)}
            className="w-full px-2 bg-solar-orange-prymary rounded-t-md shadow-sm overflow-auto animate__animated animate__fadeIn flex items-center justify-between cursor-pointer">
                <h1 className="text-base font-medium text-center py-1">
                    Vacaria (43)
                </h1>
                <span
                    className={`md:hidden ${vacariaOpen ? '-rotate-180' : 'rotate-0'} transition duration-300`}
                >
                    <IoChevronDown size={25} />
                </span>
            </div>
            <div
                className={`md:grid md:grid-cols-2 gap-4 p-2 ${vacariaOpen ? 'flex flex-col' : 'hidden'}`}
            >
                <KpiNatur
                    // realTime={true}
                    title="Total cx"
                    value={formatNumber(data?.TotalCxFilial43)}
                    titleStyle="text-gray-500 text-base md:text-lg font-semibold"
                    valorStyle={`text-blue-500 text-base md:text-3xl font-semibold`}
                    rotuloStyle=""
                    kpiStyle=""
                />
                <KpiNatur
                    // realTime={true}
                    title="Média diaria cx"
                    value={formatNumber(data?.MediaDiariaCxFilial43)}
                    titleStyle="text-gray-500 text-base md:text-lg font-semibold"
                    valorStyle={`text-blue-500 text-base md:text-3xl font-semibold`}
                    rotuloStyle=""
                    kpiStyle=""
                />
                <KpiNatur
                    // realTime={true}
                    title="Total ovos emb."
                    value={formatNumber(data?.TotalOvosEmbFilial43)}
                    titleStyle="text-gray-500 text-base md:text-lg font-semibold"
                    valorStyle={`text-blue-500 text-base md:text-3xl font-semibold`}
                    rotuloStyle=""
                    kpiStyle=""
                />{' '}
                <KpiNatur
                    // realTime={true}
                    title="Média diária ovos"
                    value={formatNumber(data?.MediaDiariaOvosFilial43)}
                    titleStyle="text-gray-500 text-base md:text-lg font-semibold"
                    valorStyle={`text-blue-500 text-base md:text-3xl font-semibold`}
                    rotuloStyle=""
                    kpiStyle=""
                />
            </div>
        </div>
    )
}

export default Vacaria