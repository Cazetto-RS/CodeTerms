import axios from 'axios';

const POSSIBLE_URLS = [
  'http://localhost:3000',
  'http://10.0.2.2:3000', 
  'http://192.168.0.103:3000'
];

const getActiveRoute = async () => {
    for (const url of POSSIBLE_URLS) {
        try {
            await axios.get(`${url}/terms`, { timeout: 1000 });
            console.log(`API ativa encontrada em: ${url}`);
            return url;
        } catch (e) {
            console.log(`API não encontrada em: ${url}`);
        }
        return null;
    }
}

const api = axios.create({
  baseURL: 'http://192.168.0.103:3000', // Ou seu IP
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export const initApi = async () => {
    const bestUrl = await getActiveRoute();
    if (bestUrl) {
        api.defaults.baseURL = bestUrl;
    } else {
        console.error('Nenhuma API ativa encontrada. Verifique as URLs possíveis.');
    }
}

export default api;