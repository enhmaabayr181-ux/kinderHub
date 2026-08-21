(async()=>{
  try{
    // Expose DOM helper globally before the patched application boots.
    // Some feature scripts call byId outside the original closure.
    window.byId = window.byId || ((id)=>document.getElementById(id));

    const [baseRes, patchRes]=await Promise.all([
      fetch('/base.html?v=20260821',{cache:'no-store'}),
      fetch('/kinderhub-patcher.js?v=20260821',{cache:'no-store'})
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

    document.open();
    document.write(html);
    document.close();
  }catch(e){
    console.error('KinderHub patch load failed',e);
    document.body.innerHTML='<main style="font-family:system-ui;padding:24px"><h2>KinderHub ачаалж чадсангүй</h2><p>'+String(e?.message||e)+'</p><button onclick="location.reload()" style="padding:10px 16px;border:0;border-radius:12px;background:#14b8a6;color:white;font-weight:700">Дахин ачаалах</button></main>';
  }
})();
