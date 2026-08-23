(()=>{
const css=`
:root{--kh-teal:#0b9f98;--kh-deep:#173b3a;--kh-glass:rgba(255,255,255,.72);--kh-border:rgba(255,255,255,.78);--kh-shadow:0 18px 55px rgba(48,70,85,.12)}
body{background-image:radial-gradient(circle at 12% 8%,rgba(117,230,213,.24),transparent 28%),radial-gradient(circle at 88% 12%,rgba(190,178,255,.22),transparent 30%),radial-gradient(circle at 82% 88%,rgba(255,203,184,.20),transparent 30%)!important}
.hero,.b-card,.panel,.card,.stat{border:1px solid var(--kh-border)!important;box-shadow:var(--kh-shadow)!important;backdrop-filter:blur(26px) saturate(145%)!important;-webkit-backdrop-filter:blur(26px) saturate(145%)!important}
.hero{background:linear-gradient(135deg,rgba(255,255,255,.82),rgba(190,246,237,.62),rgba(224,217,255,.60))!important}
.sidebar{background:rgba(250,253,253,.80)!important;backdrop-filter:blur(30px) saturate(150%)!important;-webkit-backdrop-filter:blur(30px) saturate(150%)!important}
/* Never allow segmented navigation labels to collide */
.tabs,.seg,.segments,.tab-row,.plan-tabs,[role=tablist]{display:flex!important;flex-wrap:nowrap!important;overflow-x:auto!important;overflow-y:hidden!important;gap:8px!important;scrollbar-width:none;-webkit-overflow-scrolling:touch}
.tabs::-webkit-scrollbar,.seg::-webkit-scrollbar,.segments::-webkit-scrollbar,.tab-row::-webkit-scrollbar,.plan-tabs::-webkit-scrollbar,[role=tablist]::-webkit-scrollbar{display:none}
.tabs>* ,.seg>* ,.segments>* ,.tab-row>* ,.plan-tabs>* ,[role=tablist]>*{flex:0 0 auto!important;white-space:nowrap!important;min-width:max-content!important}
/* mobile drawer */
@media(max-width:899px){
 body.app-in .sidebar{display:flex!important;position:fixed!important;z-index:100!important;left:10px!important;top:10px!important;bottom:10px!important;width:min(82vw,310px)!important;height:auto!important;margin:0!important;transform:translateX(calc(-100% - 28px));transition:transform .28s cubic-bezier(.22,1,.36,1)!important;box-shadow:0 30px 80px rgba(20,40,50,.28)!important}
 body.sb-open .sidebar,body.sidebar-open .sidebar{transform:translateX(0)!important}
 .sb-backdrop{display:block!important;position:fixed!important;inset:0!important;z-index:90!important;background:rgba(22,38,42,.26)!important;backdrop-filter:blur(5px)!important;-webkit-backdrop-filter:blur(5px)!important;opacity:0!important;pointer-events:none!important;transition:opacity .25s!important}
 body.sb-open .sb-backdrop,body.sidebar-open .sb-backdrop{opacity:1!important;pointer-events:auto!important}
 .topbar{display:flex!important}
 body.app-in .wrap{padding:14px 18px 118px!important;max-width:680px!important}
 .hero{padding:22px!important;border-radius:28px!important}
 .bento{grid-template-columns:1fr!important}
 .b-wide{grid-column:auto!important}
 .dock{left:18px!important;right:18px!important;bottom:max(14px,env(safe-area-inset-bottom))!important;border-radius:28px!important;background:rgba(250,253,253,.84)!important;border:1px solid rgba(255,255,255,.9)!important;box-shadow:0 16px 48px rgba(30,60,70,.16)!important;backdrop-filter:blur(28px) saturate(160%)!important;-webkit-backdrop-filter:blur(28px) saturate(160%)!important}
 .modal,.modal-card,.sheet,.dialog{max-width:calc(100vw - 28px)!important}
 h1,h2,h3,.hero-title{overflow-wrap:anywhere}
}
@media(min-width:900px){body.app-in .wrap{max-width:1180px!important}.sidebar{width:218px!important;flex-basis:218px!important}.bento{grid-template-columns:repeat(4,minmax(0,1fr))!important}.b-wide{grid-column:span 2!important}}
/* KinderHub Aurora design system */
:root{--kh-ink:#152f35;--kh-muted:#718188;--kh-mint:#66d9c9;--kh-lilac:#b8a8ff;--kh-peach:#ffc9b5;--kh-surface:rgba(255,255,255,.68);--kh-stroke:rgba(255,255,255,.86);--kh-card-shadow:0 18px 50px rgba(56,72,92,.10)}
body{color:var(--kh-ink)!important;background-color:#f5f6fb!important;background-image:radial-gradient(circle at 24% 0,rgba(196,189,255,.32),transparent 34%),radial-gradient(circle at 82% 16%,rgba(145,239,224,.28),transparent 32%),radial-gradient(circle at 75% 92%,rgba(255,205,188,.26),transparent 34%)!important;background-attachment:fixed!important}
.wrap{position:relative;z-index:1}
.ref-dashboard{max-width:1120px;margin:0 auto}
.ref-topline{margin-bottom:18px!important;align-items:center!important}.ref-greeting{font-size:30px!important;font-weight:850!important;color:var(--kh-ink)!important}.ref-subline{font-size:12px!important;color:var(--kh-muted)!important}.ref-date{background:rgba(255,255,255,.58)!important;border:1px solid var(--kh-stroke)!important;box-shadow:0 8px 28px rgba(70,80,110,.08)!important;backdrop-filter:blur(18px)!important}
.ref-rhythm-card{border-radius:30px!important;border:1px solid var(--kh-stroke)!important;background:linear-gradient(120deg,rgba(255,255,255,.76),rgba(191,236,255,.62) 30%,rgba(181,250,226,.55) 58%,rgba(225,207,255,.62))!important;box-shadow:0 22px 62px rgba(80,88,132,.14)!important;overflow:hidden!important;position:relative!important}
.ref-rhythm-card:after{content:"";position:absolute;inset:-40%;background:radial-gradient(circle,rgba(255,255,255,.72),transparent 32%);transform:translate(34%,-20%);pointer-events:none}
.ref-rhythm-copy,.ref-rhythm-art{position:relative;z-index:1}.ref-rhythm-label{font-size:18px!important;font-weight:850!important}.ref-rhythm-stats b{font-size:32px!important;letter-spacing:-.04em!important}.ref-primary{border-radius:999px!important;background:linear-gradient(135deg,#12a99d,#55ccb9)!important;box-shadow:0 12px 25px rgba(15,159,152,.24)!important;padding:12px 19px!important}
.ref-main-grid{gap:14px!important}.ref-card,.role-card,.analytics-card,.chart-card{background:var(--kh-surface)!important;border:1px solid var(--kh-stroke)!important;border-radius:24px!important;box-shadow:var(--kh-card-shadow)!important;backdrop-filter:blur(24px) saturate(145%)!important;-webkit-backdrop-filter:blur(24px) saturate(145%)!important}.ref-card{padding:18px!important}.ref-card-title{font-size:13px!important;font-weight:850!important;color:var(--kh-ink)!important}.ref-card p{color:var(--kh-muted)!important}.ref-ai-card{background:linear-gradient(145deg,rgba(255,255,255,.70),rgba(220,209,255,.64))!important}.ref-week-card{background:linear-gradient(145deg,rgba(255,255,255,.72),rgba(210,247,238,.62))!important}.ref-share{background:linear-gradient(145deg,rgba(255,255,255,.72),rgba(255,226,211,.55))!important}
.sidebar{border:1px solid rgba(255,255,255,.82)!important;border-radius:0 28px 28px 0!important;box-shadow:12px 0 45px rgba(74,85,110,.08)!important}.nav-item{border-radius:14px!important;margin:2px 8px!important}.nav-item.active{background:linear-gradient(135deg,rgba(205,247,238,.9),rgba(233,229,255,.76))!important;color:#087e77!important}
.dock{grid-template-columns:repeat(5,minmax(0,1fr))!important;align-items:center!important;overflow:visible!important}.kh-quick-trigger{width:58px!important;height:58px!important;border:0!important;border-radius:50%!important;margin:-30px auto 0!important;background:radial-gradient(circle at 35% 28%,#fff 0 8%,#7ce0d2 32%,#9d8cff 74%,#785ee8 100%)!important;color:#fff!important;font-size:30px!important;font-weight:300!important;box-shadow:0 0 0 8px rgba(255,255,255,.68),0 14px 34px rgba(105,86,220,.35)!important;display:grid!important;place-items:center!important;cursor:pointer!important;transition:.25s ease!important}.kh-quick-trigger:hover{transform:translateY(-3px) rotate(45deg)}
.kh-quick-overlay{position:fixed;inset:0;z-index:140;display:grid;place-items:center;padding:20px;background:rgba(35,43,58,.22);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);opacity:0;pointer-events:none;transition:.25s ease}.kh-quick-overlay.open{opacity:1;pointer-events:auto}.kh-quick-panel{width:min(390px,calc(100vw - 30px));min-height:500px;border-radius:32px;padding:22px;background:linear-gradient(155deg,rgba(255,255,255,.86),rgba(238,242,255,.80));border:1px solid rgba(255,255,255,.92);box-shadow:0 32px 90px rgba(48,55,85,.24);position:relative;overflow:hidden}.kh-quick-panel:before{content:"";position:absolute;inset:15% -30% -15%;background:radial-gradient(circle at 40% 42%,rgba(132,235,220,.62),transparent 24%),radial-gradient(circle at 62% 48%,rgba(178,154,255,.62),transparent 27%),radial-gradient(circle at 60% 80%,rgba(255,198,172,.52),transparent 28%);filter:blur(20px)}.kh-quick-head,.kh-quick-actions,.kh-quick-close{position:relative;z-index:1}.kh-quick-head{text-align:center;font-size:14px;font-weight:850;margin:10px 0}.kh-quick-close{position:absolute;left:18px;top:18px;width:38px;height:38px;border:0;border-radius:50%;background:rgba(255,255,255,.66);font-size:22px;color:#55616a}.kh-quick-actions{height:410px;position:relative}.kh-action{position:absolute;width:82px;border:0;background:transparent;color:var(--kh-ink);font-size:11px;font-weight:800;cursor:pointer}.kh-action i{width:64px;height:64px;margin:0 auto 8px;border-radius:50%;display:grid;place-items:center;font-style:normal;font-size:25px;background:rgba(255,255,255,.62);border:1px solid rgba(255,255,255,.86);box-shadow:0 12px 28px rgba(76,78,115,.14)}.kh-action:nth-child(1){left:12px;top:112px}.kh-action:nth-child(2){right:12px;top:112px}.kh-action:nth-child(3){left:50%;top:46px;transform:translateX(-50%)}.kh-action:nth-child(4){left:42px;bottom:28px}.kh-action:nth-child(5){right:42px;bottom:28px}.kh-action:nth-child(3) i{width:78px;height:78px;font-size:36px;background:radial-gradient(circle at 35% 25%,#fff,#9be8dd 30%,#aa94ff 72%);color:white;box-shadow:0 15px 35px rgba(117,90,224,.28)}
@media(max-width:899px){.ref-greeting{font-size:24px!important}.ref-rhythm-card{border-radius:25px!important}.ref-rhythm-copy{padding:20px!important}.ref-rhythm-stats{display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:10px!important}.ref-rhythm-stats b{font-size:26px!important}.ref-main-grid{grid-template-columns:1fr!important}.dock{padding:10px 7px!important}.dock-item span{font-size:9px!important}}
`;
const st=document.createElement('style');st.id='kh-v2-style';st.textContent=css;document.head.appendChild(st);

function renameText(){
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 const repl=[['Smart Document','Ухаалаг бичиг баримт'],['Learning Thread','Сонирхлын мөр'],['learning thread','сонирхлын мөр']];
 let n;while(n=walker.nextNode()){if(!n.parentElement||/SCRIPT|STYLE/.test(n.parentElement.tagName))continue;let s=n.nodeValue;for(const [a,b] of repl)s=s.split(a).join(b);if(s!==n.nodeValue)n.nodeValue=s;}
}
function wireDrawer(){
 let back=document.querySelector('.sb-backdrop');if(!back){back=document.createElement('div');back.className='sb-backdrop';document.body.appendChild(back)}
 const close=()=>document.body.classList.remove('sb-open','sidebar-open');
 back.onclick=close;
 document.querySelectorAll('.hamburger').forEach(b=>{b.onclick=(e)=>{e.preventDefault();e.stopPropagation();document.body.classList.toggle('sb-open')}});
 document.querySelectorAll('.sidebar .nav-item').forEach(b=>b.addEventListener('click',()=>{if(innerWidth<900)close()}));
}
function addExplanations(){
 document.querySelectorAll('button,a,h1,h2,h3,.b-title,.title').forEach(el=>{
  const t=(el.textContent||'').trim();
  if(t==='Ухаалаг бичиг баримт'&&!el.dataset.khTip){el.dataset.khTip='1';el.title='Оруулсан мэдээллээс тайлан, төлөвлөгөө, тэмдэглэлийн ноорог автоматаар үүсгэнэ.'}
  if(t==='Сонирхлын мөр'&&!el.dataset.khTip){el.dataset.khTip='1';el.title='Хүүхдийн асуулт, туршлага, ажиглалт, дараагийн алхмыг нэг урсгалд холбоно.'}
 });
}
function fixSudUX(){
 const all=[...document.querySelectorAll('input')];
 all.forEach(inp=>{const p=(inp.placeholder||'').toLowerCase();if(p.includes('код эсвэл түлхүүр')){inp.placeholder='Чиглэлээ сонгоод СҮД-ээ сонгоно';inp.readOnly=true;inp.style.display='none';}});
 const heads=[...document.querySelectorAll('h1,h2,h3,h4,label,.title')].filter(x=>(x.textContent||'').includes('Зорилтот СҮД сонго'));
 heads.forEach(h=>{if(h.dataset.khSud)return;h.dataset.khSud='1';const note=document.createElement('div');note.className='kh-sud-note';note.textContent='① Хөгжлийн чиглэлээ сонгоно  →  ② Тухайн чиглэлийн СҮД-үүдээс сонгоно';note.style.cssText='margin:8px 0 14px;padding:11px 14px;border-radius:14px;background:rgba(15,159,152,.08);color:#087f78;font-size:13px;font-weight:700';h.insertAdjacentElement('afterend',note);});
}
function openViewFromQuick(view){
 const targets={attendance:'view-attendance',children:'view-children',activities:'view-experience',docs:'view-docs'};
 const id=targets[view];if(id&&typeof window.show==='function')window.show(id);
 else document.querySelector(`[data-view="${view}"]`)?.click();
}
function ensureQuickCapture(){
 const dock=document.querySelector('.dock');if(!dock)return;
 dock.querySelectorAll('#dock-orb,.dock-orb').forEach(old=>old.remove());
 if(dock.querySelector('.kh-quick-trigger'))return;
 const trigger=document.createElement('button');trigger.type='button';trigger.className='kh-quick-trigger';trigger.setAttribute('aria-label','Шуурхай нэмэх');trigger.textContent='+';
 const children=dock.children;dock.insertBefore(trigger,children[2]||null);
 const overlay=document.createElement('div');overlay.className='kh-quick-overlay';overlay.innerHTML=`<section class="kh-quick-panel" role="dialog" aria-modal="true" aria-label="Шуурхай нэмэх"><button class="kh-quick-close" aria-label="Хаах">×</button><div class="kh-quick-head">Шуурхай нэмэх</div><div class="kh-quick-actions"><button class="kh-action" data-kh-action="attendance"><i>✓</i>Ирц</button><button class="kh-action" data-kh-action="observation"><i>✎</i>Ажиглалт</button><button class="kh-action" data-kh-action="capture"><i>＋</i>Шинэ нэмэх</button><button class="kh-action" data-kh-action="activities"><i>✦</i>Үйл ажиллагаа</button><button class="kh-action" data-kh-action="docs"><i>▣</i>Баримт</button></div></section>`;
 document.body.appendChild(overlay);const close=()=>overlay.classList.remove('open');trigger.onclick=()=>overlay.classList.add('open');overlay.querySelector('.kh-quick-close').onclick=close;overlay.addEventListener('click',e=>{if(e.target===overlay)close()});
 overlay.querySelectorAll('[data-kh-action]').forEach(btn=>btn.onclick=()=>{const action=btn.dataset.khAction;close();if(action==='observation'){if(typeof window.openObservationLibrary==='function')window.openObservationLibrary();else openViewFromQuick('children')}else if(action==='capture'){document.getElementById('exp-new')?.click()||openViewFromQuick('activities')}else openViewFromQuick(action)});
}
function polish(){renameText();wireDrawer();addExplanations();fixSudUX();ensureQuickCapture()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',polish);else polish();
new MutationObserver(()=>{clearTimeout(window.__khv2t);window.__khv2t=setTimeout(polish,80)}).observe(document.documentElement,{subtree:true,childList:true});
})();

