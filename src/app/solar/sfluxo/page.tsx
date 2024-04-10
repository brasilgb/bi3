'use client'
import ButtonAnalise from "@/components/ButtonAnalise";
import MainMenu from "@/components/MainMenu";
import SubBarTop from "@/components/SubBarTop";
import React, { useState } from 'react'
import FluxoSolar from "./fluxosolar";
import FluxoGrupo from "./fluxogrupo";
import FluxoSolarData from "./fluxosolardata";
import FluxoGrupoData from "./fluxogrupodata";

type Props = {}

const SFluxo = (props: Props) => {
  const [analise, setAnalise] = useState<string>('fluxolojas');

  return (
    <main>
      <SubBarTop colors="border-gray-200 text-gray-500" back="/solar" forwards="" depto="loja" />
      <div className="container m-auto md:px-0 px-2">
        <MainMenu />
      </div>
      <div className='container m-auto'>

        <div className='bg-white p-2 mt-2 rounded-md shadow-sm'>
          <div className='flex items-center justify-start gap-2 md:gap-4 overflow-x-auto'>
            <ButtonAnalise title={'Fluxo Lojas'} onclick={() => setAnalise('fluxolojas')} active={analise} />
            <ButtonAnalise title={'Fluxo Grupo'} onclick={() => setAnalise('fluxogrupo')} active={analise} />
            <ButtonAnalise title={'Fluxo Lojas/Data'} onclick={() => setAnalise('fluxolojasdata')} active={analise} />
            <ButtonAnalise title={'Fluxo Grupo/Data'} onclick={() => setAnalise('fluxogrupodata')} active={analise} />
          </div>
          <div className="mt-2">
            {analise === "fluxolojas" &&
              <FluxoSolar />
            }
            {analise === "fluxogrupo" &&
              <FluxoGrupo />
            }
            {analise === "fluxolojasdata" &&
              <FluxoSolarData />
            }
            {analise === "fluxogrupodata" &&
              <FluxoGrupoData />
            }
          </div>
        </div>

      </div>
    </main>
  )
}

export default SFluxo