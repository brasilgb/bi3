import ButtonHome from '@/components/ButtonHome';
import React from 'react';

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="container m-auto flex flex-col items-center animate__animated animate__fadeIn">
      <div className="flex items-center justify-center py-4">
        <h1 className="md:text-3xl text-xl font-bold text-solar-blue-secundary uppercase -md">
          Relatórios Administrativos
        </h1>
      </div>
      <div className="flex md:flex-row w-full flex-col items-center justify-center md:gap-7 gap-4 mt-4 md:px-0 px-2">
        <ButtonHome
          url="/solar"
          depto="loja"
          bgbutton="bg-solar-blue-primary"
          logobutton="logo_solar.png"
          colorbutton="text-solar-gray-light"
        />
        <ButtonHome
          url="/naturovos"
          depto="naturovos"
          bgbutton="bg-solar-orange-prymary"
          logobutton="logo_naturovos.png"
          colorbutton="text-gray-700"
        />
      </div>
    </div>
  );
};

export default Home;
