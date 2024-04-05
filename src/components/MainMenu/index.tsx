import Link from "next/link"
import React from 'react'
import LinkMenu from "./LinkMenu"
import { IoHome } from "react-icons/io5"

type Props = {}

const MainMenu = (props: Props) => {
  return (
    <div className="bg-white p-2 mt-4 rounded-md shadow-sm">
      <ul className="flex items-center justify-start gap-2 md:gap-4 overflow-x-auto">
        <LinkMenu url="/solar" setor="loja" icon={<IoHome />} />
        <LinkMenu title="Resumo" url="/solar/sresumo" setor="loja" />
        <LinkMenu title="Faturamento" url="/" setor="loja" />
        <LinkMenu title="Inadimplência" url="/" setor="loja" />
        <LinkMenu title="Compras" url="/" setor="loja" />
        <LinkMenu title="Fluxo" url="/" setor="loja" />
        <LinkMenu title="Empréstimo" url="/" setor="loja" />
        <LinkMenu title="DRE" url="/" setor="loja" />
      </ul>
    </div>
  )
}

export default MainMenu