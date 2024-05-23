'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
interface LinkMenuProps {
  title?: string;
  value?: string;
  icon?: any;
  url: string;
  depto: string;
}

const NLinkMenu = (props: LinkMenuProps) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        className={`flex items-center justify-center md:my-0 my-2 ${!props.value ? 'w-8' : 'md:w-32 w-28 '} py-1 rounded md:text-sm text-[10px] text-center font-medium uppercase border hover:bg-gray-800 hover:text-white duration-300 ${pathname === props.url ? 'bg-gray-800 border-white text-white' : 'border-gray-400 text-gray-500'}`}
        href={{
          pathname: `${props.url}`,
          query: { depto: `${props.depto}` },
        }}
        title={props.title}
      >
        <span className="md:text-xl text-base">{props.icon}</span>
        <span>{props.value}</span>
      </Link>
    </li>
  );
};

export default NLinkMenu;
