const IMAGES = [
  { id: 1,  file: "gletscher.jpg",         title: "Gletscher" },
  { id: 2,  file: "anime-stadt-nacht.jpg", title: "Anime-Stadt bei Nacht" },
  { id: 3,  file: "gewitterwolken.png",    title: "Gewitterwolken" },
  { id: 4,  file: "blaumeise.jpg",         title: "Blaumeise" },
  { id: 5,  file: "hurrikan.jpg",          title: "Hurrikan" },
  { id: 6,  file: "bergsee-winter.jpg",    title: "Bergsee im Winter" },
  { id: 7,  file: "ente-wasser.jpg",       title: "Ente im Wasser" },
  { id: 8,  file: "mann-nacht-meer.jpg",   title: "Mann am Meer bei Nacht" },
  { id: 9,  file: "schneammer-fels.jpg",   title: "Schneeammer auf Fels" },
  { id: 10, file: "schneeleoparden.jpg",   title: "Schneeleoparden" },
  { id: 11, file: "bergpanorama.jpg",      title: "Bergpanorama" },
  { id: 12, file: "schneebaum.jpg",        title: "Schneebedeckter Baum" }
];

const GALLERY = document.getElementById("gallery");

function init() {
  renderGallery();
}

function renderGallery() {
  GALLERY.innerHTML = "";
  for (let i = 0; i < IMAGES.length; i++) {
    GALLERY.innerHTML += renderThumbnail(i);
  }
}

function renderThumbnail(index) {
  const image = IMAGES[index];
  return `
    <button class="thumbnail-button"
            onclick="openOverlay(${index})"
            aria-label="${image.title} öffnen">
      <img src="assets/img/${image.file}"
           alt="${image.title}"
           class="thumbnail"
           loading="lazy">
    </button>
  `;
}

const OVERLAY = document.getElementById("overlay");
let currentIndex = 0;

function openOverlay(index) {
  currentIndex = index;
  OVERLAY.innerHTML = renderOverlay(currentIndex);
  OVERLAY.showModal();
}

function renderOverlay(index) {
  const image = IMAGES[index];
  return `
    <header class="overlay-header">
      <span class="overlay-title">${image.title}</span>
      <button class="overlay-close" onclick="closeOverlay()" aria-label="Schließen">&times;</button>
    </header>
    <img src="assets/img/${image.file}"
         alt="${image.title}"
         class="overlay-image">
  `;
}

function closeOverlay() {
  OVERLAY.close();
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % IMAGES.length;
  OVERLAY.innerHTML = renderOverlay(currentIndex);
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + IMAGES.length) % IMAGES.length;
  OVERLAY.innerHTML = renderOverlay(currentIndex);
}

function renderOverlay(index) {
  const image = IMAGES[index];
  return `
    <header class="overlay-header">
      <span class="overlay-title">${image.title}</span>
      <button class="overlay-close" onclick="closeOverlay()" aria-label="Schließen">&times;</button>
    </header>
    <img src="assets/img/${image.file}"
         alt="${image.title}"
         class="overlay-image">
    <footer class="overlay-footer">
      <button class="overlay-nav overlay-prev"
              onclick="showPrevImage()"
              aria-label="Vorheriges Bild">&larr;</button>
      <span class="overlay-counter">${index + 1}/${IMAGES.length}</span>
      <button class="overlay-nav overlay-next"
              onclick="showNextImage()"
              aria-label="Nächstes Bild">&rarr;</button>
    </footer>
  `;
}
