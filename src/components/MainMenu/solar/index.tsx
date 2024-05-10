import React from 'react';
import { IoHome } from 'react-icons/io5';
import { GrGroup } from 'react-icons/gr';
import { useSearchParams } from "next/navigation";
import SLinkMenu from "./SLinkMenu";

const MainMenuSolar
 = () => {
  const searchParams = useSearchParams();
  const depto = searchParams.get('depto');
  return (
    <div className="bg-white p-2 mt-4 rounded-md shadow-sm">
      <ul className="flex items-center justify-start gap-2 md:gap-4 overflow-x-auto">
        <SLinkMenu
          url="/"
          depto="grupo"
          icon={<GrGroup size={20} title="Voltar ao menu Grupo Solar" />}
        />
        <SLinkMenu
          url="/solar"
          depto="solar"
          icon={<IoHome />}
          title="Voltar ao início de Loja"
        />
        <SLinkMenu value="Resumo" url="/solar/sresumo" depto="loja" />
        <SLinkMenu value="Faturamento" url="/solar/sfaturamento" depto="loja" />
        <SLinkMenu
          value="Inadimplência"
          url="/solar/sinadimplencia"
          depto="loja"
        />
        <SLinkMenu value="Compras" url="/solar/scompras" depto="loja" />
        <SLinkMenu value="Fluxo" url="/solar/sfluxo" depto="loja" />
        <SLinkMenu value="Empréstimo" url="/solar/semprestimos" depto="loja" />
        <SLinkMenu value="DRE" url="/solar/sdre" depto="loja" />
      </ul>
    </div>
  );
};

export default MainMenuSolar
;
