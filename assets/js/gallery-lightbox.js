document.addEventListener('DOMContentLoaded', function () {
  var tablist = document.querySelector('.gallery-tablist');
  var galleryLinks = Array.prototype.slice.call(document.querySelectorAll('.gallery-grid a[data-gallery]'));

  if (!tablist && !galleryLinks.length) return;

  /* Tabs */
  if (tablist) {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.gallery-tab'));
    var panels = Array.prototype.slice.call(document.querySelectorAll('.gallery-panel'));

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-target');

        tabs.forEach(function (button) {
          var isActive = button === tab;
          button.classList.toggle('is-active', isActive);
          button.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        panels.forEach(function (panel) {
          var isMatch = panel.id === 'gallery-' + target;
          panel.classList.toggle('is-active', isMatch);
          if (isMatch) {
            panel.removeAttribute('hidden');
          } else {
            panel.setAttribute('hidden', 'hidden');
          }
        });
      });
    });
  }

  if (!galleryLinks.length) return;

  var lightboxState = {
    group: null,
    index: 0,
    items: {}
  };

  var overlay = document.createElement('div');
  overlay.className = 'gallery-lightbox';
  overlay.setAttribute('aria-hidden', 'true');

  overlay.innerHTML = '' +
    '<div class="gallery-lightbox__dialog" role="dialog" aria-modal="true" aria-label="相簿燈箱">' +
      '<button class="gallery-lightbox__close" type="button" aria-label="關閉燈箱">&times;</button>' +
      '<button class="gallery-lightbox__nav gallery-lightbox__prev" type="button" aria-label="上一張">&#10094;</button>' +
      '<figure class="gallery-lightbox__figure">' +
        '<img class="gallery-lightbox__image" alt="">' +
        '<figcaption class="gallery-lightbox__caption" aria-live="polite"></figcaption>' +
      '</figure>' +
      '<button class="gallery-lightbox__nav gallery-lightbox__next" type="button" aria-label="下一張">&#10095;</button>' +
    '</div>';

  var imageEl, captionEl;

  function cacheElements() {
    imageEl = overlay.querySelector('.gallery-lightbox__image');
    captionEl = overlay.querySelector('.gallery-lightbox__caption');
  }

  cacheElements();
  document.body.appendChild(overlay);

  function buildItems() {
    galleryLinks.forEach(function (link) {
      var galleryId = link.getAttribute('data-gallery') || 'gallery';
      var image = link.querySelector('img');
      var caption = link.getAttribute('data-title') || (image && image.getAttribute('alt')) || '';
      var item = {
        src: link.getAttribute('href'),
        caption: caption,
        trigger: link
      };

      if (!lightboxState.items[galleryId]) {
        lightboxState.items[galleryId] = [];
      }

      item.index = lightboxState.items[galleryId].length;
      lightboxState.items[galleryId].push(item);

      link.dataset.galleryIndex = item.index;
      link.addEventListener('click', function (event) {
        event.preventDefault();
        openLightbox(galleryId, item.index);
      });
    });
  }

  function openLightbox(group, index) {
    lightboxState.group = group;
    lightboxState.index = index || 0;
    renderSlide();
    overlay.classList.add('is-active');
    document.body.classList.add('is-lightbox-open');
    overlay.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    overlay.classList.remove('is-active');
    document.body.classList.remove('is-lightbox-open');
    overlay.setAttribute('aria-hidden', 'true');
  }

  function renderSlide() {
    var items = lightboxState.items[lightboxState.group] || [];
    if (!items.length) return;

    if (lightboxState.index < 0) {
      lightboxState.index = items.length - 1;
    } else if (lightboxState.index >= items.length) {
      lightboxState.index = 0;
    }

    var current = items[lightboxState.index];
    if (!current) return;

    imageEl.src = current.src;
    imageEl.alt = current.caption || '相簿照片';
    captionEl.textContent = current.caption || '';
    captionEl.style.display = current.caption ? 'inline-block' : 'none';
  }

  function showNext() {
    lightboxState.index += 1;
    renderSlide();
  }

  function showPrev() {
    lightboxState.index -= 1;
    renderSlide();
  }

  function handleKeydown(event) {
    if (!overlay.classList.contains('is-active')) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeLightbox();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNext();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPrev();
    }
  }

  function setupTouchNavigation() {
    var startX = 0;
    overlay.addEventListener('touchstart', function (event) {
      if (!overlay.classList.contains('is-active')) return;
      startX = event.changedTouches[0].clientX;
    });

    overlay.addEventListener('touchend', function (event) {
      if (!overlay.classList.contains('is-active')) return;
      var deltaX = event.changedTouches[0].clientX - startX;
      if (Math.abs(deltaX) > 40) {
        if (deltaX > 0) {
          showPrev();
        } else {
          showNext();
        }
      }
    });
  }

  buildItems();
  setupTouchNavigation();

  overlay.addEventListener('click', function (event) {
    if (event.target === overlay) {
      closeLightbox();
    }
  });

  overlay.querySelector('.gallery-lightbox__close').addEventListener('click', closeLightbox);
  overlay.querySelector('.gallery-lightbox__next').addEventListener('click', showNext);
  overlay.querySelector('.gallery-lightbox__prev').addEventListener('click', showPrev);
  document.addEventListener('keydown', handleKeydown);
});
