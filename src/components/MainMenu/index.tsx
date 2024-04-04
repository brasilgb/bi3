import Link from "next/link"
import React from 'react'
import LinkMenu from "./LinkMenu"
import { IoHome } from "react-icons/io5"

type Props = {}

const MainMenu = (props: Props) => {
  return (
    <div className="bg-white p-2 mt-4 rounded-md shadow-sm">
        <ul className="flex items-center justify-start gap-2 md:gap-4 overflow-x-auto">
            <LinkMenu  url="/solar" icon={<IoHome />} />
            <LinkMenu title="Resumo" url="/" />
            <LinkMenu title="Faturamento" url="/" />
            <LinkMenu title="Inadimplência" url="/" />
            <LinkMenu title="Compras" url="/" />
            <LinkMenu title="Fluxo" url="/" />
            <LinkMenu title="Empréstimo" url="/" />
            <LinkMenu title="DRE" url="/" />
        </ul>
    </div>
  )
}

export default MainMenu