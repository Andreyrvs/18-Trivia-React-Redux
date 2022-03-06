const URL_TOKEN_API = 'https://opentdb.com/api_token.php?command=request';

export const fetchQuestionsAPI = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await response.json();
  // console.log('literals', `https://opentdb.com/api.php?amount=5&token=${token}`);
  // console.log('fetchQuestionsAPI', data);
  return data;
  // try {
  //   console.log('token', token);
  //   const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   // console.log('fetchQuestionsAPI', data);
  //   return data;
  // } catch (error) {
  //   console.log(error);
  // }
};

const fetchTokenAPI = async () => {
  try {
    const response = await fetch(URL_TOKEN_API);
    const data = await response.json();
    // console.log('fetchTokenAPI', data);
    return data.token;
  } catch (error) {
    console.log(error);
  }
};

export default fetchTokenAPI;
