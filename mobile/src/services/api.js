import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.10:3333'//ip da máquina mais a porta em que está rodando o backend
});

export default api;