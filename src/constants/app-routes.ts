export const APP_ROUTES = {
  private: {
    home: {
      name: '/',
    },
  },
  public: {
    // Relativo (nao hardcoded pro dominio de producao) - o bi3 e o portal
    // ficam sempre na MESMA origem via Nginx (path /bi3), entao isso funciona
    // em qualquer ambiente (local, staging, producao) sem precisar trocar.
    // Use com `window.location.href` / <a>, nao com o router do Next: como o
    // bi3 tem basePath "/bi3", o router prefixaria isso para "/bi3/login".
    login: '/login',
  },
  // idem: portal principal fica na raiz "/", fora do basePath do bi3.
  portal: '/',
};
