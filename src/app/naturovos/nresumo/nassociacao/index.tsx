import AlertData from '@/components/AlertData';
import { BTable, BTd, BTh, BTr } from '@/components/Table';
import { formatMoney } from '@/utils';
import React from 'react';

const NAssociacao = ({ totais, data }: any) => {
  return (
    <>
      {data.length > 0
        ? <div className="w-full bg-solar-orange-prymary rounded-t-md shadow-sm overflow-x-auto animate__animated animate__fadeIn">
          <BTable classname="text-gray-800">
            <thead>
              <BTr classname="">
                <BTh classname="w-16">Associação</BTh>
                <BTh classname="w-36">Faturamento</BTh>
                <BTh classname="w-20">Rep. Fat.</BTh>
                <BTh classname="w-20">Projeção</BTh>
                <BTh classname="w-20">Margem</BTh>
                <BTh classname="w-20">Preço Médio</BTh>
              </BTr>
            </thead>
            <tbody>
              <BTr classname="bg-blue-50 text-gray-600 font-bold">
                <BTd>Total</BTd>
                <BTd>{formatMoney(totais[0]?.Faturamento)}</BTd>
                <BTd>{(1 * 100).toFixed(2)}%</BTd>
                <BTd>{(totais[0]?.Projecao * 100).toFixed(2)}%</BTd>
                <BTd>{(totais[0]?.Margem * 100).toFixed(2)}%</BTd>
                <BTd>{formatMoney(totais[0]?.PrecoMedio)}</BTd>
              </BTr>
              {data
                .sort((a: any, b: any) =>
                  parseInt(a.Faturamento) < parseInt(b.Faturamento) ? 1 : -1
                )
                .map((associacao: any, idx: number) => (
                  <BTr
                    key={idx}
                    classname={`${idx % 2 === 0 ? 'bg-gray-100' : 'bg-neutral-50'} text-gray-500 hover:bg-red-50`}
                  >
                    <BTd>{associacao.Associacao}</BTd>
                    <BTd>{formatMoney(associacao.Faturamento)}</BTd>
                    <BTd>{(associacao.RepFaturamento * 100).toFixed(2)}%</BTd>
                    <BTd>{(associacao.Projecao * 100).toFixed(2)}%</BTd>
                    <BTd>{(associacao.Margem * 100).toFixed(2)}%</BTd>
                    <BTd>{formatMoney(associacao.PrecoMedio)}</BTd>
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

export default NAssociacao;
