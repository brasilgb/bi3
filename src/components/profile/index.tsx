'use client';
import { useAuthContext } from '@/contexts/AuthContext';
import { useSearchParams } from "next/navigation";
import { useState } from 'react';
import { IoExit, IoKey, IoPerson } from 'react-icons/io5';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const Profile = () => {
  const searchParams = useSearchParams();
  const depto = searchParams.get('depto');

  const { signOut, user } = useAuthContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen(old => !old);
  };
  const transClass = isOpen ? 'flex' : 'hidden';

  return (
    <>
      <div className="relative">
        <button
          className="flex items-center justify-between p-2 rounded-md hover:bg-black/10 transition-colors"
          onClick={toggle}
        >
          <div className={`${depto === 'naturovos' ? 'text-gray-800' : depto === 'loja' ? 'text-solar-gray-light' : 'text-black'}`}>
            <IoPerson size={20} />
          </div>
          <div className={`${depto === 'naturovos' ? 'text-gray-800' : depto === 'loja' ? 'text-solar-gray-light' : 'text-black'}`}>
            <MdOutlineKeyboardArrowDown
              size={20}
              className={`duration-300 ${isOpen ? '-rotate-180' : 'rotate-0'}`}
            />
          </div>
        </button>
        <div
          className={`absolute top-11 right-0 z-30 w-[350px] flex flex-col py-4 bg-gray-50 rounded-md shadow-lg border border-white ${transClass}`}
        >
          <span className="text-sm text-gray-600 px-4 pb-3 flex items-center ">
            <IoPerson color="#6d6a6a" size={20} />
            <span className="ml-1">{user?.userName}</span>
          </span>
          <span className="w-full border-b border-gray-200"></span>
          {/* <a> comum, nao next/link: changepassword fica em "/", fora do
          basePath "/bi3" do bi3 */}
          <a
            className="text-gray-600 hover:text-gray-400 px-4 pt-2 flex items-center"
            href={`/changepassword?firstAccess=false&code=${user?.userCode}`}
            onClick={() => setIsOpen(false)}
          >
            <IoKey color="#6d6a6a" size={20} />
            <span className="ml-1">Alterar minha senha</span>
          </a>
          <button
            className="text-gray-600 hover:text-gray-400 px-4 pt-2 flex items-center"
            onClick={signOut}
          >
            <IoExit color="#6d6a6a" size={20} />
            <span className="ml-1">Sair</span>
          </button>
        </div>
      </div>
      {isOpen ? (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 z-20 bg-black/5"
          onClick={toggle}
        ></div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Profile;
