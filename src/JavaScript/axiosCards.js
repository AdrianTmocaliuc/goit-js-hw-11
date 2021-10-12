const axios = require('axios');
import config from '../config.json';

export const axLink = async (nameTags, pageCounter) => {
  const response = await axios.get(
    `${config.baseURL}?${config.keyAPI}&q=${nameTags}${config.descriptionAPI}&per_page=40&page=${pageCounter}`,
  );
  if (response.status >= 300) throw 'request Error';
  return response.data;
};
