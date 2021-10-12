const axios = require('axios');
import config from '../config.json';
import Notiflix from 'notiflix';

export const axLink = async (nameTags, pageCounter) => {
  // console.log(nameTags, pageCounter);
  const response = await axios.get(
    `${config.baseURL}?${config.keyAPI}&q=${nameTags}${config.descriptionAPI}&per_page=40&page=${pageCounter}`,
  );
  if (response.status >= 300) throw 'request Error';
  // Notiflix.Notify.failure(
  //   'Sorry, there are no images matching your search query. Please try again.',
  // );
  return response.data;
};
// export const axImages = async nameTag => {
//   const data = await axios.get(
//     `${config.baseURL}?${config.keyAPI}&q=${name}${config.descriptionAPI}`,
//   );
//   if (data.status >= 200 && data.status < 300) {
//     return data;
//   }
//   if (data.status === 404) {
//     return Notiflix.Notify.info(
//       'Sorry, there are no images matching your search query. Please try again.',
//     );
//   }
//   throw new Error('Trouble');
// };
// export const fetchCountries = name => {
//   return fetch(`${config.baseURL}?${config.keyAPI}&q=${name}${config.descriptionAPI}`).then(
//     response => {
//       if (response.status >= 200 && response.status < 300) {
//         return response.json();
//       }
//       Notiflix.Notify.failure('Oops, there is no country with that name');
//       // throw new Error('Trouble');
//       return Promise.reject('Trouble');
//     },
//   );
//   // .catch(err => console.log(err));
// };
//pixabay.com/api/?key=23808150-51820317ad7670f55f1a98c8b&q=yellow+flowers&image_type=photo&pretty=true

// console.log(axios(`${config.baseURL}?${config.keyAPI}`));

// export const axiosChards = name => {
//   return axios({
//     method: 'get',
//     url: 'pixabay.com/api/?key=23808150-51820317ad7670f55f1a98c8b&q=yellow+flowers&image_type=photo&pretty=true',
//     responseType: 'stream',
//   }).then(function (response) {
//     response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'));
//   });
// };
