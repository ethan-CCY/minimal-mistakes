---
layout: single
title: "相簿"
permalink: /gallery/
classes: wide
excerpt: "運動、溯溪與美食的影像記事，隨時可替換成你的照片。"
gallery_categories:
  - id: sport
    title: "運動"
    description: "球場、路跑與健身的片刻，替換成你的運動紀錄即可。"
    caption: "點擊縮圖可放大，後續將實際照片放進 assets/images/gallery/ 即可更新。"
  - id: river_tracing
    title: "溯溪"
    description: "溪谷、峽谷與野營的留影，支援多張照片與 RWD。"
    caption: "上傳新的溯溪照片到 assets/images/gallery/ 並調整此頁路徑即可。"
  - id: food
    title: "美食"
    description: "旅途中遇見的料理與甜點。"
    caption: "圖片檔名可自由調整，版面會自動排版。"
sport:
  - image_path: /assets/images/gallery/sport-1.svg
    alt: "球場上的步伐"
    title: "球場上的步伐"
  - image_path: /assets/images/gallery/sport-2.svg
    alt: "訓練與突破"
    title: "訓練與突破"
river_tracing:
  - image_path: /assets/images/gallery/river-1.svg
    alt: "山林溪谷"
    title: "山林溪谷"
  - image_path: /assets/images/gallery/river-2.svg
    alt: "溪谷與浪花"
    title: "溪谷與浪花"
food:
  - image_path: /assets/images/gallery/food-1.svg
    alt: "甜點咖啡時光"
    title: "甜點咖啡時光"
  - image_path: /assets/images/gallery/food-2.svg
    alt: "好味道留影"
    title: "好味道留影"
---

歡迎來到 **相簿**！這裡預留了運動、溯溪與美食的分冊相簿，之後把自己的照片放進 `assets/images/gallery/` 就能立即顯示，並保持手機與桌機版面皆適配。

<div class="gallery-tablist" role="tablist" aria-label="相簿分冊切換">
  <button id="tab-sport" class="gallery-tab is-active" role="tab" aria-selected="true" aria-controls="gallery-sport" data-target="sport">運動</button>
  <button id="tab-river_tracing" class="gallery-tab" role="tab" aria-selected="false" aria-controls="gallery-river_tracing" data-target="river_tracing">溯溪</button>
  <button id="tab-food" class="gallery-tab" role="tab" aria-selected="false" aria-controls="gallery-food" data-target="food">美食</button>
</div>

{% for category in page.gallery_categories %}
<section id="gallery-{{ category.id }}" class="gallery-panel{% if forloop.first %} is-active{% endif %}" role="tabpanel" aria-labelledby="tab-{{ category.id }}"{% unless forloop.first %} hidden{% endunless %}>
  <h2>{{ category.title }}</h2>
  <p class="gallery-description">{{ category.description }}</p>
  {% include gallery id=category.id layout="third" class="gallery-grid" caption=category.caption %}
</section>
{% endfor %}

<style>
.gallery-tablist {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin: 0 0 1.25rem;
}
.gallery-tab {
  cursor: pointer;
  border-radius: 999px;
  border: 1px solid var(--mm-border-color, #d9d9d9);
  background: #f9fafb;
  color: inherit;
  padding: 0.6rem 1.1rem;
  transition: all 0.2s ease;
  font-weight: 600;
}
.gallery-tab.is-active {
  background: var(--mm-accent-color, #2a7ae2);
  color: #fff;
  border-color: var(--mm-accent-color, #2a7ae2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}
.gallery-panel {
  margin: 0 0 1.75rem;
}
.gallery-panel[hidden] {
  display: none;
}
.gallery-panel h2 {
  margin-bottom: 0.35rem;
}
.gallery-description {
  margin-top: 0;
  color: var(--mm-muted-color, #666);
}
.gallery-grid {
  margin-top: 0.35rem;
}
@media (max-width: 640px) {
  .gallery-tab {
    width: 100%;
    text-align: center;
  }
}
</style>

<script>
  document.addEventListener('DOMContentLoaded', function () {
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
  });
</script>
