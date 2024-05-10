import { BTable, BTd, BTh, BTr } from '@/components/Table';
import { useAuthContext } from '@/contexts/AuthContext';
import birel from '@/services/birel';
import { formatMoney } from '@/utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

type Props = {};

const NComPerformanceTipo = (props: Props) => {
  const { dataFiltro } = useAuthContext();
  const [nComPerTipo, setNComPerTipo] = useState<any>([]);
  const [nComTotais, setNComTotais] = useState<any>([]);

  // Extração de dados resumos serviço resumo dia
  useEffect(() => {
    async function getLComPerfAssoc() {
      await birel
        .post('(NAT_COM_COMPERTIPO)', {
          datanatcompertipo: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setNComPerTipo(results.data.bi018.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getLComPerfAssoc();
  }, [dataFiltro]);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getLComTotais() {
      await birel
        .post('(NAT_COM_COMPRATOTA)', {
          datanatcompratota: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setNComTotais(results.data.bi020.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getLComTotais();
  }, [dataFiltro]);

  return (
    <div className="w-full bg-solar-orange-prymary rounded-t-md shadow-sm overflow-auto animate__animated animate__fadeIn">
      <BTable classname="text-gray-800">
        <thead>
          <BTr classname="">
            <BTh classname="w-16">Tipo</BTh>
            <BTh classname="w-16">Compras</BTh>
            <BTh classname="w-16">Rep. Total</BTh>
            <BTh classname="w-16">Preço médio</BTh>
            <BTh classname="w-16">Compras + EC</BTh>
            <BTh classname="w-16">Rep. Total + EC	</BTh>
            <BTh classname="w-16">Preço Médio + EC</BTh>
          </BTr>
        </thead>
        <tbody>
          <BTr classname="bg-blue-50 text-gray-600 font-bold">
            <BTd>Total</BTd>
            <BTd>{formatMoney(nComTotais[0]?.PerCompra)}</BTd>
            <BTd>{(nComTotais[0]?.PerRepTotal * 100).toFixed(2)}%</BTd>
            <BTd>-</BTd>
            <BTd>{formatMoney(nComTotais[0]?.PerCompraEC)}</BTd>
            <BTd>{(nComTotais[0]?.PerRepTotalEC * 100).toFixed(2)}%</BTd>
            <BTd>-</BTd>
          </BTr>
          {nComPerTipo
            .sort((a: any, b: any) =>
              parseInt(a.Compra) < parseInt(b.Compra) ? 1 : -1
            )
            .map((associacao: any, idx: number) => (
              <BTr
                key={idx}
                classname={`${idx % 2 === 0 ? 'bg-gray-100' : 'bg-neutral-50'} text-gray-500 hover:bg-red-50`}
              >
                <BTd>{associacao.MateriaPrima}</BTd>
                <BTd>{formatMoney(associacao?.Compra)}</BTd>
                <BTd>{(associacao?.RepTotal * 100).toFixed(2)}%</BTd>
                <BTd>{formatMoney(associacao?.PrecoMedio)}</BTd>
                <BTd>{formatMoney(associacao?.CompraEC)}</BTd>
                <BTd>{(associacao?.RepTotalEC * 100).toFixed(2)}%</BTd>
                <BTd>{formatMoney(associacao?.PrecoMedioEC)}</BTd>
              </BTr>
            ))}
        </tbody>
      </BTable>
    </div>
  );
};

export default NComPerformanceTipo;
