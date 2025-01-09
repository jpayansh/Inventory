import axios from 'axios';

const ApiFunction = async ({ method = 'get', body = null, url }) => {
  try {
    var response = await axios({
      method,
      url: url,
      ...(method == 'post' ? { data: body } : { body }),
    });
    return response.data;
  } catch (error) {
    console.log('Something went wrong in the api function');
    console.log(error);
  }
};
export default ApiFunction;
