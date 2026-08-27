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
        className={`flex items-center justify-center md:my-0 my-2 ${!props.value ? 'w-8' : 'md:w-32 w-28 '} py-1 rounded md:text-sm text-[10px] text-center font-medium uppercase border transition-all duration-200 ease-out hover:bg-gray-800 hover:text-white hover:shadow-sm hover:-translate-y-0.5 active:scale-95 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-1 ${pathname === props.url ? 'bg-gray-800 border-white text-white' : 'border-gray-400 text-gray-500'}`}
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
