import './sass/main.scss';
import config from './config.json';
import { axLink } from './JavaScript/axiosCards';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const name = 'dog';
console.log(`${config.baseURL}?${config.keyAPI}&q=${name}${config.descriptionAPI}`);

const refs = {
  perPage: 40,
  searchForm: document.querySelector('#search-form'),
  textInput: document.querySelector('#search-form input'),
  submitButton: document.querySelector('#search-form button'),
  gallerycards: document.querySelector('.gallery'),
  lodMoreBtn: document.querySelector('.load-more'),
};

refs.lodMoreBtn.classList.toggle('hide');

// style = 'background-image: url(${webformatURL})';
// <img src="${webformatURL}"
// alt="${tags}" loading="lazy" />
const rander = arrcards => {
  const markUp = arrcards
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      let listOFCards = `
    <div class="photo-card">
        <div class='card-image' >
          <a class="gallery__link"  href=${largeImageURL}>
          <div class='large-image' style='background-image: url(${webformatURL})'
          alt="${tags}" loading="lazy" >
          </div>
           </a>
        </div>
        <div class="info">
            <p class="info-item">
                <b>Likes</b>
                ${likes}
            </p>
            <p class="info-item">
                <b>Views</b>
                ${views}
            </p>
            <p class="info-item">
                <b>Comments</b>
                ${comments}
            </p>
            <p class="info-item">
                <b>Downloads</b>
                ${downloads}
            </p>
        </div>
    </div>
    `;
      return listOFCards;
    })
    .join('');

  refs.gallerycards.insertAdjacentHTML('beforeend', markUp);

  lightbox.refresh();
};
const lightbox = new SimpleLightbox('.gallery a', {
  // captionsData: 'alt',
  // captionDelay: 1000,
});

let page = 1;
refs.searchForm.addEventListener('submit', async e => {
  e.preventDefault();

  page = 1;
  const { hits, totalHits } = await axLink(refs.textInput.value, page);

  if (!(hits.length === 0)) refs.gallerycards.innerHTML = '';
  rander(hits, totalHits);

  if (hits.length < totalHits && hits.length >= 0) refs.lodMoreBtn.classList.toggle('hide');
  if (hits.length > 0) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  } else {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  }
  // console.log(totalHits);

  // console.log(hits);
});
// const perPage = 40;
refs.lodMoreBtn.addEventListener('click', async () => {
  page++;
  const { hits, totalHits } = await axLink(refs.textInput.value, page);
  rander(hits, totalHits);
  if (hits.length < refs.perPage) {
    Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);
    refs.lodMoreBtn.classList.toggle('hide');
  }
  console.log(document.querySelectorAll('.photo-card').length);
});

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });

// console.log(cardHeight);
