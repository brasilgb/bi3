import React from 'react';
import { BTable, BTd, BTh, BTr } from '@/components/Table';
import { formatMoney } from '@/utils';

const SFiliais = ({ totais, data }: any) => {
  return (
    <div className="w-full bg-solar-blue-dark rounded-t-md shadow-sm overflow-auto animate__animated animate__fadeIn">
      <BTable classname="text-gray-50">
        <thead>
          <BTr classname="">
            <BTh classname="w-36">Filial</BTh>
            <BTh classname="w-36">Faturamento</BTh>
            <BTh classname="w-20">Rep. Fat.</BTh>
            <BTh classname="w-20">Projeção</BTh>
            <BTh classname="w-20">Margem</BTh>
            <BTh classname="w-20">Meta</BTh>
          </BTr>
        </thead>
        <tbody>
          <BTr classname="bg-blue-50 text-gray-600 font-bold">
            <BTd>Total</BTd>
            <BTd>{formatMoney(totais[0]?.Faturamento)}</BTd>
            <BTd>{(1 * 100).toFixed(2)}%</BTd>
            <BTd>{(totais[0]?.Projecao * 100).toFixed(2)}%</BTd>
            <BTd>{(totais[0]?.Margem * 100).toFixed(2)}%</BTd>
            <BTd>{(totais[0]?.MetaAlcancada * 100).toFixed(2)}%</BTd>
          </BTr>
          {data
            .sort((a: any, b: any) =>
              parseInt(a.Faturamento) < parseInt(b.Faturamento) ? 1 : -1
            )
            .map((filial: any, idx: number) => (
              <BTr
                key={idx}
                classname={`${idx % 2 === 0 ? 'bg-gray-100' : 'bg-neutral-50'} text-gray-500 hover:bg-red-50`}
              >
                <BTd>{filial.Filial}</BTd>
                <BTd>{formatMoney(filial.Faturamento)}</BTd>
                <BTd>{(filial.RepFaturamento * 100).toFixed(2)}%</BTd>
                <BTd>{(filial.Projecao * 100).toFixed(2)}%</BTd>
                <BTd>{(filial.Margem * 100).toFixed(2)}%</BTd>
                <BTd>{(filial.MetaAlcancada * 100).toFixed(2)}%</BTd>
              </BTr>
            ))}
        </tbody>
      </BTable>
    </div>
  );
};

export default SFiliais;
