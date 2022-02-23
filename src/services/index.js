const URL_TOKEN_API = 'https://opentdb.com/api_token.php?command=request';

export const fetchQuestionsAPI = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchTokenAPI = async () => {
  try {
    const response = await fetch(URL_TOKEN_API);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchTokenAPI;
