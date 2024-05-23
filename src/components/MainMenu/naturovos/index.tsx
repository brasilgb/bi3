import React from 'react';
import { IoHome, IoReload } from 'react-icons/io5';
import { GrGroup } from 'react-icons/gr';
import NLinkMenu from "./NLinkMenu";

const MainMenuNaturovos = () => {

  return (
    <div className="bg-white md:p-2 px-2 mt-4 rounded-md shadow-sm">
      <ul className="flex items-center justify-start gap-2 md:gap-4 overflow-x-auto">
        <NLinkMenu
          url="/"
          depto="grupo"
          icon={<GrGroup title="Voltar ao menu Grupo Solar" />}
        />
        <NLinkMenu
          url="/naturovos"
          depto="naturovos"
          icon={<IoHome />}
          title="Voltar ao início de Naturovos"
        />
        <NLinkMenu value="Produção" url="/naturovos/nproducao" depto="naturovos" />
        <NLinkMenu value="Resumo" url="/naturovos/nresumo" depto="naturovos" />
        <NLinkMenu value="Faturamento" url="/naturovos/nfaturamento" depto="naturovos" />
        <NLinkMenu value="Compras" url="/naturovos/ncompras" depto="naturovos" />
        <NLinkMenu value="ADM Resumo" url="/naturovos/nadmresumo" depto="naturovos" />
        <NLinkMenu value="Fluxo" url="/naturovos/nfluxo" depto="naturovos" />
        <NLinkMenu value="DRE" url="/naturovos/ndre" depto="naturovos" />
      </ul>
    </div>
  );
};

export default MainMenuNaturovos;
