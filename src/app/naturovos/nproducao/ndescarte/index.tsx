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

    const totalCols = (value: any) => {
        descarte?.reduce((tot: any, val: any) => {
            return (tot + val.value);
        }, 0)
    };

    return (
        <div className="w-full bg-solar-orange-prymary rounded-t-md shadow-sm overflow-auto animate__animated animate__fadeIn">
            <BTable classname="text-gray-800 !table-fixed">
                <thead>
                    <BTr classname="">
                        <BTh>Data</BTh>
                        <BTh classname="w-20">Cód. Forn.</BTh>
                        <BTh classname="w-96">Nome Forn.</BTh>
                        <BTh>Tipo ovo</BTh>
                        <BTh classname="w-40">Desc. ovo</BTh>
                        <BTh>Caixas Proc.</BTh>
                        <BTh>Peso Proc.</BTh>
                        <BTh>Desc. Screw</BTh>
                        <BTh>Desc. Alim.</BTh>
                        <BTh>Desc. Ovosc.</BTh>
                        <BTh>Rec. Ovosc.</BTh>
                        <BTh>Descarte %</BTh>
                    </BTr>
                </thead>
                <tbody>
                    <BTr classname="bg-gray-100 uppercase font-semibold text-gray-600">
                        <BTd colspan={5} classname="bg-gray-800 text-left text-gray-50">Total</BTd>
                        <BTd>{
                            descarte?.reduce((tot: any, val: any) => {
                                return isNaN(tot + val.qtdest) ? 0 : tot + val.qtdest;
                            }, 0).toFixed()
                        }</BTd>
                        <BTd>{
                            descarte?.reduce((tot: any, val: any) => {
                                return isNaN(tot + val.pesoKg) ? 0 : tot + val.pesoKg;
                            }, 0).toFixed()
                        }</BTd>
                        <BTd>{
                            descarte?.reduce((tot: any, val: any) => {
                                return isNaN(tot + val.qtdcen) ? 0 : tot + val.qtdcen;
                            }, 0).toFixed()
                        }</BTd>
                        <BTd>{
                            descarte?.reduce((tot: any, val: any) => {
                                return isNaN(tot + val.qtdali) ? 0 : tot + val.qtdali;
                            }, 0).toFixed()
                        }</BTd>
                        <BTd>{
                            descarte?.reduce((tot: any, val: any) => {
                                return isNaN(tot + val.qtdOvod) ? 0 : tot + val.qtdOvod;
                            }, 0).toFixed()
                        }</BTd>
                        <BTd>{
                            descarte?.reduce((tot: any, val: any) => {
                                return isNaN(tot + val.qtdOvo) ? 0 : tot + val.qtdOvo;
                            }, 0).toFixed()
                        }</BTd>
                        <BTd>{
                            descarte?.reduce((tot: any, val: any) => {
                                return isNaN(tot + val.percDes) ? 0 : parseFloat(tot + val.percDes);
                            }, 0).toFixed(2)
                        }</BTd>
                    </BTr>
                    {descarte?.map((desc: any, idx: number) => (
                        <BTr key={idx}
                            classname={`${idx % 2 === 0 ? 'bg-gray-100' : 'bg-neutral-50'} text-gray-500 hover:bg-red-50`}>
                            <BTd>{intToDate(desc.datPro)}</BTd>
                            <BTd>{(desc.codFor)}</BTd>
                            <BTd>{(desc.nomFor)}</BTd>
                            <BTd classname="text-center">{(desc.tipOvo)}</BTd>
                            <BTd>{(desc.desOvo)}</BTd>
                            <BTd>{(isNaN(desc.qtdest) ? 0 : desc.qtdest).toFixed()}</BTd>
                            <BTd>{(isNaN(desc.pesoKg) ? 0 : desc.pesoKg).toFixed()}</BTd>
                            <BTd>{(isNaN(desc.qtdcen) ? 0 : desc.qtdcen).toFixed()}</BTd>
                            <BTd>{(isNaN(desc.qtdali) ? 0 : desc.qtdali).toFixed()}</BTd>
                            <BTd>{(isNaN(desc.qtdOvod) ? 0 : desc.qtdOvod).toFixed()}</BTd>
                            <BTd>{(isNaN(desc.qtdOvo) ? 0 : desc.qtdOvo).toFixed()}</BTd>
                            <BTd>{(isNaN(desc.percDes) ? 0 : desc.percDes).toFixed(2)}</BTd>
                        </BTr>
                    ))}
                </tbody>
            </BTable>
        </div>
    )
}

export default NDescarte