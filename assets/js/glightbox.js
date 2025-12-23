(function () {
  var activeLightbox = null;
  var galleryMap = {};

  function createLightbox() {
    var layer = document.createElement('div');
    layer.className = 'glightbox-layer';
    layer.innerHTML = '
      <div class="glightbox-content" role="dialog" aria-modal="true">
        <div class="glightbox-media">
          <img src="" alt="">
          <button class="glightbox-close" aria-label="關閉">×</button>
          <button class="glightbox-prev" aria-label="上一張">‹</button>
          <button class="glightbox-next" aria-label="下一張">›</button>
        </div>
        <div class="glightbox-caption" aria-live="polite"></div>
      </div>';
    document.body.appendChild(layer);
    return layer;
  }

  function openLightbox(link, galleryId) {
    if (!activeLightbox) activeLightbox = createLightbox();

    var media = activeLightbox.querySelector('.glightbox-media img');
    var caption = activeLightbox.querySelector('.glightbox-caption');
    var closeBtn = activeLightbox.querySelector('.glightbox-close');
    var prevBtn = activeLightbox.querySelector('.glightbox-prev');
    var nextBtn = activeLightbox.querySelector('.glightbox-next');

    var slides = galleryMap[galleryId] || [];
    var index = slides.indexOf(link);
    if (index === -1) {
      slides.push(link);
      galleryMap[galleryId] = slides;
      index = slides.length - 1;
    }

    function showSlide(idx) {
      var target = slides[idx];
      if (!target) return;
      var title = target.getAttribute('data-title') || target.querySelector('img')?.alt || '';
      media.src = target.href;
      media.alt = title;
      caption.textContent = title;
      activeLightbox.dataset.index = idx;
      activeLightbox.dataset.gallery = galleryId;
      document.body.classList.add('glightbox-open');
      activeLightbox.classList.add('is-visible');
    }

    function closeLightbox() {
      activeLightbox.classList.remove('is-visible');
      document.body.classList.remove('glightbox-open');
      document.removeEventListener('keydown', onKey);
      activeLightbox.removeEventListener('pointerdown', onTouchStart);
      activeLightbox.removeEventListener('pointerup', onTouchEnd);
    }

    function nextSlide(step) {
      var total = slides.length;
      var current = Number(activeLightbox.dataset.index || 0);
      var next = (current + step + total) % total;
      showSlide(next);
    }

    closeBtn.onclick = closeLightbox;
    prevBtn.onclick = function () { nextSlide(-1); };
    nextBtn.onclick = function () { nextSlide(1); };

    activeLightbox.onclick = function (e) {
      if (e.target === activeLightbox) closeLightbox();
    };

    function onKey(e) {
      if (!activeLightbox.classList.contains('is-visible')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') nextSlide(-1);
      if (e.key === 'ArrowRight') nextSlide(1);
    }

    document.addEventListener('keydown', onKey);

    // Basic swipe support
    var startX = null;
    var threshold = 40;
    function onTouchStart(e) {
      startX = e.touches ? e.touches[0].clientX : e.clientX;
    }
    function onTouchEnd(e) {
      if (startX === null) return;
      var endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      var deltaX = endX - startX;
      if (Math.abs(deltaX) > threshold) {
        nextSlide(deltaX > 0 ? -1 : 1);
      }
      startX = null;
    }

    activeLightbox.addEventListener('pointerdown', onTouchStart);
    activeLightbox.addEventListener('pointerup', onTouchEnd);

    showSlide(index);
  }

  function setupLightboxes() {
    var links = document.querySelectorAll('.gallery-lightbox');
    links.forEach(function (link) {
      var galleryId = link.getAttribute('data-gallery') || 'gallery';
      if (!galleryMap[galleryId]) galleryMap[galleryId] = [];
      galleryMap[galleryId].push(link);

      link.addEventListener('click', function (e) {
        e.preventDefault();
        openLightbox(link, galleryId);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', setupLightboxes);
})();
