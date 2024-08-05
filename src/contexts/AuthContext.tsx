'use client';
import birel from '@/services/birel';
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const AuthContext = createContext({} as any);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [dataFiltro, setDataFiltro] = useState(new Date());
  const [dataInicial, setDataInicial] = useState(new Date());
  const [dataFinal, setDataFinal] = useState(new Date());
  const [yearSelected, setYearSelected] = useState<any>(
    moment().format('YYYY')
  );
  const [yearExists, setYearExists] = useState(false);

  useEffect(() => {
    const getYearSelected = async () => {
      await birel
        .post(`(DRE_REL)`, {
          dreidenti: 4,
          dredepto: 0,
          drefilial: 0,
          dreano: yearSelected,
        })
        .then(response => {
          const { success, bidata } = response.data.bi057;
          const exists = bidata.some((val: any) => {
            return val.Ano == moment().format('YYYY');
          });
          if (!exists) {
            setYearExists(exists);
            setYearSelected(moment().add(-1, 'y').format('YYYY'));
            return;
          }
          setYearExists(exists);
          setYearSelected(moment().format('YYYY'));
        })
        .catch(error => {
          console.log(error);
        });
    };
    getYearSelected();
  }, []);

  useEffect(() => {
        const setStorage = () => {
            const userData = {
                "success": true,
                "userCode": 7023,
                "userName": "ANDERSON ROGERIO B RODRIGUES",
                "firstAccess": false,
                "admUser": 1,
                "userSAS": "ANDERSONR",
                "userSIG": "storage07",
                "connectionsAllowed": 2,
                "userKey": "21DFBF1A27A3B0CC3DDF95764BA97EDF750F840D12AEFADF1C5B153E0523EFFB484BC7623B29CDF7A387022675C1A4A6A9108BFF7B3E0B8D49220B04751B62F71A50EDFA3231C18671A78E2F6E8E124D",
                "granja": 0,
                "admGranja": false,
                "filial": 0,
                "gerente": false,
                "supervisor": true,
                "programs": [
                    {
                        "code": 2866,
                        "acesso": true
                    },
                    {
                        "code": 2868,
                        "acesso": true
                    },
                    {
                        "code": 2874,
                        "acesso": true
                    },
                    {
                        "code": 2878,
                        "acesso": true
                    },
                    {
                        "code": 2890,
                        "acesso": true
                    },
                    {
                        "code": 2928,
                        "acesso": true
                    },
                    {
                        "code": 2939,
                        "acesso": false
                    },
                    {
                        "code": 2945,
                        "acesso": true
                    },
                    {
                        "code": 2951,
                        "acesso": true
                    }
                ],
                "folders": [
                    {
                        "path": "bi3"
                    },
                    {
                        "path": "ecommerce"
                    },
                    {
                        "path": "gerencial"
                    },
                    {
                        "path": "assinatura"
                    }
                ]
            };
            setCookie('portal_access', JSON.stringify(userData));
        };
        setStorage();
    }, []);

  useEffect(() => {
    const cookieAccess = async () => {
      const recoveredUser = getCookie('portal_access');
      if (recoveredUser) {
        setUser(JSON.parse(recoveredUser));
      }
    };
    cookieAccess();
  }, []);

  const signOut = () => {
    deleteCookie('portal_access');
    setUser(null);
    router.push('http://portal.gruposolar.com.br/login');
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        signOut,
        dataFiltro,
        setDataFiltro,
        dataInicial,
        setDataInicial,
        dataFinal,
        setDataFinal,
        setYearSelected,
        yearSelected,
        yearExists,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);
