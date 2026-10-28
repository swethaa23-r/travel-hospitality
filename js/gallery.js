/**
 * Stackly - Interactive Travel Gallery and Lightbox Script
 */

const GALLERY_DATA = [
  { id: 1, title: 'Uluwatu Sunset Clifftop', category: 'beaches', location: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80' },
  { id: 2, title: 'Matterhorn Alpine Reflections', category: 'alpine', location: 'Zermatt, Switzerland', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80' },
  { id: 3, title: 'Oia Whitewashed Caldera', category: 'beaches', location: 'Santorini, Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80' },
  { id: 4, title: 'Private Overwater Stilt Villa', category: 'resorts', location: 'Baa Atoll, Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80' },
  { id: 5, title: 'Torii Gates of Fushimi Inari', category: 'cultural', location: 'Kyoto, Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80' },
  { id: 6, title: 'Houseboat on Kumarakom Lagoons', category: 'beaches', location: 'Kerala, India', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80' },
  { id: 7, title: 'African Lion Pride on Savannah', category: 'wildlife', location: 'Serengeti, Tanzania', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80' },
  { id: 8, title: 'Positano Pastel Clifftops', category: 'resorts', location: 'Amalfi Coast, Italy', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80' },
  { id: 9, title: 'Alpine Glacial Lake Breeze', category: 'alpine', location: 'Lake Geneva, Switzerland', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80' },
  { id: 10, title: 'Sacred Monkey Forest Sanctuary', category: 'wildlife', location: 'Ubud, Bali', image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80' },
  { id: 11, title: 'Zen Meditation Temple Gardens', category: 'cultural', location: 'Kyoto, Japan', image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80' },
  { id: 12, title: 'Infinity Pool Facing the Caldera', category: 'resorts', location: 'Imerovigli, Greece', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80' }
];

document.addEventListener('DOMContentLoaded', () => {
  const galleryGrid = document.getElementById('galleryGrid');
  const filterButtons = document.querySelectorAll('.gallery-filter-btn');
  const lightboxModal = document.getElementById('galleryLightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxLocation = document.getElementById('lightboxLocation');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  let activeIndex = 0;
  let currentFilteredList = [...GALLERY_DATA];

  function renderGallery(filter = 'all') {
    if (!galleryGrid) return;

    if (filter === 'all') {
      currentFilteredList = [...GALLERY_DATA];
    } else {
      currentFilteredList = GALLERY_DATA.filter(item => item.category === filter);
    }

    galleryGrid.innerHTML = currentFilteredList.map((item, index) => `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="gallery-item-card position-relative rounded-4 overflow-hidden shadow-sm hover-lift" data-index="${index}" style="cursor: pointer; height: 280px;">
          <img src="${item.image}" alt="${item.title}" class="w-100 h-100" style="object-fit: cover; transition: transform 0.5s ease;" loading="lazy">
          <div class="gallery-item-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-3 text-white" style="background: linear-gradient(to top, rgba(18,59,82,0.85) 0%, transparent 60%);">
            <span class="badge bg-sunset-gold mb-1 align-self-start text-capitalize">${item.category}</span>
            <h5 class="text-white mb-0 fs-6">${item.title}</h5>
            <small class="text-white-50"><i class="fa-solid fa-location-dot me-1"></i> ${item.location}</small>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Filter Buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGallery(btn.dataset.filter);
    });
  });

  // Open Lightbox
  if (galleryGrid) {
    galleryGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.gallery-item-card');
      if (card && lightboxModal) {
        activeIndex = parseInt(card.dataset.index, 10);
        openLightbox();
      }
    });
  }

  function openLightbox() {
    if (!lightboxModal) return;
    const item = currentFilteredList[activeIndex];
    if (!item) return;

    lightboxImg.src = item.image;
    lightboxTitle.textContent = item.title;
    lightboxLocation.innerHTML = `<i class="fa-solid fa-location-dot me-1"></i> ${item.location}`;

    const modalInstance = new bootstrap.Modal(lightboxModal);
    modalInstance.show();
  }

  function showNext() {
    activeIndex = (activeIndex + 1) % currentFilteredList.length;
    const item = currentFilteredList[activeIndex];
    lightboxImg.src = item.image;
    lightboxTitle.textContent = item.title;
    lightboxLocation.innerHTML = `<i class="fa-solid fa-location-dot me-1"></i> ${item.location}`;
  }

  function showPrev() {
    activeIndex = (activeIndex - 1 + currentFilteredList.length) % currentFilteredList.length;
    const item = currentFilteredList[activeIndex];
    lightboxImg.src = item.image;
    lightboxTitle.textContent = item.title;
    lightboxLocation.innerHTML = `<i class="fa-solid fa-location-dot me-1"></i> ${item.location}`;
  }

  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  // Keyboard navigation for Lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('show')) return;
    if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    }
  });

  renderGallery();
});
