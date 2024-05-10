import { BTable, BTd, BTh, BTr } from '@/components/Table';
import { useAuthContext } from '@/contexts/AuthContext';
import birel from '@/services/birel';
import { formatMoney } from '@/utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

type Props = {};

const NCompDiario = (props: Props) => {
  const { dataFiltro } = useAuthContext();
  const [nFatuPerfMes, setNComComparaDia] = useState<any>([]);
  const [nComTotais, setNComTotais] = useState<any>([]);


  // Extração de dados resumos filiais
  useEffect(() => {
    async function getNComComparaDia() {
      await birel
        .post('(NAT_COM_COMPRATIPO)', {
          datanatcompratipo: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setNComComparaDia(results.data.bi019.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getNComComparaDia();
  }, [dataFiltro]);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getNComTotais() {
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
    getNComTotais();
  }, [dataFiltro]);

  return (
    <div className="w-full bg-solar-orange-prymary rounded-t-md shadow-sm overflow-auto animate__animated animate__fadeIn">
      <BTable classname="text-gray-800">
        <thead>
          <BTr classname="">
            <BTh classname="w-16">Tipo</BTh>
            <BTh classname="w-16">
              Compra dia {nComTotais.map((d: any) => d.DiaAtual)}
            </BTh>
            <BTh classname="w-16">Compra Semana</BTh>
            <BTh classname="w-16">Compra Mês</BTh>
            <BTh classname="w-16">Rep. Total</BTh>
            <BTh classname="w-16">-</BTh>
            <BTh classname="w-16">Preço médio</BTh>
            <BTh classname="w-16">-</BTh>
          </BTr>
        </thead>
        <tbody>
          <BTr classname="bg-blue-50 text-gray-600 font-bold">
            <BTd>Total</BTd>
            <BTd>{formatMoney(nComTotais[0]?.ComCompraDia)}</BTd>
            <BTd>{formatMoney(nComTotais[0]?.ComCompraSemana)}</BTd>
            <BTd>{formatMoney(nComTotais[0]?.ComCompraMes)}</BTd>
            <BTd>{(nComTotais[0]?.ComRepTotal * 100).toFixed(2)}%</BTd>
            <BTd>-</BTd>
            <BTd>-</BTd>
            <BTd>-</BTd>
          </BTr>
          {nFatuPerfMes
            .sort((a: any, b: any) =>
              parseInt(a.CompraMes) < parseInt(b.CompraMes) ? 1 : -1
            )
            .map((perfmes: any, idx: number) => (
              <BTr
                key={idx}
                classname={`${idx % 2 === 0 ? 'bg-gray-100' : 'bg-neutral-50'} text-gray-500 hover:bg-red-50`}
              >
                <BTd>{perfmes.MateriaPrima}</BTd>
                <BTd>{formatMoney(perfmes?.CompraDia)}</BTd>
                <BTd>{formatMoney(perfmes?.CompraSemana)}</BTd>
                <BTd>{formatMoney(perfmes?.CompraMes)}</BTd>
                <BTd>{(perfmes?.RepTotal * 100).toFixed(2)}%</BTd>
                <BTd>{(perfmes?.RepAno * 100).toFixed(2)}%</BTd>
                <BTd>{formatMoney(perfmes?.PrecoMedio)}</BTd>
                <BTd>{(perfmes?.RepPrecoMedio * 100).toFixed(2)}%</BTd>
              </BTr>
            ))}
        </tbody>
      </BTable>
    </div>
  );
};

export default NCompDiario;
