import moment from 'moment';
import { usePathname, useSearchParams } from "next/navigation";
import React from 'react';

const Footer = () => {
  const searchParams = useSearchParams();
  const depto = searchParams.get('depto');

  return (
    <div className={`flex items-center justify-center py-0.5 ${depto === 'naturovos' ? 'bg-solar-orange-prymary text-gray-800' : depto === 'loja' ? 'bg-solar-blue-primary text-solar-gray-light' : 'bg-solar-blue-secundary text-solar-gray-light'}`}>
      <p className="md:text-xs text-[8px]">
        &copy; {moment().format('YYYY')} Solar Comércio e Agroindústria Ltda.
      </p>
    </div>
  );
};

export default Footer;
