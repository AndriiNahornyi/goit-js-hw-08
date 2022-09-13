// Add imports above this line
import { galleryItems } from './gallery-items';
// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryEl = document.querySelector('.gallery');
const markupGallery = createGalleryItemsMarkup(galleryItems);
galleryEl.insertAdjacentHTML("beforeend", markupGallery);

// Listeners
galleryEl.addEventListener('click', targetClickHandler);

function targetClickHandler(event) {
    event.preventDefault();
}

let lightbox = new SimpleLightbox('.gallery a', { 
    captionsData:	'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
});
 
// 1. Create & render markup
function createGalleryItemsMarkup(items) {
    const galleryItemsMarkup = items.map(({ preview, original, description }) => `<a class="gallery__item" href='${original}'>
                <img class='gallery__image'
                    src='${preview}'
                    alt='${description}'
                />
            </a>`
    ).join('');
    console.log(galleryItemsMarkup);
    return galleryItemsMarkup;
}  
// Change code below this line


