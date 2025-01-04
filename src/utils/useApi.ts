import axios from 'axios';

const ApiFunction = async ({ method = 'get', dataParems = null, endPoint }) => {
  try {
    var response = await axios({
      method,
      url: endPoint,
      ...(method == 'post' ? { data: dataParems } : { dataParems }),
    });
    return response.data;
  } catch (error) {
    console.log('Something went wrong in the api function');
    console.log(error);
  }
};
export default ApiFunction;
