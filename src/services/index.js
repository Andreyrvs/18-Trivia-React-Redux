const URL_TOKEN_API = 'https://opentdb.com/api_token.php?command=request';

const fetchAPI = async (token) => {
  const URL_API = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const data = await (await fetch(URL_API)).json();
  return data;
};

const fetchTokenAPI = async () => {
  const data = await (await fetch(URL_TOKEN_API)).json();
  const { token } = data;
  // console.log(fetchAPI(token));

  return fetchAPI(token);
};
fetchTokenAPI();
export default fetchTokenAPI;
