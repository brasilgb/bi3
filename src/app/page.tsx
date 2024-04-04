import ButtonHome from "@/components/ButtonHome"
import React from 'react'

type Props = {}

const Home = (props: Props) => {
  return (
    <div className="container m-auto flex flex-col items-center">
      <div className="flex items-center justify-center py-4">
        <h1 className="md:text-3xl text-xl font-bold text-solar-blue-light uppercase drop-shadow-md">Relatórios Administrativos</h1>
      </div>
      <div className="flex md:flex-row w-full flex-col items-center justify-center md:gap-7 gap-4 mt-4 md:px-0 px-2">
        <ButtonHome url="/solar" bgbutton="bg-solar-blue-dark" logobutton="logo_solar.png" colorbutton="text-solar-gray-light" />
        <ButtonHome url="/naturovos" bgbutton="bg-solar-yellow-200" logobutton="logo_naturovos.png" colorbutton="text-gray-700"  />
      </div>
    </div>
  )
}

export default Home