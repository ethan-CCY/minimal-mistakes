---
layout: single
title: "相簿"
permalink: /gallery/
classes: [wide-gallery]
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
  - image_path: /assets/images/gallery/BV/BV-01.jpg
    alt: "球場上的步伐"
    title: "球場上的步伐"
river_tracing:
  - image_path: /assets/images/gallery/RiverTracing/river-01.webp
    alt: "山林溪谷"
    title: "山林溪谷"
  - image_path: /assets/images/gallery/RiverTracing/river-02.webp
    alt: "溪谷與浪花"
    title: "溪谷與浪花"
  - image_path: /assets/images/gallery/RiverTracing/river-03.webp
    alt: "峽谷水域"
    title: "峽谷水域"
  - image_path: /assets/images/gallery/RiverTracing/river-04.webp
    alt: "溪谷步道"
    title: "溪谷步道"
food:
  - image_path: /assets/images/gallery/Food/food-01.jpg
    alt: "甜點咖啡時光"
    title: "甜點咖啡時光"
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

<script src="{{ '/assets/js/gallery-lightbox.js' | relative_url }}" defer></script>
