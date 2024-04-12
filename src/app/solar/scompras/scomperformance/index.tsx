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
          const grafSort = results.data.bi002.bidata;
          setLComGrafico(grafSort);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getLComGrafico();
  }, [dataFiltro]);

  console.log(lComGrafico);

  return (
    <div className="mt-4 animate__animated animate__fadeIn">
      <LComBar data={lComGrafico} />
    </div>
  );
};

export default SComPerformance;
