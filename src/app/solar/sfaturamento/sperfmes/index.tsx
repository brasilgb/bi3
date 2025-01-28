import AlertData from '@/components/AlertData';
import { BTable, BTd, BTh, BTr } from '@/components/Table';
import { useAuthContext } from '@/contexts/AuthContext';
import birel from '@/services/birel';
import { formatMoney } from '@/utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

type Props = {};

const SPerfMes = (props: Props) => {
  const { dataFiltro } = useAuthContext();
  const [lFatuPerfMesLojas, setLFatuPerfMesLojas] = useState<any>([]);
  const [lFatuTotMesLojas, setLFatuTotMesLojas] = useState<any>([]);

  // Extração de dados resumos filiais
  useEffect(() => {
    async function getLFatuPerfMesLojas() {
      await birel
        .post('(LOJ_FAT_REPERFMES)', {
          datalojfatperfmes: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const res = results.data.bi010.bidata;
          setLFatuPerfMesLojas(typeof res === "undefined" ? [] : res);
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
        .post('(LOJ_FAT_TOTPEFASM)', {
          datalojtotpefasm: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const res = results.data.bi011.bidata;
          setLFatuTotMesLojas(typeof res === "undefined" ? [] : res);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getLFatuTotLojas();
  }, [dataFiltro]);

  return (
    <>
      {lFatuPerfMesLojas.length > 0
        ? <div className="w-full bg-solar-blue-primary rounded-t-md shadow-sm overflow-auto animate__animated animate__fadeIn">
          <BTable classname="text-gray-50">
            <thead>
              <BTr classname="">
                <BTh classname="w-16">Mes/Ano</BTh>
                <BTh classname="w-16">Meta</BTh>
                <BTh classname="w-16">Média Fat.</BTh>
                <BTh classname="w-16">Margem</BTh>
                <BTh classname="w-16">Rep.Fat</BTh>
                <BTh classname="w-16">Meta</BTh>
                <BTh classname="w-16">Méd.JurS/Parc.</BTh>
                <BTh classname="w-16">Rep.Juros</BTh>
              </BTr>
            </thead>
            <tbody>
              <BTr classname="bg-blue-50 text-gray-600 font-bold">
                <BTd>Total</BTd>
                <BTd>{formatMoney(lFatuTotMesLojas[0]?.MetaMes)}</BTd>
                <BTd>{formatMoney(lFatuTotMesLojas[0]?.MediaFatuMes)}</BTd>
                <BTd>{(lFatuTotMesLojas[0]?.MargemMes * 100).toFixed(2)}%</BTd>
                <BTd>{(lFatuTotMesLojas[0]?.RepFatuMes * 100).toFixed(2)}%</BTd>
                <BTd>
                  {(lFatuTotMesLojas[0]?.MetaAlcancadaMes * 100).toFixed(2)}%
                </BTd>
                <BTd>{formatMoney(lFatuTotMesLojas[0]?.MedJurSParcMes)}</BTd>
                <BTd>{(lFatuTotMesLojas[0]?.RepJurosMes * 100).toFixed(2)}%</BTd>
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
                    <BTd>{formatMoney(associacao?.Meta)}</BTd>
                    <BTd>{formatMoney(associacao?.MediaFatu)}</BTd>
                    <BTd>{(associacao?.Margem * 100).toFixed(2)}%</BTd>
                    <BTd>{(associacao?.RepFatu * 100).toFixed(2)}%</BTd>
                    <BTd>{(associacao?.MetaAlcancada * 100).toFixed(2)}%</BTd>
                    <BTd>{formatMoney(associacao?.MedJurSParc)}</BTd>
                    <BTd>{(associacao?.RepJuros * 100).toFixed(2)}%</BTd>
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

export default SPerfMes;
