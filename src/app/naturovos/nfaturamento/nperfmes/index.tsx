import { BTable, BTd, BTh, BTr } from '@/components/Table';
import { useAuthContext } from '@/contexts/AuthContext';
import birel from '@/services/birel';
import { formatMoney } from '@/utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

type Props = {};

const NPerfMes = (props: Props) => {
  const { dataFiltro } = useAuthContext();
  const [lFatuPerfMesLojas, setLFatuPerfMesLojas] = useState<any>([]);
  const [lFatuTotMesLojas, setLFatuTotMesLojas] = useState<any>([]);

  // Extração de dados resumos filiais
  useEffect(() => {
    async function getLFatuPerfMesLojas() {
      await birel
        .post('(NAT_FAT_PERFMES)', {
          datanatperfmes: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setLFatuPerfMesLojas(results.data.bi028.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getLFatuPerfMesLojas();
  }, [dataFiltro]);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getLFatuTotLojas() {
      await birel
        .post('(NAT_FAT_TOTAIS)', {
          datanattotais: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          setLFatuTotMesLojas(results.data.bi029.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getLFatuTotLojas();
  }, [dataFiltro]);
  return (
    <div className="w-full bg-solar-orange-prymary rounded-t-md shadow-sm overflow-auto animate__animated animate__fadeIn">
      <BTable classname="text-gray-800">
        <thead>
          <BTr classname="">
            <BTh classname="w-16">Mes/Ano</BTh>
            <BTh classname="w-16">Faturamento</BTh>
            <BTh classname="w-16">Margem</BTh>
            <BTh classname="w-16">Rep.Total</BTh>
            <BTh classname="w-16">Preço Médio Kg</BTh>
          </BTr>
        </thead>
        <tbody>
          <BTr classname="bg-blue-50 text-gray-600 font-bold">
            <BTd>Total</BTd>
            <BTd>{formatMoney(lFatuTotMesLojas[0]?.PMesFaturamento)}</BTd>
            <BTd>{(lFatuTotMesLojas[0]?.PMesMargem * 100).toFixed(2)}%</BTd>
            <BTd>{(lFatuTotMesLojas[0]?.PMesRepTotal * 100).toFixed(2)}%</BTd>
            <BTd>{formatMoney(lFatuTotMesLojas[0]?.PMesPrecoMedioKg)}</BTd>
          </BTr>
          {lFatuPerfMesLojas
            .sort((a: any, b: any) =>
              parseInt(a.AnoMesNum) < parseInt(b.AnoMesNum) ? 1 : -1
            )
            .map((associacao: any, idx: number) => (
              <BTr
                key={idx}
                classname={`${idx % 2 === 0 ? 'bg-gray-100' : 'bg-neutral-50'} text-gray-500 hover:bg-red-50`}
              >
                <BTd>{associacao.MesAno}</BTd>
                <BTd>{formatMoney(associacao?.Faturamento)}</BTd>
                <BTd>{(associacao?.Margem * 100).toFixed(2)}%</BTd>
                <BTd>{(associacao?.RepTotal * 100).toFixed(2)}%</BTd>
                <BTd>{formatMoney(associacao?.PrecoMedioKg)}</BTd>
              </BTr>
            ))}
        </tbody>
      </BTable>
    </div>
  );
};

export default NPerfMes;
