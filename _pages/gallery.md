---
layout: single
title: "相簿"
permalink: /gallery/
classes: wide
gallery_sports:
  - image_path: /assets/images/gallery/sports/sports-1.svg
    alt: "運動相簿占位圖 1"
    title: "運動相簿｜等待上傳照片"
  - image_path: /assets/images/gallery/sports/sports-2.svg
    alt: "運動相簿占位圖 2"
    title: "運動相簿｜等待上傳照片"
  - image_path: /assets/images/gallery/sports/sports-3.svg
    alt: "運動相簿占位圖 3"
    title: "運動相簿｜等待上傳照片"
gallery_river:
  - image_path: /assets/images/gallery/river-tracing/river-1.svg
    alt: "溯溪相簿占位圖 1"
    title: "溯溪相簿｜等待上傳照片"
  - image_path: /assets/images/gallery/river-tracing/river-2.svg
    alt: "溯溪相簿占位圖 2"
    title: "溯溪相簿｜等待上傳照片"
  - image_path: /assets/images/gallery/river-tracing/river-3.svg
    alt: "溯溪相簿占位圖 3"
    title: "溯溪相簿｜等待上傳照片"
gallery_food:
  - image_path: /assets/images/gallery/food/food-1.svg
    alt: "美食相簿占位圖 1"
    title: "美食相簿｜等待上傳照片"
  - image_path: /assets/images/gallery/food/food-2.svg
    alt: "美食相簿占位圖 2"
    title: "美食相簿｜等待上傳照片"
  - image_path: /assets/images/gallery/food/food-3.svg
    alt: "美食相簿占位圖 3"
    title: "美食相簿｜等待上傳照片"
---

歡迎走進 Ethan 的影像回憶！依照主題切換「運動」、「溯溪」、「美食」分冊，相簿中的圖片只要放到 `/assets/images/gallery/` 對應資料夾就會自動顯示。

<div class="gallery-tabs" role="tablist" aria-label="相簿分冊切換">
  <button class="gallery-tab is-active" role="tab" aria-selected="true" aria-controls="gallery-sports" data-target="sports">運動</button>
  <button class="gallery-tab" role="tab" aria-selected="false" aria-controls="gallery-river" data-target="river">溯溪</button>
  <button class="gallery-tab" role="tab" aria-selected="false" aria-controls="gallery-food" data-target="food">美食</button>
</div>

<div class="gallery-collections">
  <section id="gallery-sports" class="gallery-panel is-active" role="tabpanel" aria-label="運動相簿">
    {% include gallery id="gallery_sports" layout="third" %}
  </section>

  <section id="gallery-river" class="gallery-panel" role="tabpanel" aria-label="溯溪相簿" hidden>
    {% include gallery id="gallery_river" layout="third" %}
  </section>

  <section id="gallery-food" class="gallery-panel" role="tabpanel" aria-label="美食相簿" hidden>
    {% include gallery id="gallery_food" layout="third" %}
  </section>
</div>

<style>
.gallery-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0 0.75rem;
}

.gallery-tab {
  border: 1px solid #d0d7de;
  background-color: #ffffff;
  color: inherit;
  border-radius: 999px;
  padding: 0.55rem 1.15rem;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.gallery-tab:hover,
.gallery-tab:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(42, 122, 226, 0.2);
}

.gallery-tab.is-active {
  background-color: #2a7ae2;
  border-color: #2a7ae2;
  color: #ffffff;
}

.gallery-collections figure {
  margin: 1.25rem 0;
}

.gallery-collections img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.gallery-panel {
  display: none;
}

.gallery-panel.is-active {
  display: block;
}

@media (max-width: 640px) {
  .gallery-tab {
    flex: 1 1 30%;
    text-align: center;
  }
}
</style>

<script>
  document.addEventListener('DOMContentLoaded', function () {
    var tabs = document.querySelectorAll('.gallery-tab');
    var panels = document.querySelectorAll('.gallery-panel');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.dataset.target;

        tabs.forEach(function (btn) {
          var isActive = btn === tab;
          btn.classList.toggle('is-active', isActive);
          btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        panels.forEach(function (panel) {
          var isTarget = panel.id === 'gallery-' + target;
          panel.classList.toggle('is-active', isTarget);
          if (isTarget) {
            panel.removeAttribute('hidden');
          } else {
            panel.setAttribute('hidden', 'hidden');
          }
        });
      });
    });
  });
</script>
