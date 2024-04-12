import Link from 'next/link';
import React from 'react';
import LinkMenu from './LinkMenu';
import { IoHome } from 'react-icons/io5';
import { GrGroup } from 'react-icons/gr';

const MainMenu = () => {
  return (
    <div className="bg-white p-2 mt-4 rounded-md shadow-sm">
      <ul className="flex items-center justify-start gap-2 md:gap-4 overflow-x-auto">
        <LinkMenu
          url="/"
          depto="grupo"
          icon={<GrGroup size={18} title="Voltar ao menu Grupo Solar" />}
        />
        <LinkMenu
          url="/solar"
          depto="loja"
          icon={<IoHome />}
          title="Voltar ao início de Lojas"
        />
        <LinkMenu value="Resumo" url="/solar/sresumo" depto="loja" />
        <LinkMenu value="Faturamento" url="/solar/sfaturamento" depto="loja" />
        <LinkMenu
          value="Inadimplência"
          url="/solar/sinadimplencia"
          depto="loja"
        />
        <LinkMenu value="Compras" url="/solar/scompras" depto="loja" />
        <LinkMenu value="Fluxo" url="/solar/sfluxo" depto="loja" />
        <LinkMenu value="Empréstimo" url="/solar/semprestimos" depto="loja" />
        <LinkMenu value="DRE" url="/solar/sdre" depto="loja" />
      </ul>
    </div>
  );
};

export default MainMenu;
