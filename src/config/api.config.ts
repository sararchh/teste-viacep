export const apiConfig = {
  baseUrl: 'https://viacep.com.br/ws',
  routes: {
     ceps: {
        listOne: (cep: string) => `/${cep}/json/`,
     },
  },
};
