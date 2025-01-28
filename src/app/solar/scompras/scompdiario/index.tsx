import AlertData from '@/components/AlertData';
import { BTable, BTd, BTh, BTr } from '@/components/Table';
import { useAuthContext } from '@/contexts/AuthContext';
import birel from '@/services/birel';
import { formatMoney } from '@/utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

type Props = {};

const SCompDiario = (props: Props) => {
  const { dataFiltro } = useAuthContext();
  const [lComComparaDia, setLComComparaDia] = useState<any>([]);
  const [lComTotais, setLComTotais] = useState<any>([]);

  // Extração de dados resumos serviço resumo dia
  useEffect(() => {
    async function getLComComparaDia() {
      await birel
        .post('(LOJ_COM_COMPARA)', {
          datalojcompara: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const res = results.data.bi001.bidata;
          setLComComparaDia(typeof res === "undefined" ? [] : res);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getLComComparaDia();
  }, [dataFiltro]);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getLComTotais() {
      await birel
        .post('(LOJ_COM_TOTAL)', {
          datalojtotal: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const res = results.data.bi005.bidata;
          setLComTotais(typeof res === "undefined" ? [] : res);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getLComTotais();
  }, [dataFiltro]);

  return (
    <>
      {lComComparaDia.length > 0
        ? <div className="w-full bg-solar-blue-primary rounded-t-md shadow-sm overflow-auto animate__animated animate__fadeIn">
          <BTable classname="text-gray-50">
            <thead>
              <BTr classname="">
                <BTh classname="w-16">Associação</BTh>
                <BTh classname="w-16">
                  Compra dia {lComTotais.map((d: any) => d.DiaAtual)}
                </BTh>
                <BTh classname="w-16">
                  Compra dia {lComTotais.map((d: any) => d.DiaAnterior)}
                </BTh>
                <BTh classname="w-16">Compra Semana</BTh>
                <BTh classname="w-16">Compra Mês</BTh>
                <BTh classname="w-16">Rep.</BTh>
                <BTh classname="w-16">Prazo médio</BTh>
              </BTr>
            </thead>
            <tbody>
              <BTr classname="bg-blue-50 text-gray-600 font-bold">
                <BTd>Total</BTd>
                <BTd>{formatMoney(lComTotais[0]?.CompraDia)}</BTd>
                <BTd>{formatMoney(lComTotais[0]?.CompraAnterior)}</BTd>
                <BTd>{formatMoney(lComTotais[0]?.CompraSemana)}</BTd>
                <BTd>{formatMoney(lComTotais[0]?.CompraMes)}</BTd>
                <BTd>{(lComTotais[0]?.Rep * 100).toFixed(2)}%</BTd>
                <BTd>{lComTotais[0]?.PrazoMedio}</BTd>
              </BTr>
              {lComComparaDia
                .sort((a: any, b: any) =>
                  parseInt(a.CompraMes) < parseInt(b.CompraMes) ? 1 : -1
                )
                .map((associacao: any, idx: number) => (
                  <BTr
                    key={idx}
                    classname={`${idx % 2 === 0 ? 'bg-gray-100' : 'bg-neutral-50'} text-gray-500 hover:bg-red-50`}
                  >
                    <BTd>{associacao.Assoc}</BTd>
                    <BTd>{formatMoney(associacao?.CompraDia)}</BTd>
                    <BTd>{formatMoney(associacao?.CompraAnterior)}</BTd>
                    <BTd>{formatMoney(associacao?.CompraSemana)}</BTd>
                    <BTd>{formatMoney(associacao?.CompraMes)}</BTd>
                    <BTd>{(associacao?.Rep * 100).toFixed(2)}%</BTd>
                    <BTd>{associacao?.PrazoMedio}</BTd>
                  </BTr>
                ))}
            </tbody>
          </BTable>
        </div>
        : <AlertData />
      }
    </>
  );
};

export default SCompDiario;
