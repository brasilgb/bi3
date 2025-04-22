import React, { useEffect, useState } from 'react';

import Vacaria from "./vacaria";
import Industria from "./industria";
import birel from "@/services/birel";
import Central from "./central";

const NResumo = ({ totais, data }: any) => {
  const [resumoProducao, setResumoProducao] = useState<any>([]);
  const [resumoProducao48, setResumoProducao48] = useState<any>([]);

  
  useEffect(() => {
    const getResumoProducao = async () => {
      await birel
        .get('(ANALISE_PRODUCAO)')
        .then(response => {
          const { bidata } = response.data.bi065;
          setResumoProducao(bidata[0]);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getResumoProducao();
  }, []);

  useEffect(() => {
    const getResumoProducao = async () => {
      await birel
        .get('(RESUMO_PRODUCAO)')
        .then(response => {
          const { bidata } = response.data.bi064;
          const filial48 = bidata.filter((fil: any) => fil.filial === 48);
          setResumoProducao48(filial48[0]);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getResumoProducao();
  }, []);

  return (
    <div className="px-2">
      <Industria data={resumoProducao48} />
    </div>
  );
};

export default NResumo;
