---
layout: single
title: "相簿"
permalink: /gallery/
author_profile: true
classes: wide
# 依需求替換為實際圖片路徑，維持在 assets/images/gallery/ 之下即可正常顯示
sports_gallery:
  - image_path: /assets/images/gallery/placeholder.svg
    alt: "運動照片待上傳"
    title: "運動集錦"
  - image_path: /assets/images/gallery/placeholder.svg
    alt: "運動照片待上傳"
    title: "運動集錦"
  - image_path: /assets/images/gallery/placeholder.svg
    alt: "運動照片待上傳"
    title: "運動集錦"
river_gallery:
  - image_path: /assets/images/gallery/placeholder.svg
    alt: "溯溪照片待上傳"
    title: "溯溪集錦"
  - image_path: /assets/images/gallery/placeholder.svg
    alt: "溯溪照片待上傳"
    title: "溯溪集錦"
  - image_path: /assets/images/gallery/placeholder.svg
    alt: "溯溪照片待上傳"
    title: "溯溪集錦"
food_gallery:
  - image_path: /assets/images/gallery/placeholder.svg
    alt: "美食照片待上傳"
    title: "美食集錦"
  - image_path: /assets/images/gallery/placeholder.svg
    alt: "美食照片待上傳"
    title: "美食集錦"
  - image_path: /assets/images/gallery/placeholder.svg
    alt: "美食照片待上傳"
    title: "美食集錦"
---

歡迎來到我的相簿！相簿分為「運動」、「溯溪」、「美食」三個分冊，未來的照片只要上傳到 `assets/images/gallery/` 資料夾並更新路徑，就能自動在這裡呈現。

<div class="gallery-tabs" role="tablist" aria-label="相簿分冊切換">
  <button class="gallery-tab is-active" type="button" data-target="sports" aria-controls="sports" aria-selected="true">運動</button>
  <button class="gallery-tab" type="button" data-target="river" aria-controls="river" aria-selected="false">溯溪</button>
  <button class="gallery-tab" type="button" data-target="food" aria-controls="food" aria-selected="false">美食</button>
</div>

<div class="gallery-panel is-active" id="sports" role="tabpanel" tabindex="0" aria-label="運動分冊">
  {% include gallery id="sports_gallery" layout="third" %}
</div>

<div class="gallery-panel" id="river" role="tabpanel" tabindex="0" aria-label="溯溪分冊">
  {% include gallery id="river_gallery" layout="third" %}
</div>

<div class="gallery-panel" id="food" role="tabpanel" tabindex="0" aria-label="美食分冊">
  {% include gallery id="food_gallery" layout="third" %}
</div>

<style>
  .gallery-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin: 1.5rem 0 1rem;
  }

  .gallery-tab {
    border: 1px solid var(--link-underline-color, #ccd6f6);
    background: #fff;
    color: var(--text-color, #34495e);
    padding: 0.5rem 1.25rem;
    border-radius: 999px;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  }

  .gallery-tab.is-active,
  .gallery-tab:focus-visible {
    background: var(--link-color, #4472c4);
    color: #fff;
    border-color: var(--link-color, #4472c4);
    outline: none;
  }

  .gallery-tab:hover {
    border-color: var(--link-color, #4472c4);
  }

  .gallery-panel {
    display: none;
    margin-bottom: 1.5rem;
  }

  .gallery-panel.is-active {
    display: block;
  }
</style>

<script>
  document.addEventListener("DOMContentLoaded", () => {
    const tabs = Array.from(document.querySelectorAll(".gallery-tab"));
    const panels = Array.from(document.querySelectorAll(".gallery-panel"));

    const activateTab = (targetId) => {
      tabs.forEach((tab) => {
        const isActive = tab.dataset.target === targetId;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", isActive);
      });

      panels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.id === targetId);
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => activateTab(tab.dataset.target));
      tab.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activateTab(tab.dataset.target);
        }
      });
    });
  });
</script>
