import LComBar from '@/components/Charts/LComBar';
import { useAuthContext } from '@/contexts/AuthContext';
import birel from '@/services/birel';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

type Props = {};

const NComPerformance = (props: Props) => {
  const { dataFiltro } = useAuthContext();
  const [nComGrafico, setNComGrafico] = useState<any>([]);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getLComGrafico() {
      await birel
      .post('(NAT_COM_COMPRAGRAF)', {
        datanatcompragraf: moment(dataFiltro).format('YYYYMMDD'),
      })
      .then(results => {
        setNComGrafico(results.data.bi017.bidata);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getLComGrafico();
  }, [dataFiltro]);

  console.log(nComGrafico);

  return (
    <div className="mt-4 animate__animated animate__fadeIn">
      <LComBar data={nComGrafico} />
    </div>
  );
};

export default NComPerformance;
