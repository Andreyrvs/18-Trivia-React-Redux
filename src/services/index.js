const URL_TOKEN_API = 'https://opentdb.com/api_token.php?command=request';

export const fetchQuestionsAPI = async (token) => {
  try {
    console.log('tokenServices', token);
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log('Services ', data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchTokenAPI = async () => {
  try {
    const response = await fetch(URL_TOKEN_API);
    const data = await response.json();
    localStorage.setItem('token', JSON.stringify(data.token));
    return data.token;
  } catch (error) {
    console.log(error);
  }
};

export default fetchTokenAPI;
