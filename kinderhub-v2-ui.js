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
function polish(){renameText();wireDrawer();addExplanations();fixSudUX()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',polish);else polish();
new MutationObserver(()=>{clearTimeout(window.__khv2t);window.__khv2t=setTimeout(polish,80)}).observe(document.documentElement,{subtree:true,childList:true});
})();