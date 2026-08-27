import AlertData from '@/components/AlertData';
import { LoadingRows, ErrorRetry } from '@/components/StateFeedback';
import LComBar from '@/components/Charts/LComBar';
import { useAuthContext } from '@/contexts/AuthContext';
import birel from '@/services/birel';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

type Props = {};

const NComPerformance = (props: Props) => {
  const { dataFiltro } = useAuthContext();
  const [nComGrafico, setNComGrafico] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getLComGrafico() {
      await birel
        .post('(NAT_COM_COMPRAGRAF)', {
          datanatcompragraf: moment(dataFiltro).format('YYYYMMDD'),
        })
        .then(results => {
          const res = results.data.bi017.bidata;
          setNComGrafico(typeof res === "undefined" ? [] : res);
        })
        .catch(err => {
          console.log(err);
          setHasError(true);
        })
        .finally(() => setLoading(false));
    }
    getLComGrafico();
  }, [dataFiltro, reloadTrigger]);

  const handleRetry = () => {
    setHasError(false);
    setLoading(true);
    setReloadTrigger(t => t + 1);
  };

  return (
    <>
      {loading
        ? <LoadingRows />
        : hasError
        ? <ErrorRetry onRetry={handleRetry} />
        : nComGrafico.length > 0
        ? <div className="mt-4 animate__animated animate__fadeIn">
          <LComBar data={nComGrafico} />
        </div>
        : <AlertData />
      }
    </>
  );
};

export default NComPerformance;
