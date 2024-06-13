'use client';
import React, { useEffect } from 'react';
import Profile from '../profile';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { IoArrowBack } from "react-icons/io5";

const Header = () => {
  let stringdata: any = localStorage.getItem('portal_access');
  const jsondata = JSON.parse(stringdata);
  const apps = jsondata?.folders?.length;

  const searchParams = useSearchParams();
  const depto = searchParams.get('depto');

  return (
    <header
      className={`${depto === 'loja' ? 'bg-solar-blue-primary' : depto === 'naturovos' ? 'bg-solar-orange-prymary' : 'bg-solar-blue-secundary'} px-2 flex items-center`}
    >
      {apps > 1 &&
        <div className="flex-none flex items-center justify-left mr-2">
          <Link
            href="http://portal.gruposolar.com.br"
            className={`rounded-md px-1 py-1 flex items-center justify-center border-2 border-white shadow-md duration-300 ${depto === 'loja' ? 'bg-solar-green-prymary text-white' : depto === 'naturovos' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-solar-blue-secundary'}`}
          >
            <IoArrowBack />
          </Link>
        </div>
      }
      <div className="container py-1 mx-auto flex items-center justify-between h-16">
        <div
          className={`flex items-center ${depto == 'loja' ? 'w-28' : depto == 'naturovos' ? 'w-24' : 'w-36'} p-0.5`}
        >
          <Link href={`${depto === 'loja' ? '/' : depto === 'naturovos' ? '/' : 'http://portal.gruposolar.com.br/bi3'}`}>
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
