import { BTable, BTd, BTh, BTr } from "@/components/Table";
import { useAuthContext } from "@/contexts/AuthContext";
import birel from "@/services/birel";
import { formatMoney } from "@/utils";
import moment from "moment";
import React, { useEffect, useState } from 'react'
import { FaSquareRootVariable } from "react-icons/fa6";

type Props = {}

const NDescarte = (props: Props) => {
    const { dataInicial, dataFinal } = useAuthContext();
    const [descarte, setDescarte] = useState<any>([]);

    useEffect(() => {
        const getResumoProducao = async () => {
            await birel
                .post('(NAT_DESCARTES)', {
                    "codprodes": 1,
                    "datproini": moment(dataInicial).format('YYYYMMDD'),
                    "datprofin": moment(dataFinal).format('YYYYMMDD')
                })
                .then(response => {
                    const { bidata } = response.data.bi066;
                    setDescarte(bidata);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        getResumoProducao();
    }, [dataInicial, dataFinal]);

    const intToDate = (value: any) => {
        let strval = value.toString();
        return `${strval.substr(6, 2)}/${strval.substr(4, 2)}/${strval.substr(0, 4)}`
    }

    const notDecimalPlaces = (value: any) => {
        return (value).toFixed();
    };

    return (
        <div className="w-full bg-solar-orange-prymary rounded-t-md shadow-sm overflow-auto animate__animated animate__fadeIn">
            <BTable classname="text-gray-800">
                <thead>
                    <BTr classname="">
                        <BTh classname="w-20">Cód. Forn.</BTh>
                        <BTh classname="w-96">Nome Forn.</BTh>
                        <BTh>Tipo ovo</BTh>
                        <BTh classname="w-40">Desc. ovo</BTh>
                        <BTh classname="text-right">Caixas Proc.</BTh>
                        <BTh classname="text-right">Peso Proc.</BTh>
                        <BTh classname="text-right">Desc. Screw</BTh>
                        <BTh classname="text-right">Desc. Alim.</BTh>
                        <BTh classname="text-right">Desc. Ovosc.</BTh>
                        <BTh classname="text-right">Rec. Ovosc.</BTh>
                        <BTh classname="text-right">Descarte %</BTh>
                    </BTr>
                </thead>
                <tbody>
                    {descarte?.filter((fil: any) => (fil.codFor == '99999999')).map((tot: any, idx: number) => (
                        <BTr classname="text-right bg-gray-100 uppercase font-semibold text-gray-600">
                            <BTd colspan={4} classname="bg-gray-800 text-left text-gray-50">Total</BTd>
                            <BTd>{notDecimalPlaces(tot?.qtdEst)}</BTd>
                            <BTd>{notDecimalPlaces(tot?.pesoKg)}</BTd>
                            <BTd>{notDecimalPlaces(tot?.qtdCen)}</BTd>
                            <BTd>{notDecimalPlaces(tot?.qtdAli)}</BTd>
                            <BTd>{notDecimalPlaces(tot?.qtdOvod)}</BTd>
                            <BTd>{notDecimalPlaces(tot?.qtdOvo)}</BTd>
                            <BTd>{notDecimalPlaces((tot?.percDes) * 100)}</BTd>
                        </BTr>
                    ))}
                    {descarte?.filter((fil: any) => (fil.codFor != '99999999')).map((desc: any, idx: number) => (
                        <BTr key={idx}
                            classname={`${idx % 2 === 0 ? 'bg-gray-100' : 'bg-neutral-50'} text-gray-500 hover:bg-red-50`}>
                            <BTd>{(desc.codFor)}</BTd>
                            <BTd>{(desc.nomFor)}</BTd>
                            <BTd classname="text-center">{(desc.tipOvo)}</BTd>
                            <BTd>{(desc.desOvo)}</BTd>
                            <BTd classname="text-right">{notDecimalPlaces(isNaN(desc.qtdEst) ? 0 : desc.qtdEst)}</BTd>
                            <BTd classname="text-right">{notDecimalPlaces(isNaN(desc.pesoKg) ? 0 : desc.pesoKg)}</BTd>
                            <BTd classname="text-right">{notDecimalPlaces(isNaN(desc.qtdCen) ? 0 : desc.qtdCen)}</BTd>
                            <BTd classname="text-right">{notDecimalPlaces(isNaN(desc.qtdAli) ? 0 : desc.qtdAli)}</BTd>
                            <BTd classname="text-right">{notDecimalPlaces(isNaN(desc.qtdOvod) ? 0 : desc.qtdOvod)}</BTd>
                            <BTd classname="text-right">{notDecimalPlaces(isNaN(desc.qtdOvo) ? 0 : desc.qtdOvo)}</BTd>
                            <BTd classname="text-right">{notDecimalPlaces((isNaN(desc.percDes) ? 0 : desc.percDes) * 100)}</BTd>
                        </BTr>
                    ))}
                </tbody>
            </BTable>
        </div>
    )
}

export default NDescarte