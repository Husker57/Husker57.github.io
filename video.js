(function(){
  const shots=["photos/weld.svg","photos/cdl.svg"];
  window.OFALLON_VIDEO=null;
  window.startOFallonVideo=function(vid,hero){
    if(!vid||!hero) return;
    const canvas=document.createElement("canvas");
    canvas.width=1280; canvas.height=720;
    canvas.setAttribute("aria-hidden","true");
    canvas.style.cssText="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1";
    vid.style.display="none";
    if(vid.parentNode) vid.parentNode.appendChild(canvas);
    const ctx=canvas.getContext("2d");
    const imgs=shots.map(function(src){ const i=new Image(); i.src=src; return i; });
    var t0=performance.now();
    function frame(now){
      const t=(now-t0)/1000;
      const slot=Math.floor(t/6)%imgs.length;
      const img=imgs[slot];
      const local=(t%6)/6;
      if(img && img.complete && img.naturalWidth){
        const z=1+local*0.08;
        const w=canvas.width*z, h=canvas.height*z;
        const x=(canvas.width-w)/2, y=(canvas.height-h)/2;
        ctx.fillStyle="#04190C"; ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(img,x,y,w,h);
        hero.classList.add("has-video");
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  };
})();
