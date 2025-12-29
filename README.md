# 個人部落格與相簿網站（基於 Minimal Mistakes）

本專案為一個使用 **Jekyll + GitHub Pages** 建立的個人網站，內容包含部落格文章與多分類相簿（運動、溯溪、美食）。  
在保留 Minimal Mistakes 主題原有結構的前提下，針對 **相簿版面、燈箱行為與 GitHub Pages 部署流程** 進行多項客製與修正，作為個人實作與學習紀錄。

 **網站展示（Demo）**  
https://ethan-ccy.github.io/minimal-mistakes/

---

##  專案特色與調整重點

###  相簿系統（重點改造）
- 新增獨立 **Gallery（相簿）頁面**
- 相簿分類：
  - **運動**（羽球、有氧、健身）
  - **溯溪**（夏季瀑布溪流、冬季野溪溫泉）
  - **美食**（地方特色小吃與下廚紀錄）

###  相簿縮圖版面客製
- 使用 **CSS Grid**
- 欄位配置：
  - 桌機：4 欄
  - 平板：3 欄
  - 手機：2 欄
  - 極小裝置：1 欄
- 縮圖比例固定 **4:3**
- `object-fit: cover`，直拍照片自動裁切並置中
- 僅於相簿頁套用樣式（以 `wide-gallery` 作為 scope），避免影響其他文章頁

---

##  燈箱行為修正（實務踩雷紀錄）

### 遭遇問題
Minimal Mistakes 內建 **Magnific Popup** 與自訂燈箱同時作用，導致：
- 點擊圖片時出現「**雙層燈箱**」
- 關閉與切換行為異常

### 解法重點
- 在 `_config.yml` 中明確關閉內建圖片燈箱：
  ```yml
  image_popup: false
- 於 assets/js/main.min.js 加入 guard 條件
  - 當頁面為相簿頁（.wide-gallery / .gallery-grid）
  - 完全跳過 Magnific Popup 初始化

### 成果
- 相簿頁僅保留單一燈箱行為
- 非相簿頁不受影響
- 避免未來主題更新造成衝突

---

##  GitHub Pages 部署注意事項

- 使用 **Deploy from a branch / ROOT**
- 實際載入與執行的 JavaScript 檔案為：
  ```text
  assets/js/main.min.js
（非 _main.js）
- 所有修正皆以 GitHub Pages 實際行為 作為驗證標準，而非僅本機 Jekyll 預覽


---

##  專案結構說明（重點）

```text
.
├── _config.yml
│   └── 站台設定（已關閉 image_popup）
├── gallery.md
│   └── 相簿頁（套用 wide-gallery layout）
├── _sass/
│   └── custom/
│       └── _overrides.scss
│           └── 相簿 Grid、4:3 縮圖樣式
├── assets/
│   ├── js/
│   │   └── main.min.js
│   │       └── Magnific Popup guard 實作
│   └── images/
│       └── gallery/
│           └── 相簿圖片資源
└── _data/
    └── navigation.yml
        └── 導覽列加入「相簿」
```
---

##  分支與開發習慣（Codex 使用心得）

- 使用 Codex 協助調整樣式與功能
- 為避免分支名稱過長與辨識困難，採用 **數字序命名規則**：
  ```text
  alb-grid-01
  alb-grid-02
  alb-lb-01
- 已合併（merged）的分支會定期刪除，維持 repo 乾淨

---

##  原始主題與致謝

本專案基於 **Minimal Mistakes Jekyll Theme**：

- 官方網站：https://mmistakes.github.io/minimal-mistakes/
- GitHub Repo：https://github.com/mmistakes/minimal-mistakes

Minimal Mistakes 為一個功能完整、相容 GitHub Pages 的 Jekyll 主題，  
本專案僅針對個人需求進行客製與實務修正，原始授權與著作權皆依原專案規範保留。

##  授權說明
- 原始主題：MIT License  
- 本專案內容與客製調整僅作為學習與展示用途

# [Minimal Mistakes Jekyll theme](https://mmistakes.github.io/minimal-mistakes/)
