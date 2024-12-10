import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.getElementById('gallery');
const loadingIndicator = document.getElementById('loading');

let lightbox;

export function showLoading() {
  loadingIndicator.classList.remove('hidden');
}

export function hideLoading() {
  loadingIndicator.classList.add('hidden');
}

export function renderImages(images) {
  const markup = images.map(image => `
    <li>
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        <div class="info">
          <p><span>Likes:</span> <span class="value">${image.likes}</span></p>
          <p><span>Views:</span> <span class="value">${image.views}</span></p>
          <p><span>Comments:</span> <span class="value">${image.comments}</span></p>
          <p><span>Downloads:</span> <span class="value">${image.downloads}</span></p>
        </div>
      </a>
    </li>
  `).join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('#gallery a');
  } else {
    lightbox.refresh();
  }
}

export function showError(message) {
  iziToast.error({
    title: 'Error',
    message,
  });
}

export function clearGallery() {
  gallery.innerHTML = '';
}
