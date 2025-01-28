import AlertData from '@/components/AlertData';
import LComBar from '@/components/Charts/LComBar';
import { useAuthContext } from '@/contexts/AuthContext';
import birel from '@/services/birel';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

type Props = {};

const SComPerformance = (props: Props) => {
  const { dataFiltro } = useAuthContext();
  const [lComGrafico, setLComGrafico] = useState<any>([]);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getLComGrafico() {
      await birel
        .post('(LOJ_COM_GRAFICO)', {
          datalojgraf: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const res = results.data.bi002.bidata;
          setLComGrafico(typeof res === "undefined" ? [] : res);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getLComGrafico();
  }, [dataFiltro]);

  return (
    <>
      {lComGrafico.length > 0
        ? <div className="mt-4 animate__animated animate__fadeIn">
          <LComBar data={lComGrafico} />
        </div>
        : <AlertData />
      }
    </>
  );
};

export default SComPerformance;
