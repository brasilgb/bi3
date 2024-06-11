import Link from "next/link"
import React from 'react'
import { IoArrowBack } from "react-icons/io5"

type Props = {}

const notFound = (props: Props) => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="w-1/3 bg-gray-50 p-6 rounded-md border-white shadow-md flex flex-col items-center justify-start">
        <div className="text-8xl text-red-400 font-bold drop-shadow-md mb-4">
          404
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-400">Página ou url não encontrada</h1>
        <p className="text-base font-semibold text-center text-gray-700 my-2">Esta página ou url não existe ou não está acessível!</p>
        <p className="text-sm font-medium text-center text-gray-500">Se você acha que deveria ver o conteúdo desta página entre em contato com o setor responsável!</p>
        <div>
          <Link
            className="flex items-center justify-center bg-solar-blue-primary py-1 px-3 rounded-md mt-3 text-gray-50 shadow-md transition-colors duration-300 hover:bg-solar-blue-primary/90"
            href="/"
          >
            <IoArrowBack size={22} />
            <span className="mr-2">Voltar ao início</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default notFound