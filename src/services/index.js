const URL_API = 'https://opentdb.com/api_token.php?command=request';

const fetchAPI = async () => {
  const data = await (await fetch(URL_API)).json();

  return data;
};

export default fetchAPI;
