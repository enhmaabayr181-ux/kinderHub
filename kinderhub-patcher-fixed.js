(async()=>{
  try{
    window.byId = window.byId || ((id)=>document.getElementById(id));

    const [baseRes, patchRes]=await Promise.all([
      fetch('/base.html?v=20260822b',{cache:'no-store'}),
      fetch('/kinderhub-patcher.js?v=20260822b',{cache:'no-store'})
    ]);
    if(!baseRes.ok) throw new Error('base.html '+baseRes.status);
    if(!patchRes.ok) throw new Error('patcher '+patchRes.status);

    let html=await baseRes.text();
    const patchSource=await patchRes.text();
    const m=patchSource.match(/const b64='([^']+)'/);
    if(!m) throw new Error('patch payload not found');

    const bin=Uint8Array.from(atob(m[1]),c=>c.charCodeAt(0));
    const ds=new DecompressionStream('gzip');
    const text=await new Response(new Blob([bin]).stream().pipeThrough(ds)).text();
    const ops=JSON.parse(text);

    let chars=Array.from(html);
    for(let i=ops.length-1;i>=0;i--){
      const [a,b,s]=ops[i];
      chars=chars.slice(0,a).concat(Array.from(s),chars.slice(b));
    }
    html=chars.join('');

    // Network safety: never leave the app on an endless loading screen.
    const safetyScript=`<script id="kh-network-safety">\n(function(){\n  const nativeFetch=window.fetch.bind(window);\n  window.fetch=function(input,init){\n    init=init||{};\n    if(init.signal) return nativeFetch(input,init);\n    const controller=new AbortController();\n    const t=setTimeout(()=>controller.abort(),12000);\n    return nativeFetch(input,Object.assign({},init,{signal:controller.signal})).finally(()=>clearTimeout(t));\n  };\n  setTimeout(function(){\n    const loading=document.getElementById('view-loading');\n    if(loading && !loading.classList.contains('hidden')){\n      try{ localStorage.removeItem('kinderhub_supabase_session_v1'); }catch(_e){}\n      const auth=document.getElementById('view-auth');\n      if(auth){\n        loading.classList.add('hidden');\n        auth.classList.remove('hidden');\n        document.body.classList.remove('app-in');\n        const msg=document.getElementById('auth-msg');\n        if(msg){ msg.textContent='Холболт удааширлаа. Дахин нэвтэрнэ үү.'; msg.className='msg show err'; }\n      }\n    }\n  },15000);\n})();\n<\/script>`;
    html=html.replace('</head>',safetyScript+'\n</head>');

    // If a stored session is expired and refresh fails/times out, clear it
    // instead of keeping route() waiting on a bad session forever.
    html=html.replace(
      /getSession:\s*async\(\)=>\{[\s\S]*?return \{data:\{session:s\},error:null\};\s*\},/,
      `getSession: async()=>{\n          let s=loadSession();\n          if (s && s.expires_at && Date.now()/1000 > s.expires_at-30){\n            if(s.refresh_token){\n              const rr = await Promise.race([\n                this._auth('/token?grant_type=refresh_token',{refresh_token:s.refresh_token}),\n                new Promise(resolve=>setTimeout(()=>resolve({error:{message:'refresh timeout'}}),9000))\n              ]);\n              if (!rr.error && rr.data){ s=rr.data; saveSession(s); }\n              else { saveSession(null); s=null; }\n            } else { saveSession(null); s=null; }\n          }\n          return {data:{session:s},error:null};\n        },`
    );

    document.open();
    document.write(html);
    document.close();
  }catch(e){
    console.error('KinderHub patch load failed',e);
    document.body.innerHTML='<main style="font-family:system-ui;padding:24px"><h2>KinderHub ачаалж чадсангүй</h2><p>'+String(e?.message||e)+'</p><button onclick="location.reload()" style="padding:10px 16px;border:0;border-radius:12px;background:#14b8a6;color:white;font-weight:700">Дахин ачаалах</button></main>';
  }
})();
