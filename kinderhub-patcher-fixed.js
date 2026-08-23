(async()=>{
  try{
    window.byId = window.byId || ((id)=>document.getElementById(id));
    const [baseRes, patchRes]=await Promise.all([fetch('/base.html?v=20260822b',{cache:'no-store'}),fetch('/kinderhub-patcher.js?v=20260822b',{cache:'no-store'})]);
    if(!baseRes.ok) throw new Error('base.html '+baseRes.status); if(!patchRes.ok) throw new Error('patcher '+patchRes.status);
    let html=await baseRes.text(); const patchSource=await patchRes.text(); const m=patchSource.match(/const b64='([^']+)'/); if(!m) throw new Error('patch payload not found');
    const bin=Uint8Array.from(atob(m[1]),c=>c.charCodeAt(0)); const ds=new DecompressionStream('gzip'); const text=await new Response(new Blob([bin]).stream().pipeThrough(ds)).text(); const ops=JSON.parse(text);
    let chars=Array.from(html); for(let i=ops.length-1;i>=0;i--){const [a,b,s]=ops[i];chars=chars.slice(0,a).concat(Array.from(s),chars.slice(b));} html=chars.join('');
    const safetyScript=`<script id="kh-network-safety">\n(function(){\nwindow.escapeHtml=window.escapeHtml||function(value){return String(value??'').replace(/[&<>\"']/g,function(char){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',\"'\":'&#39;'}[char];});};\nconst nativeFetch=window.fetch.bind(window);window.fetch=function(input,init){init=init||{};if(init.signal)return nativeFetch(input,init);const controller=new AbortController();const t=setTimeout(()=>controller.abort(),12000);return nativeFetch(input,Object.assign({},init,{signal:controller.signal})).finally(()=>clearTimeout(t));};setTimeout(function(){const loading=document.getElementById('view-loading');if(loading&&!loading.classList.contains('hidden')){try{localStorage.removeItem('kinderhub_supabase_session_v1')}catch(_e){}const auth=document.getElementById('view-auth');if(auth){loading.classList.add('hidden');auth.classList.remove('hidden');document.body.classList.remove('app-in');const msg=document.getElementById('auth-msg');if(msg){msg.textContent='Холболт удааширлаа. Дахин нэвтэрнэ үү.';msg.className='msg show err';}}}},15000);\n})();\n<\/script>`;
    html=html.replace('</head>',safetyScript+'\n</head>');
    html=html.replace(/getSession:\s*async\(\)=>\{[\s\S]*?return \{data:\{session:s\},error:null\};\s*\},/,`getSession: async()=>{\nlet s=loadSession();if(s&&s.expires_at&&Date.now()/1000>s.expires_at-30){if(s.refresh_token){const rr=await Promise.race([this._auth('/token?grant_type=refresh_token',{refresh_token:s.refresh_token}),new Promise(resolve=>setTimeout(()=>resolve({error:{message:'refresh timeout'}}),9000))]);if(!rr.error&&rr.data){s=rr.data;saveSession(s)}else{saveSession(null);s=null}}else{saveSession(null);s=null}}return {data:{session:s},error:null};\n},`);
    html=html.replace("if(n1)n1.onclick=openNetwork;", "if(n1&&typeof openNetwork==='function')n1.onclick=openNetwork;");
    html=html.replace("if(n2)n2.onclick=openSupport;", "if(n2&&typeof openSupport==='function')n2.onclick=openSupport;");
    html=html.replace("if(send)send.onclick=sendMessage;", "if(send&&typeof sendMessage==='function')send.onclick=sendMessage;");
    html=html.replace("if(add)add.onclick=newChannel;", "if(add&&typeof newChannel==='function')add.onclick=newChannel;");
    html=html.replace("if(sup)sup.onclick=createSupport;", "if(sup&&typeof createSupport==='function')sup.onclick=createSupport;");
    html=html.replace("if(supSend)supSend.onclick=sendSupportReply;", "if(supSend&&typeof sendSupportReply==='function')supSend.onclick=sendSupportReply;");
    html=html.replace('</body>','<script src="/kinderhub-v2-ui.js?v=20260823v13"></'+'script></body>');
    document.open();document.write(html);document.close();
  }catch(e){console.error('KinderHub patch load failed',e);document.body.innerHTML='<main style="font-family:system-ui;padding:24px"><h2>KinderHub ачаалж чадсангүй</h2><p>'+String(e?.message||e)+'</p><button onclick="location.reload()" style="padding:10px 16px;border:0;border-radius:12px;background:#14b8a6;color:white;font-weight:700">Дахин ачаалах</button></main>';}
})();

