/*!
 * JRH Core v1 — 儒鴻結構工程計算中心 共用核心
 * 包含：Domain lock / Email gate / 意見回饋 / 列印強制展開 / localStorage 自動存取 / PDF 檔名
 * 各工具引入方式：<script src="https://yj-chen0830.github.io/jrh-core/jrh-core.js?v=1" defer></script>
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

/* ── Email gate + 意見回饋 FAB ── */
(function(global){var GAS_URL='https://script.google.com/macros/s/AKfycbwuUO7eaRhoJ2KPNYoQFZwsTT5vIgY3pQ0T0pnoajI49haZg5KFn3YQ9jW_Gn7r_Uogrw/exec';var KOFI_URL='https://ko-fi.com/yjchen0830';var EMAIL_KEY='jrh_hub_email';var SENT_KEY='jrh_hub_sent';function stored(){return localStorage.getItem(EMAIL_KEY)||'';}function gasGet(params){var qs=Object.keys(params).map(function(k){return encodeURIComponent(k)+'='+encodeURIComponent(params[k]);}).join('&');fetch(GAS_URL+'?'+qs,{method:'GET',mode:'no-cors'}).catch(function(){});}function sendEmail(email,tool){var key=SENT_KEY+'_'+email;if(localStorage.getItem(key))return;gasGet({type:'email',email:email,tool:tool||document.title});localStorage.setItem(key,'1');}function injectStyles(){if(document.getElementById('jrh-eg-css'))return;var s=document.createElement('style');s.id='jrh-eg-css';s.textContent='#jrh-ov{position:fixed;inset:0;background:rgba(11,31,58,.72);z-index:9999;display:flex;align-items:center;justify-content:center;font-family:"Noto Sans TC","Segoe UI",sans-serif;animation:jrhFd .22s ease;}@keyframes jrhFd{from{opacity:0}to{opacity:1}}#jrh-box{background:#fff;border-radius:18px;padding:34px 30px;max-width:400px;width:92%;box-shadow:0 12px 50px rgba(0,0,0,.3);}#jrh-box h2{font-size:19px;font-weight:900;color:#0b1f3a;margin-bottom:5px;}#jrh-box .sub{font-size:12.5px;color:#666;line-height:1.75;margin-bottom:16px;}#jrh-box .sub b{color:#0b1f3a;}.jrh-item{display:flex;align-items:center;gap:9px;font-size:12.5px;color:#333;margin-bottom:7px;}.jrh-item .ck{color:#1a6e35;font-weight:900;font-size:15px;}#jrh-inp{width:100%;padding:11px 13px;border:1.5px solid #ccc;border-radius:9px;font-size:14px;font-family:inherit;margin:14px 0 6px;box-sizing:border-box;}#jrh-inp:focus{outline:none;border-color:#c9a14a;}#jrh-inp.err{border-color:#c00;}#jrh-errmsg{font-size:11.5px;color:#c00;min-height:14px;margin-bottom:8px;}#jrh-btn{width:100%;padding:12px;background:#0b1f3a;color:#fff;border:none;border-radius:9px;font-size:14px;font-weight:800;cursor:pointer;}#jrh-btn:hover{background:#13284a;}#jrh-skip{display:block;text-align:center;color:#bbb;font-size:11.5px;margin-top:11px;cursor:pointer;}#jrh-skip:hover{color:#888;text-decoration:underline;}#jrh-fb-ov{position:fixed;inset:0;background:rgba(11,31,58,.6);z-index:9998;display:flex;align-items:center;justify-content:center;font-family:"Noto Sans TC","Segoe UI",sans-serif;animation:jrhFd .22s ease;}#jrh-fb-box{background:#fff;border-radius:16px;padding:28px 26px;max-width:420px;width:92%;box-shadow:0 10px 40px rgba(0,0,0,.25);}#jrh-fb-box h3{font-size:17px;font-weight:900;color:#0b1f3a;margin-bottom:5px;}#jrh-fb-box .desc{font-size:12px;color:#888;margin-bottom:14px;line-height:1.6;}#jrh-fb-ta{width:100%;height:110px;padding:10px 12px;border:1.5px solid #ccc;border-radius:8px;font-size:13px;font-family:inherit;resize:vertical;box-sizing:border-box;}#jrh-fb-ta:focus{outline:none;border-color:#c9a14a;}.jrh-fb-row{display:flex;gap:8px;margin-top:10px;}#jrh-fb-ok{flex:1;padding:10px;background:#1a6e35;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:800;cursor:pointer;}#jrh-fb-ok:hover{background:#155c2c;}#jrh-fb-cl{padding:10px 18px;background:#eee;color:#666;border:none;border-radius:8px;font-size:13px;cursor:pointer;}#jrh-fb-msg{font-size:11.5px;color:#1a6e35;min-height:14px;margin-top:7px;}#jrh-fab{position:fixed;bottom:20px;right:18px;z-index:8000;display:flex;flex-direction:column;gap:8px;align-items:flex-end;}.jrh-fb-fab{padding:9px 14px;border:none;border-radius:24px;cursor:pointer;font-size:12.5px;font-weight:700;box-shadow:0 3px 12px rgba(0,0,0,.18);display:flex;align-items:center;gap:6px;white-space:nowrap;transition:transform .15s;}.jrh-fb-fab:hover{transform:scale(1.05);}#jrh-fab-fb{background:#0b1f3a;color:#f5f3ee;}#jrh-fab-ko{background:#ff5722;color:#fff;text-decoration:none;}@media print{#jrh-fab{display:none!important;}}';document.head.appendChild(s);}function showEmailModal(onPass){injectStyles();var ov=document.createElement('div');ov.id='jrh-ov';ov.innerHTML='<div id="jrh-box"><h2>🔓 解鎖完整功能</h2><p class="sub">輸入 Email 即可使用所有功能，<b>完全免費</b>。<br>同個瀏覽器只需輸入一次，跨工具共用。</p><div class="jrh-item"><span class="ck">✓</span>高品質 PDF 送審報告輸出</div><div class="jrh-item"><span class="ck">✓</span>新工具上線優先通知</div><div class="jrh-item"><span class="ck">✓</span>優先收到功能改善回報管道</div><input id="jrh-inp" type="email" placeholder="your@email.com" autocomplete="email"><div id="jrh-errmsg"></div><button id="jrh-btn">確認，繼續使用 →</button><span id="jrh-skip">略過（功能將受限）</span></div>';document.body.appendChild(ov);var inp=document.getElementById('jrh-inp'),err=document.getElementById('jrh-errmsg');inp.focus();function submit(){var v=inp.value.trim();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){inp.classList.add('err');err.textContent='請輸入有效的 Email 格式';return;}localStorage.setItem(EMAIL_KEY,v);sendEmail(v,document.title);ov.remove();onPass();}document.getElementById('jrh-btn').addEventListener('click',submit);inp.addEventListener('keydown',function(e){if(e.key==='Enter')submit();});inp.addEventListener('input',function(){inp.classList.remove('err');err.textContent='';});document.getElementById('jrh-skip').addEventListener('click',function(){ov.remove();onPass();});}function showFeedback(){injectStyles();if(document.getElementById('jrh-fb-ov'))return;var ov=document.createElement('div');ov.id='jrh-fb-ov';ov.innerHTML='<div id="jrh-fb-box"><h3>💬 意見回饋</h3><p class="desc">遇到問題、想要的功能、或任何想說的——都歡迎！<br>你的回饋直接幫助工具變得更好。</p><textarea id="jrh-fb-ta" placeholder="例如：希望可以匯出 Excel、某個計算結果好像不對..."></textarea><div class="jrh-fb-row"><button id="jrh-fb-ok">送出回饋</button><button id="jrh-fb-cl">取消</button></div><div id="jrh-fb-msg"></div></div>';document.body.appendChild(ov);document.getElementById('jrh-fb-cl').addEventListener('click',function(){ov.remove();});ov.addEventListener('click',function(e){if(e.target===ov)ov.remove();});document.getElementById('jrh-fb-ok').addEventListener('click',function(){var msg=document.getElementById('jrh-fb-ta').value.trim();if(!msg){document.getElementById('jrh-fb-msg').textContent='請輸入內容再送出。';return;}gasGet({type:'feedback',email:stored(),tool:document.title,msg:msg});document.getElementById('jrh-fb-msg').style.color='#1a6e35';document.getElementById('jrh-fb-msg').textContent='✔ 已送出，感謝你的回饋！';document.getElementById('jrh-fb-ok').disabled=true;setTimeout(function(){ov.remove();},1800);});}function injectFAB(){if(document.getElementById('jrh-fab'))return;injectStyles();var fab=document.createElement('div');fab.id='jrh-fab';fab.innerHTML='<button class="jrh-fb-fab" id="jrh-fab-fb">💬 意見回饋</button><a class="jrh-fb-fab" id="jrh-fab-ko" href="'+KOFI_URL+'" target="_blank" rel="noopener">☕ 贊助支持</a>';document.body.appendChild(fab);document.getElementById('jrh-fab-fb').addEventListener('click',showFeedback);}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',injectFAB);}else{injectFAB();}global.JRH={checkEmail:function(onPass){if(stored()){onPass();return;}showEmailModal(onPass);},getEmail:function(){return stored();},showFeedback:showFeedback,reset:function(){localStorage.removeItem(EMAIL_KEY);Object.keys(localStorage).filter(function(k){return k.indexOf(SENT_KEY)===0;}).forEach(function(k){localStorage.removeItem(k);});}};})(window);

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
  var el=document.getElementById('pj-name');
  var pj=(el&&el.value.trim())||'未命名工程';
  var d=new Date();
  var ds=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  var old=document.title;
  document.title=pj+'_'+(docName||old.split('|')[0].trim())+'_'+ds;
  window.addEventListener('afterprint',function(){document.title=old;},{once:true});
  window.print();
};
