import { BTable, BTd, BTh, BTr } from '@/components/Table';
import { useAuthContext } from '@/contexts/AuthContext';
import birel from '@/services/birel';
import { formatMoney } from '@/utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

type Props = {};

const SPerfAssociacao = (props: Props) => {
  const { dataFiltro } = useAuthContext();
  const [lFatuPerfAssocLojas, setLFatuPerfAssocLojas] = useState<any>([]);
  const [lFatuTotPerfLojas, setLFatuTotPerfLojas] = useState<any>([]);

  // Extração de dados resumos filiais
  useEffect(() => {
    async function getLFatuTotLojas() {
      await birel
        .post('(LOJ_FAT_REFAAS)', {
          datalojrefaas: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setLFatuPerfAssocLojas(results.data.bi009.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getLFatuTotLojas();
  }, [dataFiltro]);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getLFatuTotLojas() {
      await birel
        .post('(LOJ_FAT_TOTPEFASM)', {
          datalojtotpefasm: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setLFatuTotPerfLojas(results.data.bi011.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getLFatuTotLojas();
  }, [dataFiltro]);

  return (
    <div className="w-full bg-solar-blue-primary rounded-t-md shadow-sm overflow-auto animate__animated animate__fadeIn">
      <BTable classname="text-gray-50">
        <thead>
          <BTr classname="">
            <BTh classname="w-16">Associação</BTh>
            <BTh classname="w-16">Faturamento</BTh>
            <BTh classname="w-16">Margem</BTh>
            <BTh classname="w-16">Rep.</BTh>
            <BTh classname="w-16">Juros</BTh>
            <BTh classname="w-16">Rep.</BTh>
            <BTh classname="w-16">Estoque</BTh>
            <BTh classname="w-16">Giro</BTh>
            <BTh classname="w-16">Rep.Est.</BTh>
          </BTr>
        </thead>
        <tbody>
          <BTr classname="bg-blue-50 text-gray-600 font-bold">
            <BTd>Total</BTd>
            <BTd>{formatMoney(lFatuTotPerfLojas[0]?.FaturamentoAss)}</BTd>
            <BTd>{(lFatuTotPerfLojas[0]?.MargemAss * 100).toFixed(2)}%</BTd>
            <BTd>{(lFatuTotPerfLojas[0]?.RepFatAss * 100).toFixed(2)}%</BTd>
            <BTd>{formatMoney(lFatuTotPerfLojas[0]?.JurSFatAss)}</BTd>
            <BTd>{(lFatuTotPerfLojas[0]?.RepJurosAss * 100).toFixed(2)}%</BTd>
            <BTd>{formatMoney(lFatuTotPerfLojas[0]?.EstoqueAss)}</BTd>
            <BTd>{parseFloat(lFatuTotPerfLojas[0]?.GiroAss).toFixed(0)}</BTd>
            <BTd>{(lFatuTotPerfLojas[0]?.RepEstoqueAss * 100).toFixed(2)}%</BTd>
          </BTr>
          {lFatuPerfAssocLojas
            .sort((a: any, b: any) =>
              parseInt(a.Faturamento) < parseInt(b.Faturamento) ? 1 : -1
            )
            .map((associacao: any, idx: number) => (
              <BTr
                key={idx}
                classname={`${idx % 2 === 0 ? 'bg-gray-100' : 'bg-neutral-50'} text-gray-500 hover:bg-red-50`}
              >
                <BTd>{associacao.Assoc}</BTd>
                <BTd>{formatMoney(associacao?.Faturamento)}</BTd>
                <BTd>{(associacao?.Margem * 100).toFixed(2)}%</BTd>
                <BTd>{(associacao?.RepFat * 100).toFixed(2)}%</BTd>
                <BTd>{formatMoney(associacao?.JurSFat)}</BTd>
                <BTd>{(associacao?.RepJuros * 100).toFixed(2)}%</BTd>
                <BTd>{formatMoney(associacao?.Estoque)}</BTd>
                <BTd>{(associacao?.Giro).toFixed(0)}</BTd>
                <BTd>{(associacao?.RepEstoque * 100).toFixed(2)}%</BTd>
              </BTr>
            ))}
        </tbody>
      </BTable>
    </div>
  );
};

export default SPerfAssociacao;
