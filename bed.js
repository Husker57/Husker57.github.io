window.OFALLON_BED=null;
window.startOFallonSound=function(){
  if(window._ofCtx){ if(window._ofCtx.state==='suspended') window._ofCtx.resume(); return; }
  var C=window.AudioContext||window.webkitAudioContext; if(!C) return;
  var ctx=new C(); window._ofCtx=ctx;
  function tone(freq,type,gain,lfoRate){
    var o=ctx.createOscillator(); var g=ctx.createGain(); var l=ctx.createOscillator(); var lg=ctx.createGain();
    o.type=type; o.frequency.value=freq; g.gain.value=gain;
    l.type='sine'; l.frequency.value=lfoRate; lg.gain.value=freq*0.012;
    l.connect(lg); lg.connect(o.frequency); o.connect(g); g.connect(ctx.destination);
    o.start(); l.start();
  }
  tone(92,'sine',0.05,0.11);
  tone(138,'triangle',0.03,0.07);
  tone(220,'sine',0.018,0.19);
};
window.stopOFallonSound=function(){ if(window._ofCtx){ window._ofCtx.close(); window._ofCtx=null; } };
