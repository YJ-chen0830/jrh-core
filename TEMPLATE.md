# 新工具建置格式（Tool Template Spec）

每個計算工具都是獨立的 GitHub repo + GitHub Pages 網站，但共用同一套視覺/互動慣例，並掛載 `jrh-core.js` 提供 email 收集、意見回饋、專案資訊自動儲存、PDF 封面頁等共用功能。新工具請照這份規格建置，才能跟其他 ~21 個工具維持一致，並自動被 email gate / 專案工作流 / PDF 封面頁系統支援。

## 快速開始

1. 複製 `tool-template.html` 為新 repo 的 `index.html`
2. 全域取代下列佔位符：

| 佔位符 | 說明 | 範例 |
|---|---|---|
| `{{TOOL_TITLE_ZH}}` | 中文標題（含 emoji 可選） | `💧 降水計畫` |
| `{{TOOL_TITLE_EN}}` | 英文標題（用於 `<title>`） | `Dewatering Plan` |
| `{{TAGLINE}}` | header 副標，說明方法/規範依據 | `Dupuit 湧水量 / 井點配置 / 泵浦容量` |
| `{{TOOL_CODE}}` | `data-tool` 代碼，2-4 碼英文小寫，**全站唯一**（見下方登記表） | `dwt` |
| `{{TOOL_CODE_UPPER}}` | 同上但大寫，用於文件編號預設值 | `DWT` |
| `{{ID}}` | 本工具內部 DOM id 前綴（通常等於 TOOL_CODE） | `dw` |
| `{{ID_PASCAL}}` | 計算函式名稱後綴 | `DW` |
| `{{DOC_NAME}}` | PDF 檔名/封面顯示的文件名稱 | `降水計畫計算書` |

3. 把範例的 `calc{{ID_PASCAL}}()` 換成實際計算邏輯，`{{TODO}}` 都要填掉
4. 若同一工具有多組獨立計算（像 `drainage` 的雨水下水道＋壓力管揚程），複製整個 `.grid` 區塊並換一組 `{{ID}}` 前綴，用 `.tabs`/`.tab` 切換（可參考 `foundation` 或 `drainage` 的既有作法）

## 一定要有的元素（checklist）

- [ ] `<script src="https://yj-chen0830.github.io/jrh-core/jrh-core.js?v=3" defer>`（版本號跟著 jrh-core.js 目前的版本走，別固定寫 v=1）
- [ ] `<body data-tool="{{TOOL_CODE}}">`
- [ ] header 內第一個元素是「← 返回工程計算中心」連結（沒有這個使用者點進來就出不去）
- [ ] `.proj-section`（工程名稱/地點/承造廠商/文件編號/計算者/審核者/日期）——沒有這組欄位，PDF 就不會有封面頁
- [ ] 每個計算結果旁邊都要有 `details.proc`（計算過程，供第三方檢核）——這是這次新增的規定動作，不是可有可無
- [ ] PDF 輸出按鈕一律是 `class="pro-btn no-print" onclick="openPro()"`，`openPro()` 內部包 `JRH.checkEmail(function(){ jrhPrint('...'); })`，不要跳過 email gate
- [ ] 結尾的 `window.jrhDocMeta = {doc, codes, notes}`——填實際引用的規範跟使用限制，這會自動出現在列印封面後的「設計依據與一般事項」頁
- [ ] repo 加 MIT LICENSE（跟其他計算機一致，這是開源的那一層；`jrh-core`/`engineering-hub` 不要加 LICENSE）

## 完成 index.html 後，還要做的事（外部登記，缺一個都不會被找到）

1. **建立 GitHub repo**：public，repo 名稱就是網址 slug（例：`dewatering` → `yj-chen0830.github.io/dewatering/`）
2. **`engineering-hub/index.html`**：在對應分類 `<section class="section">` 裡加一張 `<article class="card">`，並更新該 section 的 `<span class="section-meta">N 項...</span>` 計數
3. **`engineering-hub/workflow.html`**：在 `var TOOLS=[...]` 陣列加一筆 `{code:'{{TOOL_CODE}}', name:'{{DOC_NAME}}', url:'https://yj-chen0830.github.io/{{repo}}/'}`——這個 `code` 要跟 `data-tool` 一致，否則專案工作流的打卡記錄會對不上
4. 確認 email gate、返回連結、PDF 輸出都實測過一輪（可用 Playwright 或手動點過一次）再 push 到 `main`（GitHub Pages 直接部署，push 即上線）

## 目前已登記的 TOOL_CODE（新工具請避開這些，並回來這裡補上你的）

`pb sc fw sh lf tb tm ro rb fn hyd lc sw bsm rcb rcd rcpm spl stc dwt dr adm mx prw gad asd csd stk sla spc buc ffa phl scu ssc tbm dwd esd tsp ssb mfv pss gsd fsh cna ssd sls bsg scd cct std tsb hdc wfc hjc beb ejm tfe bsl fpd hcd vcd llp mfd pdh evm cfs rme lcc tia mml csv fpa tel feq`
（完整對照見 `engineering-hub/workflow.html` 的 `TOOLS` 陣列——這份清單是手動維護的，新增工具時務必回來加一行，不要只改 `index.html` 的卡片）

## 不屬於這個格式的情況

- 如果新工具用 React/Vite 或其他框架（像 `SA_SlopeDeflectionMethod`），`jrh-core.js` 一樣可以用 `<script>` 標籤掛進 `index.html`（Vite 不會處理外部 script 標籤），但 `.proj-section`／`details.proc` 這些 DOM 慣例要自己用該框架的方式重寫，且列印用的 CSS 需要另外處理（可能沒有這裡的 print 樣式可套）。
- 如果工具本質上不是「計算」而是「文件產生器」（像 `Plan-Builder`）或「排程視覺化」（像 `adm-and-Scurve`），`details.proc` 的意義要重新詮釋（例如 adm-and-Scurve 用它顯示 CPM 前進/反算過程，而不是力學公式），不要硬套。
