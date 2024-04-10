import { BTable, BTd, BTr } from "@/components/Table";
import { useAuthContext } from "@/contexts/AuthContext";
import birel from "@/services/birel";
import moment from "moment";
import React, { useEffect, useState } from 'react'

type Props = {}

const FluxoSolar = (props: Props) => {
    const { dataInicial, dataFinal } = useAuthContext();
    const [fluxoDataParcialLojas, setFluxoDataParcialLojas] = useState<any>([]);
    const [level2, setLevel2] = useState(false);
    const [level3, setLevel3] = useState(false);

    useEffect(() => {
        async function getFluxoCaixaLojas() {
            await birel
                .post('(FLUXO_DE_CAIXA)', {
                    fluxoTipreg: 1,
                    fluxoDepto: 1,
                    fluxoDatini: moment(dataInicial).format('YYYYMMDD'),
                    fluxoDatfin: moment(dataFinal).format('YYYYMMDD'),
                })
                .then(results => {
                    setFluxoDataParcialLojas(results.data.bi054.bidata);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        getFluxoCaixaLojas();
    }, [dataInicial, dataFinal]);

    return (
        <div className="w-full bg-solar-blue-dark text-white rounded-t-md shadow-sm overflow-auto animate__animated animate__fadeIn">
            <div className="font-medium text-left px-2 py-0.5 whitespace-nowrap">Fluxo de caixa lojas</div>
            <BTable>
                {fluxoDataParcialLojas
                    .filter((n1: any) => (n1.nivel === 1))
                    .sort((a: any, b: any) => (a.ordem > b.ordem ? 1 : -1))
                    .map((fluxo1: any, idx: number) => (
                        <>
                            <BTr key={idx} classname={`flex justify-between  ${idx % 2 === 0 ? "bg-gray-100" : "bg-neutral-50"} text-gray-500 hover:bg-red-50`}>
                                <BTd classname="">{fluxo1.descricao}</BTd>
                                <BTd classname="">{fluxo1.valor}</BTd>
                            </BTr>
                            {level2 &&
                                <BTr>
                                    <BTd colspan={2} classname="!p-0">
                                        {fluxoDataParcialLojas
                                            .filter((n2: any) => (n2.nivel === 2 && fluxo1.codigo === n2.agrupador && n2.valor !== 0))
                                            .map((fluxo2: any, idx: number) => (
                                                <>
                                                    <BTr key={idx} classname={`flex justify-between ${idx % 2 === 0 ? "bg-gray-100" : "bg-neutral-50"} text-gray-500 hover:bg-red-50`}>
                                                        <BTd classname=""><span className="pl-4">{fluxo2.descricao}</span></BTd>
                                                        <BTd classname="">{fluxo2.valor}</BTd>
                                                    </BTr>
                                                    {level3 &&
                                                        <BTr classname="!p-0 flex flex-col">
                                                            <BTd colspan={2} classname="!p-0">
                                                                {fluxoDataParcialLojas
                                                                    .filter((n3: any) => (n3.nivel === 3 && fluxo2.codigo === n3.agrupador))
                                                                    .map((fluxo3: any, idx: number) => (
                                                                        <BTr key={idx} classname={`flex justify-between ${idx % 2 === 0 ? "bg-gray-100" : "bg-neutral-50"} text-gray-500 hover:bg-red-50`}>
                                                                            <BTd classname=""><span className="pl-8">{fluxo3.descricao}</span></BTd>
                                                                            <BTd classname="">{fluxo3.valor}ok</BTd>
                                                                        </BTr>
                                                                    ))}
                                                            </BTd>
                                                        </BTr>
                                                    }
                                                </>
                                            ))}
                                    </BTd>
                                </BTr>
                            }
                        </>
                    ))}
            </BTable>
        </div>
    )
}

export default FluxoSolar