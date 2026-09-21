window.OFALLON_PHOTOS = window.OFALLON_PHOTOS || {};
(function(){
  const P = window.OFALLON_PHOTOS || {};
  function apply(){
    document.querySelectorAll("[data-photo]").forEach(function(el){
      const key = el.getAttribute("data-photo");
      if(!P[key]) return;
      if(el.tagName === "IMG") el.src = P[key];
      else el.style.backgroundImage = "url("+P[key]+")";
    });
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply);
  else apply();
})();
