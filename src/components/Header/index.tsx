'use client';
import React from 'react';
import Profile from '../profile';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type Props = {};

const Header = (props: Props) => {
  const searchParams = useSearchParams();
  const depto = searchParams.get('depto');

  return (
    <header
      className={`${depto === 'loja' ? 'bg-solar-blue-dark' : depto === 'naturovos' ? 'bg-solar-yellow-200' : 'bg-solar-blue-light'} px-2`}
    >
      <div className="container py-1 mx-auto flex items-center justify-between h-16">
        <div
          className={`flex items-center ${depto == 'loja' ? 'w-28' : depto == 'naturovos' ? 'w-24' : 'w-36'} p-0.5`}
        >
          <Link href={`${depto === 'loja' ? '/' : depto === 'naturovos' ? '/' : 'http://portal.gruposolar.com.br/'}`}>
            <Image
              layout="responsive"
              src={`/bi3/logo/${depto === 'loja' ? 'logo_solar.png' : depto === 'naturovos' ? 'logo_naturovos.png' : 'logo_grupo.png'}`}
              width={120}
              height={40}
              alt={''}
            />
          </Link>
        </div>
        <div>
          <Profile />
        </div>
      </div>
    </header>
  );
};

export default Header;
