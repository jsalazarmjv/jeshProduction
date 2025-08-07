// get current year
(function () {
    var year = new Date().getFullYear();
    document.querySelector("#currentYear").innerHTML = year;
})();

// Carousel code
// Global state
let currentAlbum = '';
let currentIndex = 1;
let maxImages = 1;

// Album data with folder keys, image count, and prefix for images
const albums = {
  "GalleryBDays": {count: 30, prefix: "Bday"},
  "GalleryConcert": {count: 25, prefix: "Concerts"},
  "GalleryCorp": {count: 17, prefix: "Corp"},
  "GalleryFamily": {count: 18, prefix: "Family"},
  "GalleryGrad": {count: 18, prefix: "Grads"},
  "GalleryIndoor": {count: 21, prefix: "Indoor"},
  "GalleryOutdoor": {count: 26, prefix: "Outdoor"},
  "GalleryRealState": {count: 10, prefix: "RealState"},
  "GalleryWed": {count: 19, prefix: "Wedding"}
};

// Open carousel and load first image
function openCarousel(albumName) {
  if (!albums[albumName]) {
    console.error("Album not found:", albumName);
    return;
  }
  currentAlbum = albumName;
  currentIndex = 1;
  maxImages = albums[albumName].count;

  document.getElementById("carouselOverlay").style.display = "flex";
  updateCarouselImages();
}

// Close carousel overlay
function closeCarousel(event) {
  // Close if clicked outside the container or on the close button
  if (
    event.target.id === 'carouselOverlay' ||
    event.target.classList.contains('close-btn') ||
    event.target.closest('.close-btn')
  ) {
    document.getElementById('carouselOverlay').style.display = 'none';
  }
}


// Update main and nav images based on current index and album
function updateCarouselImages() {
  const album = albums[currentAlbum];
  if (!album) return;

  const basePath = `images/${currentAlbum}/`;
  const ext = ".avif";

  // Helper to get image path safely within range
  function imgPath(index) {
    // Clamp index between 1 and maxImages
    if (index < 1) index = maxImages;
    if (index > maxImages) index = 1;
    return `${basePath}${album.prefix}-${index}${ext}`;
  }

  // Main image
  const mainImage = document.getElementById("mainImage");
  mainImage.src = imgPath(currentIndex);
  mainImage.alt = `${currentAlbum} Image ${currentIndex}`;

  // Prev and next thumbnail images
  const prevThumb = document.getElementById("prevThumb");
  prevThumb.src = imgPath(currentIndex - 1);
  prevThumb.alt = `Previous ${currentAlbum} Image`;

  const nextThumb = document.getElementById("nextThumb");
  nextThumb.src = imgPath(currentIndex + 1);
  nextThumb.alt = `Next ${currentAlbum} Image`;
}

// Navigate to previous image
function prevImage(event) {
  event.stopPropagation();
  currentIndex = currentIndex - 1 < 1 ? maxImages : currentIndex - 1;
  updateCarouselImages();
}

// Navigate to next image
function nextImage(event) {
  event.stopPropagation();
  currentIndex = currentIndex + 1 > maxImages ? 1 : currentIndex + 1;
  updateCarouselImages();
}
