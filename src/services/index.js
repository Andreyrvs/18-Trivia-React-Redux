const URL_TOKEN_API = 'https://opentdb.com/api_token.php?command=request';

export const fetchQuestionsAPI = async (url) => {
  const data = await (await fetch(url)).json();
  return data;
};

const fetchTokenAPI = async () => {
  const data = await (await fetch(URL_TOKEN_API)).json();
  return data;
};

export default fetchTokenAPI;
