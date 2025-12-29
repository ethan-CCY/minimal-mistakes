---
layout: single
title: "相簿"
permalink: /gallery/
classes: [wide-gallery]
excerpt: "運動、溯溪與美食的影像記事，隨時可替換成你的照片。"
gallery_categories:
  - id: sport
    title: "運動"
    description: "在運動中找節奏，用汗水累積身體的改變。"
    caption: "點擊縮圖可放大瀏覽"
  - id: river_tracing
    title: "溯溪"
    description: "從沁涼瀑布到山林溫泉，記錄野溪的四季變化。"
    caption: "點擊縮圖可放大瀏覽"
  - id: food
    title: "美食"
    description: "從巷口小吃到廚房餐桌，收藏每一餐的溫度。"
    caption: "點擊縮圖可放大瀏覽"
sport:
  - image_path: /assets/images/gallery/BV/BV-01.jpg
    alt: "羽球場上的小戴女神"
    title: "羽球場上的小戴女神"
river_tracing:
  - image_path: /assets/images/gallery/RiverTracing/river-01.webp
    alt: "飄起來~Chill一下"
    title: "飄起來~Chill一下"
  - image_path: /assets/images/gallery/RiverTracing/river-02.webp
    alt: "溪谷秘境"
    title: "溪谷秘境"
  - image_path: /assets/images/gallery/RiverTracing/river-03.webp
    alt: "爬呀爬呀爬"
    title: "爬呀爬呀爬"
  - image_path: /assets/images/gallery/RiverTracing/river-04.webp
    alt: "溯人日常"
    title: "溯人日常"
food:
  - image_path: /assets/images/gallery/Food/food-01.jpg
    alt: "廚房小筆記"
    title: "控罵控控"
---

歡迎來到我的相簿，這裡收藏了運動、溯溪與生活風景的紀錄。透過影像分享每一次貼近自然、感受生活細節的瞬間，邀你一起慢慢欣賞、自在探索。

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
