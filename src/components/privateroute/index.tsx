'use client';
import React, { ReactNode, useEffect, useState } from 'react';

import { checkUserAuthenticated } from '@/functions/check-user-authenticated';
import { APP_ROUTES } from '@/constants/app-routes';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  // Começa como `null` (nem autenticado, nem não-autenticado) para que a
  // primeira renderização no cliente seja idêntica à do servidor — o cookie
  // só pode ser lido depois de montar, dentro do useEffect. Decidir isso
  // direto no corpo do componente é o que causava o erro de hidratação
  // (servidor sempre renderiza sem <Header>, cliente já renderizava com
  // ele quando o cookie de sessão já existia no navegador).
  const [isUserAutenticated, setIsUserAutenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authenticated = !!checkUserAuthenticated();
    setIsUserAutenticated(authenticated);
    if (!authenticated) {
      // window.location, nao o router do Next: o login fica em "/", fora do
      // basePath "/bi3" do bi3 - o router prefixaria a rota incorretamente.
      window.location.href = APP_ROUTES.public.login;
    }
  }, []);

  if (isUserAutenticated === null) return null;

  return <>{isUserAutenticated && children}</>;
};

export default PrivateRoute;
