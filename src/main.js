import axios from 'axios';

const API_KEY = 'f76345488f53f2b9e8869e03f28c0fec';
const BASE_URL = 'https://api.themoviedb.org/3';
const END_POINT = '/trending/movie/week';
const container = document.querySelector('.js-movie-list');
const guard = document.querySelector('.js-guard');
let page = 1;
const options = {
  root: null,
  rootMargin: '55px',
  threshold: 0,
};
const observer = new IntersectionObserver(handlerPagination, options);
function handlerPagination(entries, observer) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      page++;
      try {
        const data = await serviceMovie(page);

        container.insertAdjacentHTML('beforeend', createMarkup(data.results));
        if (data.page >= data.total_pages) {
          observer.unobserve(entry.target);
        }
      } catch {
        error => alert(error.message);
      }
      console.log('OOkk');
    }
  });
}

async function serviceMovie(page = 1) {
  const { data } = await axios(`${BASE_URL}${END_POINT}`, {
    params: {
      api_key: `${API_KEY}`,
      page,
    },
  });

  return data;
}
serviceMovie(page)
  .then(data => {
    container.insertAdjacentHTML('beforeend', createMarkup(data.results));
    if (data.page < data.total_pages) {
      observer.observe(guard);
    }
  })
  .catch(error => alert(error.message));
function createMarkup(arr) {
  return arr
    .map(
      ({ poster_path, release_date, original_title, vote_average }) =>
        `<li class="movie-card">
      <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}">
      <div class="movie-info">
      <h2>${original_title}</h2>
      <p>Release date: ${release_date}</p>
      <p>Vote average: ${vote_average}</p></div></li>`
    )
    .join('');
}

// var callback = function (entries, observer) {
//   /* Content excerpted, show below */
// };

//----------------------------------------------------
// const loadMore = document.querySelector('.js-load-more');
// let page = 1;
// loadMore.addEventListener('click', onLoadMore);
// async function onLoadMore() {
//   page++;
//   loadMore.disabled = true;
//   try {
//     const data = await serviceMovie(page);
//     if (data.page >= data.total_pages) {
//       loadMore.classList.replace('load-more', 'load-more-hidden');
//     }
//     console.log(data);

//     container.insertAdjacentHTML('beforeend', createMarkup(data.results));
//   } catch {
//     error => alert(error.message);
//   } finally {
//     loadMore.disabled = false;
//   }
// }
// async function serviceMovie(page = 1) {
//   const { data } = await axios(`${BASE_URL}${END_POINT}`, {
//     params: {
//       api_key: `${API_KEY}`,
//       page,
//     },
//   });

//   return data;
// }
// serviceMovie(page)
//   .then(data => {
//     container.insertAdjacentHTML('beforeend', createMarkup(data.results));
//     if (data.page < data.total_pages) {
//       loadMore.classList.replace('load-more-hidden', 'load-more');
//     }
//     console.log(data);
//   })
//   .catch(error => alert(error.message));

// function createMarkup(arr) {
//   return arr
//     .map(
//       ({ poster_path, release_date, original_title, vote_average }) =>
//         `<li class="movie-card">
//       <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}">
//       <div class="movie-info">
//       <h2>${original_title}</h2>
//       <p>Release date: ${release_date}</p>
//       <p>Vote average: ${vote_average}</p></div></li>`
//     )
//     .join('');
// }
