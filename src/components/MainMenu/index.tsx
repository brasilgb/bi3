import Link from "next/link"
import React from 'react'
import LinkMenu from "./LinkMenu"
import { IoHome } from "react-icons/io5"

type Props = {}

const MainMenu = (props: Props) => {
  return (
    <div className="bg-white p-2 mt-4 rounded-md shadow-sm">
      <ul className="flex items-center justify-start gap-2 md:gap-4 overflow-x-auto">
        <LinkMenu url="/solar" depto="loja" icon={<IoHome />} />
        <LinkMenu title="Resumo" url="/solar/sresumo" depto="loja" />
        <LinkMenu title="Faturamento" url="/solar/sfaturamento" depto="loja" />
        <LinkMenu title="Inadimplência" url="/solar/sinadimplencia" depto="loja" />
        <LinkMenu title="Compras" url="/solar/scompras" depto="loja" />
        <LinkMenu title="Fluxo" url="/solar/sfluxo" depto="loja" />
        <LinkMenu title="Empréstimo" url="/" depto="loja" />
        <LinkMenu title="DRE" url="/" depto="loja" />
      </ul>
    </div>
  )
}

export default MainMenu