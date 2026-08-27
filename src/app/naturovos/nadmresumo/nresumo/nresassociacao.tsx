import { BTable, BTd, BTh, BTr } from "@/components/Table";
import { useAuthContext } from "@/contexts/AuthContext";
import birel from "@/services/birel";
import { formatMoney, removeAcentos } from "@/utils";
import moment from "moment";
import React, { useEffect, useState } from 'react'
import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import { LoadingRows, ErrorRetry } from '@/components/StateFeedback';

const NResAssociacao = ({ grupo }: any) => {
    const { dataFiltro } = useAuthContext();
    const [openAccordion, setOpenAccordion] = useState(null);
    const [nResumoAssociacao, setNResumoAssociacao] = useState<any>([]);
    const [nResumoTotais, setNResumoTotais] = useState<any>([]);
    const [loadingAssociacao, setLoadingAssociacao] = useState(true);
    const [loadingTotais, setLoadingTotais] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [reloadTrigger, setReloadTrigger] = useState(0);

    useEffect(() => {
        async function getNResumoGrupo() {
            await birel
                .post('(NAT_RES_ASSOCIACAO)', {
                    dataassociacao: moment(dataFiltro).format('YYYYMMDD'),
                })
                .then(results => {
                    const dataGrupo = results.data.bi030.bidata.filter(
                        (g: any) => removeAcentos(g.GrupoPai) === removeAcentos(grupo)
                    );
                    setNResumoAssociacao(dataGrupo);
                })
                .catch(err => {
                    console.log(err);
                    setHasError(true);
                })
                .finally(() => setLoadingAssociacao(false));
        }
        getNResumoGrupo();
    }, [dataFiltro, grupo, reloadTrigger]);

    useEffect(() => {
        async function getNResumoTotais() {
            await birel
                .post('(NAT_RES_TOTAIS)', {
                    datanatrestotais: moment(dataFiltro).format('YYYYMMDD'),
                })
                .then(results => {
                    const res = results.data.bi033.bidata;
                    setNResumoTotais(typeof res === "undefined" ? [] : res);
                })
                .catch(err => {
                    console.log(err);
                    setHasError(true);
                })
                .finally(() => setLoadingTotais(false));
        }
        getNResumoTotais();
    }, [dataFiltro, reloadTrigger]);

    const handleRetry = () => {
        setHasError(false);
        setLoadingAssociacao(true);
        setLoadingTotais(true);
        setReloadTrigger(t => t + 1);
    };

    const handleAccordionClick = (index: any) => {
        if (index !== openAccordion) {
            setOpenAccordion(index);
        } else {
            setOpenAccordion(null);
        }
    };

    if (loadingAssociacao || loadingTotais) return <LoadingRows rows={3} />;
    if (hasError) return <ErrorRetry onRetry={handleRetry} />;

    return (
        <div className="w-full animate__animated animate__fadeIn">
            <BTable classname="text-gray-800">

                <tbody>
                    <BTr classname="bg-blue-50 text-gray-600 font-bold">
                        <BTh classname="w-0"><></></BTh>
                        <BTh classname="w-[120px]">Associação</BTh>
                        <BTh classname="w-16">{nResumoTotais[0]?.RotValorMesAtual}</BTh>
                        <BTh classname="w-16">{nResumoTotais[0]?.RotRepValorMesAnterior}</BTh>
                        <BTh classname="w-16">{nResumoTotais[0]?.RotRepValorAnoAnterior}</BTh>
                        <BTh classname="w-16">{nResumoTotais[0]?.RotQtdMesAtual}</BTh>
                        <BTh classname="w-16">{nResumoTotais[0]?.RotRepQtdMesAnterior}</BTh>
                        <BTh classname="w-16">{nResumoTotais[0]?.RotRepQtdMesAnterior}</BTh>
                        <BTh classname="w-16">{nResumoTotais[0]?.RotRepQtdAnoAnterior}</BTh>
                        <BTh classname="w-16">{nResumoTotais[0]?.RotRepPrecMedioMesAnterior}</BTh>
                        <BTh classname="w-16">{nResumoTotais[0]?.RotPrecMedioAnoAnterior}</BTh>
                        <BTh classname="w-16">{nResumoTotais[0]?.RotMargemAtual}</BTh>
                    </BTr>
                    {nResumoAssociacao
                        .sort((a: any, b: any) =>
                            parseInt(a.ValorMesAtual) < parseInt(b.ValorMesAtual) ? 1 : -1
                        )
                        .map((assoc: any, idx: any) => (
                            <BTr
                                key={idx}
                                classname={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-neutral-50'} text-gray-500 transition-colors duration-150 hover:bg-solar-orange-prymary/10`}
                            >
                                <BTd classname="flex justify-end"><IoChevronForward size={20} color="#cacaca" /></BTd>
                                <BTd>{assoc.Associacao}</BTd>
                                <BTd>{formatMoney(assoc?.ValorMesAtual)}</BTd>
                                <BTd>{(assoc?.RepValorMesAnterior * 100).toFixed(2)}%</BTd>
                                <BTd>{isNaN(assoc?.RepValorAnoAnterior) ? 0 : (assoc?.RepValorAnoAnterior * 100).toFixed(2)}%</BTd>
                                <BTd>{assoc?.QtdMesAtual.toFixed()}</BTd>
                                <BTd>{(assoc?.RepQtdMesAnterior * 100).toFixed(2)}%</BTd>
                                <BTd>{(assoc?.RepQtdAnoAnterior * 100).toFixed(2)}%</BTd>
                                <BTd>{formatMoney(assoc?.PrecMedioMesAtual)}</BTd>
                                <BTd>{formatMoney(assoc?.RepPrecMedioMesAnterior)}</BTd>
                                <BTd>{formatMoney(assoc?.RepPrecMedioAnoAnterior)}</BTd>
                                <BTd>{(assoc?.RepMargemAtual * 100).toFixed(2)}%</BTd>
                            </BTr>
                        ))}
                </tbody>
            </BTable>
        </div>
    )
}

export default NResAssociacao