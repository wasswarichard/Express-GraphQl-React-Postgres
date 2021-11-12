import axios from 'axios';

const api = axios.create({
   baseURL: 'http://localhost:5000',
});

export const getTransactions = () => {
   return api.get('/api/blocks').then((response) => response.data);
};

export const getTransactionDetails = (id: string) => {
   return api.get(`/api/block/${id}`).then((res) => res.data);
};
