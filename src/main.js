import { fetchImages } from './js/pixabay-api.js';
import { showLoading, hideLoading, renderImages, showError, clearGallery } from './js/render-functions.js';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const loadMoreBtn = document.createElement('button');
loadMoreBtn.textContent = 'Load more';
loadMoreBtn.classList.add('hidden', 'load-more');
document.querySelector('.container').appendChild(loadMoreBtn);

let currentPage = 1;
const perPage = 15;
let currentQuery = '';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  currentQuery = input.value.trim();

  if (!currentQuery) {
    showError('Please enter a search term.');
    return;
  }

  clearGallery();
  currentPage = 1;
  showLoading();

  try {
    const data = await fetchImages(currentQuery, currentPage, perPage);
    if (data.hits.length === 0) {
      showError('Sorry, there are no images matching your search query. Please try again!');
    } else {
      renderImages(data.hits);
      loadMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
    showError('An error occurred while fetching images.');
  } finally {
    hideLoading();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoading();

  try {
    const data = await fetchImages(currentQuery, currentPage, perPage);
    if (data.hits.length === 0) {
      loadMoreBtn.classList.add('hidden');
      showError("We're sorry, but you've reached the end of search results.");
    } else {
      renderImages(data.hits);
      smoothScroll();
    }
  } catch (error) {
    showError('An error occurred while fetching more images.');
  } finally {
    hideLoading();
  }
});

function smoothScroll() {
  const cardHeight = document.querySelector('.gallery li').getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
