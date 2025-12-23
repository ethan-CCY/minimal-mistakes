document.addEventListener("DOMContentLoaded", function () {
  var galleryLinks = Array.prototype.slice.call(
    document.querySelectorAll(".gallery-grid .gallery-lightbox")
  );

  if (!galleryLinks.length) return;

  var galleryGroups = {};
  galleryLinks.forEach(function (link) {
    var groupId = link.getAttribute("data-gallery") || "gallery";
    if (!galleryGroups[groupId]) {
      galleryGroups[groupId] = [];
    }
    galleryGroups[groupId].push(link);
  });

  var overlay = document.createElement("div");
  overlay.className = "album-lightbox";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.innerHTML = `
    <div class="album-lightbox__frame">
      <button class="album-lightbox__nav album-lightbox__nav--prev" aria-label="上一張">‹</button>
      <img class="album-lightbox__image" alt="">
      <button class="album-lightbox__nav album-lightbox__nav--next" aria-label="下一張">›</button>
      <button class="album-lightbox__close" aria-label="關閉">✕</button>
    </div>
    <div class="album-lightbox__caption" aria-live="polite"></div>
  `;

  document.body.appendChild(overlay);

  var imageEl = overlay.querySelector(".album-lightbox__image");
  var captionEl = overlay.querySelector(".album-lightbox__caption");
  var closeBtn = overlay.querySelector(".album-lightbox__close");
  var prevBtn = overlay.querySelector(".album-lightbox__nav--prev");
  var nextBtn = overlay.querySelector(".album-lightbox__nav--next");

  var activeGroup = [];
  var activeIndex = 0;
  var touchStartX = 0;
  var touchStartY = 0;

  function buildCaption(link) {
    var caption = link.getAttribute("data-title") || "";
    if (!caption) {
      var img = link.querySelector("img");
      caption = img ? img.getAttribute("alt") || "" : "";
    }
    return caption;
  }

  function openLightbox(link) {
    var groupId = link.getAttribute("data-gallery") || "gallery";
    activeGroup = galleryGroups[groupId] || [link];
    activeIndex = activeGroup.indexOf(link);
    if (activeIndex < 0) activeIndex = 0;
    showImage(activeIndex);
    overlay.classList.add("is-active");
    document.documentElement.classList.add("no-scroll");
  }

  function closeLightbox() {
    overlay.classList.remove("is-active");
    document.documentElement.classList.remove("no-scroll");
  }

  function showImage(index) {
    if (!activeGroup.length) return;
    activeIndex = (index + activeGroup.length) % activeGroup.length;
    var link = activeGroup[activeIndex];
    imageEl.src = link.getAttribute("href");
    var innerImg = link.querySelector("img");
    imageEl.alt = (innerImg && innerImg.getAttribute("alt")) || "";
    captionEl.textContent = buildCaption(link);
  }

  function handleKey(event) {
    if (!overlay.classList.contains("is-active")) return;
    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowRight") {
      showImage(activeIndex + 1);
    } else if (event.key === "ArrowLeft") {
      showImage(activeIndex - 1);
    }
  }

  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      closeLightbox();
    }
  });

  closeBtn.addEventListener("click", function (event) {
    event.preventDefault();
    closeLightbox();
  });

  prevBtn.addEventListener("click", function (event) {
    event.preventDefault();
    showImage(activeIndex - 1);
  });

  nextBtn.addEventListener("click", function (event) {
    event.preventDefault();
    showImage(activeIndex + 1);
  });

  overlay.addEventListener("touchstart", function (event) {
    if (!event.touches || event.touches.length !== 1) return;
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  });

  overlay.addEventListener("touchend", function (event) {
    if (!event.changedTouches || event.changedTouches.length !== 1) return;
    var deltaX = event.changedTouches[0].clientX - touchStartX;
    var deltaY = event.changedTouches[0].clientY - touchStartY;
    if (Math.abs(deltaX) > 40 && Math.abs(deltaY) < 60) {
      if (deltaX < 0) {
        showImage(activeIndex + 1);
      } else {
        showImage(activeIndex - 1);
      }
    }
  });

  galleryLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      openLightbox(link);
    });
  });

  document.addEventListener("keydown", handleKey);
});
