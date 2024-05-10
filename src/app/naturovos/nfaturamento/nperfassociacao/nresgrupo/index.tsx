import { BTable, BTd, BTh, BTr } from '@/components/Table';
import { useAuthContext } from '@/contexts/AuthContext';
import birel from '@/services/birel';
import { formatMoney, removeAcentos } from '@/utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import NResAssoc from "../nresassoc";
import { IoChevronDown } from "react-icons/io5";

interface GrupoProps {
    setor: string;
}

const NResGrupo = ({ setor }: GrupoProps) => {
    const { dataFiltro } = useAuthContext();
    const [nFatuGrupo, setNFatuGrupo] = useState<any>([]);
    const [openAccordion, setOpenAccordion] = useState(null);

    // Extração de dados resumos filiais
    useEffect(() => {
        async function getNFatuGrupo() {
            await birel
                .post('(NAT_FAT_PERFGRUPO)', {
                    datanatperfgrupo: moment(dataFiltro).format('YYYYMMDD'),
                })
                .then(results => {
                    const dataGrupo = results.data.bi026.bidata.filter(
                        (g: any) => removeAcentos(g.Setor) === removeAcentos(setor)
                    );
                    setNFatuGrupo(dataGrupo);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        getNFatuGrupo();
    }, [dataFiltro,setor]);

    const handleAccordionClick = (index: any) => {
        if (index !== openAccordion) {
            setOpenAccordion(index);
        } else {
            setOpenAccordion(null);
        }
    };
    return (
        <div className="w-full animate__animated animate__fadeIn">
            <BTable classname="text-gray-800">
                <thead>
                    <BTr classname="!bg-blue-200">
                        <BTh classname="w-0"><></></BTh>
                        <BTh classname="w-16">Grupo</BTh>
                        <BTh classname="w-16">Faturamento</BTh>
                        <BTh classname="w-16">Margem</BTh>
                        <BTh classname="w-16">Rep. Total</BTh>
                        <BTh classname="w-16">Preço Médio</BTh>
                        <BTh classname="w-16">Preço Médio(Kg)</BTh>
                        <BTh classname="w-16">Fat. + EC</BTh>
                        <BTh classname="w-16">Rep. + EC</BTh>
                        <BTh classname="w-16">Margem + EC</BTh>
                    </BTr>
                </thead>
                <tbody>
                    {nFatuGrupo
                        .sort((a: any, b: any) =>
                            parseInt(a.Faturamento) < parseInt(b.Faturamento) ? 1 : -1
                        )
                        .map((setor: any, idx: number) => (
                            <>
                                <BTr
                                    key={idx}
                                    onclick={() => handleAccordionClick(idx)}
                                    classname={`${openAccordion === idx ? 'bg-gray-300 active:bg-gray-300 hover:bg-gray-300' : idx % 2 === 0 ? 'bg-gray-100' : 'bg-neutral-50 '} text-gray-500 active:bg-gray-300 hover:bg-red-50 cursor-pointer`}
                                >
                                    <BTd classname="flex justify-center"><IoChevronDown size={20} color={openAccordion === idx ? '#2168eb' : '#bebbbb'} className={`duration-300 ${openAccordion === idx ? '-rotate-180' : 'rotate-0'}`} /></BTd>
                                    <BTd>{setor.Grupo}</BTd>
                                    <BTd>{formatMoney(setor?.Faturamento)}</BTd>
                                    <BTd>{(setor?.Margem * 100).toFixed(2)}%</BTd>
                                    <BTd>{(setor?.RepTotal * 100).toFixed(2)}%</BTd>
                                    <BTd>{formatMoney(setor?.PrecoMedio)}</BTd>
                                    <BTd>{formatMoney(setor?.PrecoMedioKg)}</BTd>
                                    <BTd>{formatMoney(setor?.FaturamentoEC)}</BTd>
                                    <BTd>{(setor?.RepEc * 100).toFixed(2)}%</BTd>
                                    <BTd>{(setor?.MargemEc * 100).toFixed(2)}%</BTd>
                                </BTr>
                                <BTr>
                                    <BTd colspan={14} classname={`!px-0 ${openAccordion === idx ? "" : "hidden"}`}>
                                        <NResAssoc grupo={setor.Grupo} />
                                    </BTd>
                                </BTr>
                            </>
                        ))}
                </tbody>
            </BTable>
        </div>
    );
};

export default NResGrupo;