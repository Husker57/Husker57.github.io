(function(){
  window.OFALLON_VIDEO=null;
  window.startOFallonVideo=function(vid,hero){
    if(vid) vid.style.display="none";
    if(hero) hero.classList.remove("has-video");
  };
})();
