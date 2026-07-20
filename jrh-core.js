/*!
 * JRH Core v1 — 儒鴻結構工程計算中心 共用核心
 * 包含：Domain lock / Email gate / 意見回饋 / 列印強制展開 / localStorage 自動存取 / PDF 檔名
 * 各工具引入方式：<script src="https://yj-chen0830.github.io/jrh-core/jrh-core.js?v=3" defer></script>
 * 並在 <body> 加上 data-tool="工具代碼"（sc/fw/ro/rb/fn/hyd...）
 */

/* ── Domain lock ── */
(function(){
  var h=location.hostname;
  var ok= !h || h==='localhost' || h==='127.0.0.1' || h==='yj-chen0830.github.io';
  if(!ok){
    document.body.innerHTML='<div style="padding:60px 30px;text-align:center;font-family:sans-serif;color:#333;"><h2 style="color:#0b1f3a;">⚠ 未授權使用</h2><p>本工具版權屬於 <strong>儒鴻結構技師事務所</strong>，<br>僅授權於 <a href="https://yj-chen0830.github.io">yj-chen0830.github.io</a> 使用。<br>如需合作授權，請聯繫原作者。</p></div>';
    throw new Error('Unauthorized domain: '+h);
  }
})();

/* ── GA4 (only on the real production host, not localhost/dev testing) ── */
(function(){
  if(location.hostname!=='yj-chen0830.github.io')return;
  var s=document.createElement('script');
  s.async=true;
  s.src='https://www.googletagmanager.com/gtag/js?id=G-23YS9T7EEK';
  document.head.appendChild(s);
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments);}
  window.gtag=gtag;
  gtag('js',new Date());
  gtag('config','G-23YS9T7EEK');
})();

/* ── Email gate + 意見回饋 FAB ── */
(function(global){var GAS_URL='https://script.google.com/macros/s/AKfycbwuUO7eaRhoJ2KPNYoQFZwsTT5vIgY3pQ0T0pnoajI49haZg5KFn3YQ9jW_Gn7r_Uogrw/exec';var KOFI_URL='https://ko-fi.com/yjchen0830';var EMAIL_KEY='jrh_hub_email';var SENT_KEY='jrh_hub_sent';function stored(){return localStorage.getItem(EMAIL_KEY)||'';}function gasGet(params){var qs=Object.keys(params).map(function(k){return encodeURIComponent(k)+'='+encodeURIComponent(params[k]);}).join('&');fetch(GAS_URL+'?'+qs,{method:'GET',mode:'no-cors'}).catch(function(){});}function sendEmail(email,tool,interest){var key=SENT_KEY+'_'+email;if(localStorage.getItem(key))return;gasGet({type:'email',email:email,tool:tool||document.title,interest:interest||''});localStorage.setItem(key,'1');}var VERIFY_API='https://cloud-sync-mvp-production.up.railway.app/api/email-verify/request';function sendVerification(email,tool){fetch(VERIFY_API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:email,tool:tool||document.title})}).catch(function(){});}function injectStyles(){if(document.getElementById('jrh-eg-css'))return;var s=document.createElement('style');s.id='jrh-eg-css';s.textContent='#jrh-ov{position:fixed;inset:0;background:rgba(11,31,58,.72);z-index:9999;display:flex;align-items:center;justify-content:center;font-family:"Noto Sans TC","Segoe UI",sans-serif;animation:jrhFd .22s ease;}@keyframes jrhFd{from{opacity:0}to{opacity:1}}#jrh-box{background:#fff;border-radius:18px;padding:34px 30px;max-width:400px;width:92%;box-shadow:0 12px 50px rgba(0,0,0,.3);}#jrh-box h2{font-size:19px;font-weight:900;color:#0b1f3a;margin-bottom:5px;}#jrh-box .sub{font-size:12.5px;color:#666;line-height:1.75;margin-bottom:16px;}#jrh-box .sub b{color:#0b1f3a;}.jrh-item{display:flex;align-items:center;gap:9px;font-size:12.5px;color:#333;margin-bottom:7px;}.jrh-item .ck{color:#1a6e35;font-weight:900;font-size:15px;}#jrh-inp{width:100%;padding:11px 13px;border:1.5px solid #ccc;border-radius:9px;font-size:14px;font-family:inherit;margin:14px 0 6px;box-sizing:border-box;}#jrh-inp:focus{outline:none;border-color:#c9a14a;}#jrh-inp.err{border-color:#c00;}#jrh-errmsg{font-size:11.5px;color:#c00;min-height:14px;margin-bottom:8px;}#jrh-btn{width:100%;padding:12px;background:#0b1f3a;color:#fff;border:none;border-radius:9px;font-size:14px;font-weight:800;cursor:pointer;}#jrh-btn:hover{background:#13284a;}#jrh-skip{display:block;text-align:center;color:#bbb;font-size:11.5px;margin-top:11px;cursor:pointer;}#jrh-skip:hover{color:#888;text-decoration:underline;}#jrh-fb-ov{position:fixed;inset:0;background:rgba(11,31,58,.6);z-index:9998;display:flex;align-items:center;justify-content:center;font-family:"Noto Sans TC","Segoe UI",sans-serif;animation:jrhFd .22s ease;}#jrh-fb-box{background:#fff;border-radius:16px;padding:28px 26px;max-width:420px;width:92%;box-shadow:0 10px 40px rgba(0,0,0,.25);}#jrh-fb-box h3{font-size:17px;font-weight:900;color:#0b1f3a;margin-bottom:5px;}#jrh-fb-box .desc{font-size:12px;color:#888;margin-bottom:14px;line-height:1.6;}#jrh-fb-ta{width:100%;height:110px;padding:10px 12px;border:1.5px solid #ccc;border-radius:8px;font-size:13px;font-family:inherit;resize:vertical;box-sizing:border-box;}#jrh-fb-ta:focus{outline:none;border-color:#c9a14a;}.jrh-fb-row{display:flex;gap:8px;margin-top:10px;}#jrh-fb-ok{flex:1;padding:10px;background:#1a6e35;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:800;cursor:pointer;}#jrh-fb-ok:hover{background:#155c2c;}#jrh-fb-cl{padding:10px 18px;background:#eee;color:#666;border:none;border-radius:8px;font-size:13px;cursor:pointer;}#jrh-fb-msg{font-size:11.5px;color:#1a6e35;min-height:14px;margin-top:7px;}#jrh-fab{position:fixed;bottom:20px;right:18px;z-index:8000;display:flex;flex-direction:column;gap:8px;align-items:flex-end;}.jrh-fb-fab{padding:9px 14px;border:none;border-radius:24px;cursor:pointer;font-size:12.5px;font-weight:700;box-shadow:0 3px 12px rgba(0,0,0,.18);display:flex;align-items:center;gap:6px;white-space:nowrap;transition:transform .15s;}.jrh-fb-fab:hover{transform:scale(1.05);}#jrh-fab-fb{background:#0b1f3a;color:#f5f3ee;}#jrh-fab-ko{background:#ff5722;color:#fff;text-decoration:none;}@media print{#jrh-fab{display:none!important;}}.jrh-consent{display:flex;align-items:flex-start;gap:7px;font-size:11px;color:#666;line-height:1.5;margin:10px 0 4px;text-align:left;}.jrh-consent input{-webkit-appearance:checkbox;appearance:checkbox;width:16px!important;height:16px!important;min-width:16px;padding:0!important;margin:2px 0 0!important;flex-shrink:0;flex-grow:0;flex-basis:16px;border:1.5px solid #ccc!important;border-radius:3px!important;background:#fff!important;}.jrh-consent a{color:#0b1f3a;text-decoration:underline;}.jrh-consent span{flex:1;min-width:0;}#jrh-interest{margin:14px 0 4px;padding-top:14px;border-top:1px solid #eee;text-align:left;}#jrh-interest .q{font-size:12px;color:#333;font-weight:700;margin-bottom:8px;}.jrh-int-row{display:flex;gap:8px;}.jrh-int-btn{flex:1;padding:8px;font-size:12px;border:1.5px solid #ccc;border-radius:7px;background:#fff;color:#666;cursor:pointer;}.jrh-int-btn.sel{border-color:#0b1f3a;background:#0b1f3a;color:#fff;font-weight:700;}#jrh-kofi-ov{position:fixed;inset:0;background:rgba(11,31,58,.72);z-index:9998;display:flex;align-items:center;justify-content:center;animation:jrhFd .22s ease;}#jrh-kofi-box{position:relative;background:#fff;border-radius:16px;padding:0;width:92%;max-width:420px;height:570px;max-height:85vh;box-shadow:0 12px 50px rgba(0,0,0,.3);overflow:hidden;}#jrh-kofi-box iframe{width:100%;height:100%;border:none;display:block;}#jrh-kofi-cl{position:absolute;top:8px;right:8px;z-index:1;width:30px;height:30px;border-radius:50%;border:none;background:rgba(11,31,58,.75);color:#fff;font-size:15px;cursor:pointer;line-height:1;}#jrh-kofi-cl:hover{background:#0b1f3a;}@media print{#jrh-kofi-ov{display:none!important;}}';document.head.appendChild(s);}function showEmailModal(onPass){injectStyles();var ov=document.createElement('div');ov.id='jrh-ov';ov.innerHTML='<div id="jrh-box"><h2>🔓 解鎖完整功能</h2><p class="sub">輸入 Email 即可使用所有功能，<b>完全免費</b>。<br>同個瀏覽器只需輸入一次，跨工具共用。</p><div class="jrh-item"><span class="ck">✓</span>高品質 PDF 送審報告輸出</div><div class="jrh-item"><span class="ck">✓</span>新工具上線優先通知</div><div class="jrh-item"><span class="ck">✓</span>優先收到功能改善回報管道</div><div id="jrh-interest"><div class="q">🚀 如果未來有「雲端存檔 / 多人協作」進階功能，你會有興趣嗎？</div><div class="jrh-int-row"><button type="button" class="jrh-int-btn" data-v="yes">有興趣</button><button type="button" class="jrh-int-btn" data-v="no">目前沒興趣</button></div></div><input id="jrh-inp" type="email" placeholder="your@email.com" autocomplete="email"><label class="jrh-consent"><input type="checkbox" id="jrh-consent-ck"><span>我同意接收產品更新通知，可隨時取消訂閱。詳見<a href="https://yj-chen0830.github.io/engineering-hub/privacy.html" target="_blank" rel="noopener">隱私權說明</a>。</span></label><div id="jrh-errmsg"></div><button id="jrh-btn">確認，繼續使用 →</button><span id="jrh-skip">略過（功能將受限）</span></div>';document.body.appendChild(ov);var inp=document.getElementById('jrh-inp'),err=document.getElementById('jrh-errmsg');inp.focus();var interestVal='';document.querySelectorAll('.jrh-int-btn').forEach(function(b){b.addEventListener('click',function(){document.querySelectorAll('.jrh-int-btn').forEach(function(x){x.classList.remove('sel');});b.classList.add('sel');interestVal=b.dataset.v;});});function submit(){var v=inp.value.trim();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){inp.classList.add('err');err.textContent='請輸入有效的 Email 格式';return;}if(!document.getElementById('jrh-consent-ck').checked){err.textContent='請先勾選同意接收通知，才能繼續。';return;}localStorage.setItem(EMAIL_KEY,v);sendEmail(v,document.title,interestVal);sendVerification(v,document.title);ov.remove();onPass();}document.getElementById('jrh-btn').addEventListener('click',submit);inp.addEventListener('keydown',function(e){if(e.key==='Enter')submit();});inp.addEventListener('input',function(){inp.classList.remove('err');err.textContent='';});document.getElementById('jrh-skip').addEventListener('click',function(){ov.remove();onPass();});}function showFeedback(){injectStyles();if(document.getElementById('jrh-fb-ov'))return;var ov=document.createElement('div');ov.id='jrh-fb-ov';ov.innerHTML='<div id="jrh-fb-box"><h3>💬 意見回饋</h3><p class="desc">遇到問題、想要的功能、或任何想說的——都歡迎！<br>你的回饋直接幫助工具變得更好。</p><textarea id="jrh-fb-ta" placeholder="例如：希望可以匯出 Excel、某個計算結果好像不對..."></textarea><div class="jrh-fb-row"><button id="jrh-fb-ok">送出回饋</button><button id="jrh-fb-cl">取消</button></div><div id="jrh-fb-msg"></div></div>';document.body.appendChild(ov);document.getElementById('jrh-fb-cl').addEventListener('click',function(){ov.remove();});ov.addEventListener('click',function(e){if(e.target===ov)ov.remove();});document.getElementById('jrh-fb-ok').addEventListener('click',function(){var msg=document.getElementById('jrh-fb-ta').value.trim();if(!msg){document.getElementById('jrh-fb-msg').textContent='請輸入內容再送出。';return;}gasGet({type:'feedback',email:stored(),tool:document.title,msg:msg});document.getElementById('jrh-fb-msg').style.color='#1a6e35';document.getElementById('jrh-fb-msg').textContent='✔ 已送出，感謝你的回饋！';document.getElementById('jrh-fb-ok').disabled=true;setTimeout(function(){ov.remove();},1800);});}function showKofi(){injectStyles();if(document.getElementById('jrh-kofi-ov'))return;var ov=document.createElement('div');ov.id='jrh-kofi-ov';ov.innerHTML='<div id="jrh-kofi-box"><button id="jrh-kofi-cl" aria-label="關閉">✕</button><iframe src="'+KOFI_URL+'/?hidefeed=true&widget=true&embed=true" title="贊助支持"></iframe></div>';document.body.appendChild(ov);document.getElementById('jrh-kofi-cl').addEventListener('click',function(){ov.remove();});ov.addEventListener('click',function(e){if(e.target===ov)ov.remove();});}function injectFAB(){if(document.getElementById('jrh-fab'))return;injectStyles();var fab=document.createElement('div');fab.id='jrh-fab';fab.innerHTML='<button class="jrh-fb-fab" id="jrh-fab-fb">💬 意見回饋</button><button class="jrh-fb-fab" id="jrh-fab-ko">☕ 贊助支持</button>';document.body.appendChild(fab);document.getElementById('jrh-fab-fb').addEventListener('click',showFeedback);document.getElementById('jrh-fab-ko').addEventListener('click',showKofi);}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',injectFAB);}else{injectFAB();}global.JRH={checkEmail:function(onPass){if(stored()){onPass();return;}showEmailModal(onPass);},getEmail:function(){return stored();},showFeedback:showFeedback,reset:function(){localStorage.removeItem(EMAIL_KEY);Object.keys(localStorage).filter(function(k){return k.indexOf(SENT_KEY)===0;}).forEach(function(k){localStorage.removeItem(k);});}};})(window);

/* ── 列印前強制展開所有計算過程 ── */
window.addEventListener('beforeprint', function(){
  document.querySelectorAll('details.proc').forEach(function(d){
    d.open = true;
    d.style.display = '';
  });
});

/* ── localStorage 自動儲存/還原 ──
   工具欄位：jrh_{tool}_{id}（tool 取自 <body data-tool>）
   專案欄位（id 以 pj- 開頭）：jrh_proj_{id}，全工具共享 */
(function(){
  function init(){
    var tool=(document.body&&document.body.dataset&&document.body.dataset.tool)||'x';
    var pfx='jrh_'+tool+'_';
    function keyFor(el){return el.id.indexOf('pj-')===0 ? 'jrh_proj_'+el.id : pfx+el.id;}
    document.querySelectorAll('input[id],select[id],textarea[id]').forEach(function(el){
      var v=localStorage.getItem(keyFor(el));
      if(v===null && el.id.indexOf('pj-')===0) v=localStorage.getItem(pfx+el.id); /* 舊資料遷移 */
      if(v!==null) el.value=v;
      function save(){localStorage.setItem(keyFor(el),el.value);}
      el.addEventListener('input',save);
      el.addEventListener('change',save);
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();

/* ── PDF 檔名自動化 ──
   jrhPrint('施工架計算書') → 另存 PDF 檔名為「工程名稱_施工架計算書_2026-07-07.pdf」 */
window.jrhPrint=function(docName){
  window.__jrhDocName=docName;
  var el=document.getElementById('pj-name');
  var pj=(el&&el.value.trim())||(localStorage.getItem('jrh_proj_pj-name')||'').trim()||'未命名工程';
  var d=new Date();
  var ds=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  var old=document.title;
  document.title=pj+'_'+(docName||old.split('|')[0].trim())+'_'+ds;
  window.addEventListener('afterprint',function(){document.title=old;},{once:true});
  window.print();
};

/* ── 多專案切換 ──
   有 .proj-section 的工具自動注入專案下拉選單。
   儲存於 jrh_projects（JSON），專案名稱取自「工程名稱」欄位。 */
(function(){
  var LIST='jrh_projects';
  function getAll(){try{return JSON.parse(localStorage.getItem(LIST))||{};}catch(e){return{};}}
  function setAll(o){localStorage.setItem(LIST,JSON.stringify(o));}
  function fields(){return document.querySelectorAll('input[id^="pj-"],select[id^="pj-"],textarea[id^="pj-"]');}
  function snapshot(){var o={};fields().forEach(function(el){o[el.id]=el.value;});return o;}
  function apply(o){fields().forEach(function(el){
    if(o[el.id]!==undefined){el.value=o[el.id];localStorage.setItem('jrh_proj_'+el.id,el.value);}
  });}
  function init(){
    var sec=document.querySelector('.proj-section');
    if(!sec||document.getElementById('jrh-proj-sel'))return;
    if(!fields().length)return;
    var bar=document.createElement('div');
    bar.className='no-print';
    bar.style.cssText='display:flex;gap:8px;align-items:center;margin-bottom:14px;flex-wrap:wrap;';
    bar.innerHTML=
      '<select id="jrh-proj-sel" style="flex:1;min-width:150px;width:auto;padding:8px 10px;border:1.5px solid #d8d2c2;border-radius:7px;font-size:13px;background:#fafaf8;margin:0;"></select>'+
      '<button type="button" id="jrh-proj-save" style="margin:0;width:auto;padding:8px 14px;font-size:12.5px;font-weight:700;border:none;border-radius:7px;background:#0b1f3a;color:#fff;cursor:pointer;">💾 儲存專案</button>'+
      '<button type="button" id="jrh-proj-del" style="margin:0;width:auto;padding:8px 12px;font-size:12.5px;border:1px solid #c0392b;border-radius:7px;background:#fff;color:#c0392b;cursor:pointer;">刪除</button>';
    var h3=sec.querySelector('h3');
    if(h3&&h3.nextSibling) sec.insertBefore(bar,h3.nextSibling);
    else sec.insertBefore(bar,sec.firstChild);
    var sel=document.getElementById('jrh-proj-sel');
    function refresh(keep){
      var all=getAll(),names=Object.keys(all).sort();
      sel.innerHTML='<option value="">── 切換已存專案 ──</option>'+
        names.map(function(n){return '<option value="'+n.replace(/"/g,'&quot;')+'">'+n+'</option>';}).join('');
      if(keep&&all[keep])sel.value=keep;
    }
    refresh();
    sel.addEventListener('change',function(){
      if(!sel.value)return;
      var all=getAll();
      if(all[sel.value])apply(all[sel.value]);
    });
    document.getElementById('jrh-proj-save').addEventListener('click',function(){
      var nameEl=document.getElementById('pj-name');
      var name=(nameEl&&nameEl.value.trim())||'';
      if(!name){alert('請先填寫「工程名稱」再儲存專案。');return;}
      var all=getAll();all[name]=snapshot();setAll(all);
      refresh(name);
      var btn=this,t=btn.textContent;btn.textContent='✔ 已儲存';
      setTimeout(function(){btn.textContent=t;},1200);
    });
    document.getElementById('jrh-proj-del').addEventListener('click',function(){
      if(!sel.value){alert('請先從下拉選單選擇要刪除的專案。');return;}
      if(!confirm('確定刪除專案「'+sel.value+'」的已存資料？（不影響目前表單內容）'))return;
      var all=getAll();delete all[sel.value];setAll(all);refresh();
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();

/* ── 正式計算書：封面頁 + 設計依據與一般事項 + 表頭跨頁重複 ──
   各工具定義 window.jrhDocMeta = { doc:'計算書名稱', codes:[...], notes:[...] }
   列印時自動產生封面（需有 pj-name 欄位）與規範/一般事項頁。 */
(function(){
  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  function get(id){var el=document.getElementById(id);if(el)return el.value.trim();return (localStorage.getItem('jrh_proj_'+id)||'').trim();}
  function today(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}

  /* print-only CSS */
  var css=document.createElement('style');
  css.id='jrh-doc-css';
  css.textContent=
    '#jrh-cover,#jrh-notes{display:none;}'+
    '@media print{'+
      'thead{display:table-header-group;}'+
      '.print-sig{display:none!important;}'+
      '#jrh-cover{display:flex!important;flex-direction:column;height:255mm;page-break-after:always;font-family:"Noto Sans TC","Segoe UI",sans-serif;color:#111;}'+
      '#jrh-cover .jc-office{text-align:center;font-size:11pt;font-weight:700;color:#0b1f3a;letter-spacing:.35em;margin-top:18pt;}'+
      '#jrh-cover .jc-line{width:60%;margin:10pt auto 0;border-bottom:2pt solid #c9a14a;}'+
      '#jrh-cover .jc-mid{flex:1;display:flex;flex-direction:column;justify-content:center;text-align:center;}'+
      '#jrh-cover .jc-proj{font-size:20pt;font-weight:700;color:#0b1f3a;line-height:1.5;margin-bottom:10pt;}'+
      '#jrh-cover .jc-doc{font-size:15pt;font-weight:700;color:#333;letter-spacing:.2em;}'+
      '#jrh-cover table{width:70%;margin:26pt auto 0;border-collapse:collapse;font-size:10pt;}'+
      '#jrh-cover th{background:#f0ece4!important;color:#0b1f3a;font-weight:700;text-align:left;width:30%;padding:7pt 10pt;border:1pt solid #999;-webkit-print-color-adjust:exact;print-color-adjust:exact;}'+
      '#jrh-cover td{padding:7pt 10pt;border:1pt solid #999;}'+
      '#jrh-cover .jc-sig{display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;width:86%;margin:0 auto 20pt;border:1pt solid #999;}'+
      '#jrh-cover .jc-sig>div{border-right:1pt solid #999;padding:8pt 10pt 34pt;font-size:9pt;color:#555;}'+
      '#jrh-cover .jc-sig>div:last-child{border-right:none;}'+
      '#jrh-notes{display:block!important;margin-top:14pt;border:1pt solid #0b1f3a;border-radius:4pt;background:#f9f9f6!important;break-inside:avoid;padding:0 0 8pt;}'+
      '#jrh-notes h4{font-size:9pt;font-weight:700;color:#0b1f3a;padding:8pt 12pt 4pt;margin:0;border-bottom:1pt solid #ccc;letter-spacing:.05em;}'+
      '#jrh-notes h5{font-size:8.5pt;font-weight:700;color:#0b1f3a;margin:8pt 12pt 2pt;}'+
      '#jrh-notes ol{margin:2pt 0 4pt;padding-left:26pt;}'+
      '#jrh-notes li{font-size:8pt;line-height:1.8;color:#222;}'+
    '}';
  document.head.appendChild(css);

  function buildCover(){
    var old=document.getElementById('jrh-cover');if(old)old.remove();
    if(!document.getElementById('pj-name')&&!(localStorage.getItem('jrh_proj_pj-name')||'').trim())return;
    var meta=window.jrhDocMeta||{};
    var docName=meta.doc||(window.__jrhDocName)||document.title.split('|')[0].trim();
    var rows=[
      ['工程地點',get('pj-loc')],['承造廠商',get('pj-contractor')],
      ['文件編號',get('pj-docno')],['計算日期',get('pj-date')||today()]
    ].filter(function(r){return r[1];});
    var cover=document.createElement('div');
    cover.id='jrh-cover';
    cover.innerHTML=
      '<div class="jc-office">儒鴻結構技師事務所</div><div class="jc-line"></div>'+
      '<div class="jc-mid">'+
        '<div class="jc-proj">'+esc(get('pj-name')||'（未填寫工程名稱）')+'</div>'+
        '<div class="jc-doc">'+esc(docName)+'</div>'+
        (rows.length?'<table>'+rows.map(function(r){return '<tr><th>'+r[0]+'</th><td>'+esc(r[1])+'</td></tr>';}).join('')+'</table>':'')+
      '</div>'+
      '<div class="jc-sig">'+
        '<div>計算者 Prepared by'+(get('pj-calc')?'<br><br>'+esc(get('pj-calc')):'')+'</div>'+
        '<div>審核者 Checked by'+(get('pj-review')?'<br><br>'+esc(get('pj-review')):'')+'</div>'+
        '<div>核准者 Approved by</div>'+
      '</div>';
    document.body.insertBefore(cover,document.body.firstChild);
  }

  // Appended to every tool's notes list regardless of what (if anything) the
  // tool itself defines — some earlier tools have no jrhDocMeta at all,
  // others phrase the "needs a licensed engineer's sign-off" point
  // inconsistently or omit it. This guarantees it's always present verbatim.
  var STANDARD_DISCLAIMER='本工具計算結果與PDF文件僅供工程初步評估、方案比較與第三方檢核參考，不取代正式設計計算書，亦不具技師簽證效力；正式送審、施工或驗收文件，應由具資格之專業技師依實際工程條件複核並簽證後方可使用。';
  function buildNotes(){
    var old=document.getElementById('jrh-notes');if(old)old.remove();
    var meta=window.jrhDocMeta||{};
    var notes=(meta.notes&&meta.notes.length)?meta.notes.slice():[];
    notes.push(STANDARD_DISCLAIMER);
    var d=document.createElement('div');
    d.id='jrh-notes';
    var h='<h4>📌 設計依據與一般事項</h4>';
    if(meta.codes&&meta.codes.length)
      h+='<h5>一、設計依據</h5><ol>'+meta.codes.map(function(c){return '<li>'+esc(c)+'</li>';}).join('')+'</ol>';
    h+='<h5>二、一般事項</h5><ol>'+notes.map(function(n){return '<li>'+esc(n)+'</li>';}).join('')+'</ol>';
    d.innerHTML=h;
    var footer=document.querySelector('.print-footer');
    if(footer&&footer.parentElement)footer.parentElement.insertBefore(d,footer);
    else (document.querySelector('main')||document.body).appendChild(d);
  }

  window.addEventListener('beforeprint',function(){buildCover();buildNotes();});
})();

/* ── 專案工作流 ──
   1. jrhPrint 產出 PDF 時自動記錄完成狀態（jrh_wf）
   2. 網址 ?proj=專案名 開啟時自動載入該專案
   3. FAB 增加「專案工作流」入口 */
(function(){
  var WF='jrh_wf';
  function getWf(){try{return JSON.parse(localStorage.getItem(WF))||{};}catch(e){return{};}}
  function setWf(o){localStorage.setItem(WF,JSON.stringify(o));}

  /* 產出 PDF 時打卡：包裝 jrhPrint */
  var orig=window.jrhPrint;
  window.jrhPrint=function(docName){
    try{
      var nameEl=document.getElementById('pj-name');
      var proj=nameEl?nameEl.value.trim():(localStorage.getItem('jrh_proj_pj-name')||'').trim();
      var tool=(document.body&&document.body.dataset&&document.body.dataset.tool)||'';
      if(proj&&tool){
        var wf=getWf();
        if(!wf[proj])wf[proj]={};
        var d=new Date();
        wf[proj][tool]={doc:docName||document.title,date:d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
        setWf(wf);
      }
    }catch(e){}
    orig(docName);
  };

  /* ?proj= 自動載入 */
  function autoLoad(){
    var m=location.search.match(/[?&]proj=([^&]+)/);
    if(!m)return;
    var name=decodeURIComponent(m[1].replace(/\+/g,' '));
    var all;try{all=JSON.parse(localStorage.getItem('jrh_projects'))||{};}catch(e){return;}
    var proj=all[name];
    if(!proj)return;
    Object.keys(proj).forEach(function(id){
      var el=document.getElementById(id);
      if(el){el.value=proj[id];localStorage.setItem('jrh_proj_'+id,proj[id]);}
    });
    var sel=document.getElementById('jrh-proj-sel');
    if(sel)sel.value=name;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',autoLoad);
  else autoLoad();

  /* FAB 入口 */
  function addFabLink(){
    var fab=document.getElementById('jrh-fab');
    if(!fab||document.getElementById('jrh-fab-wf'))return;
    var a=document.createElement('a');
    a.className='jrh-fb-fab';a.id='jrh-fab-wf';
    a.href='https://yj-chen0830.github.io/engineering-hub/workflow.html';
    a.style.cssText='background:#c9a14a;color:#0b1f3a;text-decoration:none;';
    a.textContent='📁 專案工作流';
    fab.insertBefore(a,fab.firstChild);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addFabLink);
  else setTimeout(addFabLink,300);
})();

/* ── 跨工具資料傳遞（組合技）──
   來源工具算完後呼叫 JRH.saveOutput({...}) 將結果存入目前專案。
   下游工具用 JRH.showInboundBanner('來源工具代碼','來源工具名稱',function(data){...帶入自己的欄位...})
   偵測是否有可帶入的上游結果，並顯示提示條（使用者仍可選擇忽略，不會自動覆蓋）。
   資料儲存於 jrh_outputs（依專案名稱、工具代碼分層），與 jrh_projects/jrh_wf 為同一套 key 慣例。 */
(function(){
  var OUT='jrh_outputs';
  function getAllOut(){try{return JSON.parse(localStorage.getItem(OUT))||{};}catch(e){return{};}}
  function setAllOut(o){localStorage.setItem(OUT,JSON.stringify(o));}
  function currentProj(){
    var el=document.getElementById('pj-name');
    return (el?el.value.trim():'')||(localStorage.getItem('jrh_proj_pj-name')||'').trim();
  }
  function today(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}

  function saveOutput(data){
    var proj=currentProj();
    var tool=(document.body&&document.body.dataset&&document.body.dataset.tool)||'';
    if(!proj||!tool)return;
    var all=getAllOut();
    if(!all[proj])all[proj]={};
    all[proj][tool]={data:data,date:today()};
    setAllOut(all);
  }
  function getOutput(toolCode){
    var proj=currentProj();
    if(!proj)return null;
    var all=getAllOut();
    return (all[proj]&&all[proj][toolCode])||null;
  }
  function injectBannerStyles(){
    if(document.getElementById('jrh-inbound-css'))return;
    var s=document.createElement('style');s.id='jrh-inbound-css';
    s.textContent='.jrh-inbound{display:flex;align-items:center;gap:12px;flex-wrap:wrap;background:#fdf7ec;border:1.5px dashed #c9a14a;border-radius:9px;padding:12px 16px;margin-bottom:16px;font-size:13px;color:#333;}.jrh-inbound b{color:#0b1f3a;}.jrh-inbound .jrh-in-btns{display:flex;gap:8px;margin-left:auto;}.jrh-inbound button{padding:7px 14px;border-radius:6px;border:none;font-size:12.5px;font-weight:700;cursor:pointer;}.jrh-in-yes{background:#0b1f3a;color:#fff;}.jrh-in-no{background:#eee;color:#666;}';
    document.head.appendChild(s);
  }
  function showInboundBanner(sourceToolCode,sourceLabel,onAccept){
    var out=getOutput(sourceToolCode);
    if(!out)return false;
    var selfTool=(document.body&&document.body.dataset&&document.body.dataset.tool)||'';
    var dismissKey='jrh_inbound_dismiss_'+currentProj()+'_'+sourceToolCode+'_'+selfTool;
    if(sessionStorage.getItem(dismissKey))return false;
    injectBannerStyles();
    var host=document.querySelector('main')||document.body;
    var target=document.querySelector('.grid')||document.querySelector('.card')||host.firstChild;
    var bar=document.createElement('div');
    bar.className='jrh-inbound no-print';
    bar.innerHTML='<span>💡 偵測到來自 <b>「'+sourceLabel+'」</b>（'+out.date+'）的計算結果，是否帶入？</span><div class="jrh-in-btns"><button type="button" class="jrh-in-yes">帶入</button><button type="button" class="jrh-in-no">忽略</button></div>';
    if(target&&target.parentElement)target.parentElement.insertBefore(bar,target);
    else host.insertBefore(bar,host.firstChild);
    bar.querySelector('.jrh-in-yes').addEventListener('click',function(){
      onAccept(out.data);
      bar.remove();
    });
    bar.querySelector('.jrh-in-no').addEventListener('click',function(){
      sessionStorage.setItem(dismissKey,'1');
      bar.remove();
    });
    return true;
  }
  window.JRH=window.JRH||{};
  window.JRH.saveOutput=saveOutput;
  window.JRH.getOutput=getOutput;
  window.JRH.showInboundBanner=showInboundBanner;
})();

/* ── 計算書示意圖共用元件（SVG）──
   各工具在算完之後呼叫 JRH.diagram.wrap(...) 組出的 HTML 字串，直接塞進自己
   的 result innerHTML 即可（會跟著印在畫面上與 PDF 裡，不需要另外處理）。
   顏色慣例：navy 用於結構/尺寸標註，紅色用於力/壓力/反力，金色用於警示區域
   （如基礎中央三分之一），OK/NG 判定沿用各工具既有的綠/紅字。
   座標一律用等比例尺（同一個 px/單位 用在 x、y 兩軸），避免示意圖變形失真；
   若構件太細（如樁徑相對樁長）則另外用固定像素寬度誇大顯示，並在圖說註明
   「比例尺概略」，這是工程示意圖常見做法，不是誤導。 */
(function(){
  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

  function defs(){
    return '<defs>'
      +'<pattern id="jrhSoil" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="0" y2="8" stroke="#8a7a5c" stroke-width="1.3"/></pattern>'
      +'<pattern id="jrhConcrete" width="9" height="9" patternUnits="userSpaceOnUse"><rect width="9" height="9" fill="#e9e6dc"/><circle cx="2.2" cy="2.2" r=".7" fill="#b8b2a0"/><circle cx="6.5" cy="6.5" r=".7" fill="#b8b2a0"/></pattern>'
      +'<marker id="jrhArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill="#c0392b"/></marker>'
      +'<marker id="jrhArrowNavy" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill="#5c5442"/></marker>'
      +'</defs>';
  }

  /* 把示意圖內容包成完整 <svg>，w/h 為 viewBox 邏輯座標（非實際像素） */
  function wrap(w,h,inner,opts){
    opts=opts||{};
    return '<div class="jrh-diagram no-select" style="margin:14px 0;text-align:center;">'
      +'<svg viewBox="0 0 '+w+' '+h+'" width="100%" style="max-width:'+(opts.maxWidth||440)+'px;height:auto;font-family:\'Noto Sans TC\',\'Segoe UI\',sans-serif;" xmlns="http://www.w3.org/2000/svg">'
      +defs()+inner
      +'</svg></div>';
  }

  /* 兩端帶箭頭的尺寸標註線 + 置中文字（水平/垂直皆可，依 x1==x2 或 y1==y2 判斷） */
  function dim(x1,y1,x2,y2,text,opts){
    opts=opts||{};
    var color=opts.color||'#5c5442';
    var isH=Math.abs(y1-y2)<0.01;
    var mx=(x1+x2)/2, my=(y1+y2)/2;
    var out='<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+color+'" stroke-width="1" marker-start="url(#jrhArrowNavy)" marker-end="url(#jrhArrowNavy)"/>';
    if(isH){
      out+='<text x="'+mx+'" y="'+(my-4)+'" font-size="9" fill="'+color+'" text-anchor="middle">'+esc(text)+'</text>';
    }else{
      out+='<text x="'+(mx-4)+'" y="'+my+'" font-size="9" fill="'+color+'" text-anchor="middle" transform="rotate(-90 '+(mx-4)+' '+my+')">'+esc(text)+'</text>';
    }
    return out;
  }

  /* 單向箭頭（表示力、壓力、反力方向） */
  function arrow(x1,y1,x2,y2,opts){
    opts=opts||{};
    return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+(opts.color||'#c0392b')+'" stroke-width="'+(opts.width||1.6)+'" marker-end="url(#jrhArrow)"/>';
  }

  /* 純文字標籤 */
  function label(x,y,text,opts){
    opts=opts||{};
    return '<text x="'+x+'" y="'+y+'" font-size="'+(opts.size||10)+'" fill="'+(opts.color||'#1c2530')+'" text-anchor="'+(opts.anchor||'middle')+'" font-weight="'+(opts.weight||'400')+'">'+esc(text)+'</text>';
  }

  window.JRH=window.JRH||{};
  window.JRH.diagram={wrap:wrap,dim:dim,arrow:arrow,label:label,esc:esc};
})();
