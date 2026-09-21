(function(){
  const shots=["photos/hero.svg?v=vis4","photos/engines.svg?v=vis4","photos/weld.svg?v=vis4","photos/cdl.svg?v=vis4"];
  if(!window.OFALLON_VIDEO) window.OFALLON_VIDEO="video/hero.mp4?v=vis4";
  window.startOFallonVideo=function(vid,hero){
    if(!vid||!hero) return;
    var used=false;
    function fallback(){
      if(used) return;
      used=true;
      vid.style.display="none";
      var canvas=document.createElement("canvas");
      canvas.width=960; canvas.height=540;
      canvas.setAttribute("aria-hidden","true");
      canvas.style.cssText="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1;pointer-events:none";
      if(vid.parentNode) vid.parentNode.appendChild(canvas);
      var ctx=canvas.getContext("2d");
      var imgs=shots.map(function(src){ var i=new Image(); i.src=src; return i; });
      var t0=performance.now();
      function frame(now){
        var t=(now-t0)/1000;
        var slot=Math.floor(t/4)%imgs.length;
        var img=imgs[slot];
        var local=(t%4)/4;
        if(img && img.complete && img.naturalWidth>8){
          var z=1+local*0.1;
          var w=canvas.width*z, h=canvas.height*z;
          var x=(canvas.width-w)/2, y=(canvas.height-h)/2;
          ctx.drawImage(img,x,y,w,h);
          hero.classList.add("has-video");
        }
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    try{
      vid.muted=true;
      vid.loop=true;
      vid.playsInline=true;
      vid.setAttribute("playsinline","");
      vid.src=window.OFALLON_VIDEO;
      vid.addEventListener("error", fallback);
      vid.addEventListener("loadeddata", function(){
        vid.play().then(function(){
          if(vid.videoWidth>8){ used=true; hero.classList.add("has-video"); }
          else fallback();
        }).catch(fallback);
      });
      setTimeout(function(){ if(!used) fallback(); }, 1800);
    }catch(e){ fallback(); }
  };
})();
