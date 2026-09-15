'use client';
import React, { useEffect } from 'react';
import Profile from '../profile';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { IoArrowBack } from "react-icons/io5";
import { useAuthContext } from "@/contexts/AuthContext";
import { APP_ROUTES } from "@/constants/app-routes";

const Header = () => {
  const { user } = useAuthContext();
  const searchParams = useSearchParams();
  const depto = searchParams.get('depto');

  return (
    <header
      className={`${depto === 'loja' ? 'bg-solar-blue-primary' : depto === 'naturovos' ? 'bg-solar-orange-prymary' : 'bg-solar-500'} px-2 flex items-center shadow-md z-40 relative`}
    >
      {user?.supervisor &&
        <div className="flex-none flex items-center justify-left mr-2">
          {/* <a> comum, nao next/link: o portal fica em "/", fora do basePath
          "/bi3" do bi3 - o Link prefixaria a rota incorretamente pra "/bi3/" */}
          <a
            href={APP_ROUTES.portal}
            className={`rounded-md px-1 py-1 flex items-center justify-center border-2 border-white shadow-md duration-300 ${depto === 'loja' ? 'bg-solar-green-prymary text-white' : depto === 'naturovos' ? 'bg-gray-800 text-white' : 'bg-black text-solar-500'}`}
          >
            <IoArrowBack />
          </a>
        </div>
      }
      <div className="container py-1 mx-auto flex items-center justify-between h-16">
        <div
          className={`flex items-center ${depto == 'loja' ? 'w-28' : depto == 'naturovos' ? 'w-24' : 'w-36'} p-0.5`}
        >
          {depto === 'loja' || depto === 'naturovos' ? (
            <Link href="/">
              <Image
                layout="responsive"
                src={`/bi3/logo/${depto === 'loja' ? 'logo_solar.png' : 'logo_naturovos.png'}`}
                width={120}
                height={40}
                alt={''}
              />
            </Link>
          ) : (
            // <a> comum: aqui a logo leva de volta ao portal (fora do bi3),
            // nao para a home do proprio bi3.
            <a href={APP_ROUTES.portal}>
              <Image
                layout="responsive"
                src="/bi3/logo/logo_grupo_black.png"
                width={120}
                height={40}
                alt={''}
              />
            </a>
          )}
        </div>
        <div>
          <Profile />
        </div>
      </div>
    </header>
  );
};

export default Header;
