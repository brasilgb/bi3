'use client'
import ButtonAnalise from '@/components/ButtonAnalise'
import MainMenu from '@/components/MainMenu'
import SubBarTop from '@/components/SubBarTop'
import Link from 'next/link'
import React, { useState } from 'react'
import SFiliais from './sfiliais'
import SAssociacao from './sassociacao'

type Props = {}

const SResumo = (props: Props) => {
  const [analise, setAnalise] = useState<string>('filiais');

  return (
    <main>
      <SubBarTop colors="border-gray-200 text-gray-500" back="/" forwards="" />
      <div className="container m-auto md:px-0 px-2">
        <MainMenu />
      </div>
      <div className='container m-auto'>

        <div className='bg-white mt-2 rounded-md shadow-sm p-2'>
          <div className='flex items-center justify-start md:gap-4 gap-2'>
            <ButtonAnalise title={'Filiais'} onclick={() => setAnalise('filiais')} active={analise} />
            <ButtonAnalise title={'Associação'} onclick={() => setAnalise('associacao')} active={analise} />
          </div>
          <div>
          {analise === "filiais" &&
            <SFiliais />
            }
            {analise === "associacao" &&
            <SAssociacao />
            }
          </div>
        </div>

      </div>
    </main>
  )
}

export default SResumo