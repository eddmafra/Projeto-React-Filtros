const planetAPI = async () => {
  const API = 'https://swapi.dev/api/planets';
  const response = await fetch(API);
  const data = await response.json();
  delete data.results.residents;
  return data.results;
};

export default planetAPI;
