import axios from 'axios';

let BASE_URL = '';

let requestCustom: any;
let data: any;

const birel = axios.create({
  withCredentials: true,
});

birel.interceptors.request.use(async request => {
  request.baseURL = `https://services.gruposolar.com.br:8086/servicesgruposolar/servlet/isCobol`;
  BASE_URL = `https://services.gruposolar.com.br:8086/servicesgruposolar/servlet/isCobol`;
  // request.baseURL = `http://172.16.1.67:9090/servicesgruposolar/servlet/isCobol`;
  // BASE_URL = `http://172.16.1.67:9090/servicesgruposolar/servlet/isCobol`;

  requestCustom = request;
  data = request.data;
  return request;
});

birel.interceptors.response.use(
  response => response,
  async _error => {
    console.log('Abrindo sessão com o servidor novamente');

    const axiosNew = axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
    });

    let session = await axiosNew
      .get('(biRelatoriosApp)')
      .then(resp => resp)
      .catch(_err => {
        return {
          status: 404,
          success: false,
          message: 'Não foi possível conectar ao servidor',
        };
      });

    if (session.status !== 200) {
      session = {
        status: 404,
        success: false,
        message: 'Não foi possível conectar ao servidor',
      };

      return session;
    }

    console.log('Refazendo a chamada original...');
    let originalResponse;
    if (requestCustom.method === 'POST' || requestCustom.method === 'post') {
      originalResponse = await birel.post(`${requestCustom.url}`, data);
    } else {
      originalResponse = await birel.get(`${requestCustom.url}`);
    }
    if (originalResponse.status !== 200) {
      session = {
        status: 404,
        success: false,
        message: 'Não foi possível conectar ao servidor',
      };
      return session;
    }
    return originalResponse;
  }
);

export default birel;