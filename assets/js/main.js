document.getElementById("ldImg").src=document.querySelector(".logo img").src;

(function(){
 var WHATSAPP="5511992584518", MSG="Olá! Acessei o site da Oficina XV Motos e gostaria de solicitar um orçamento para minha motocicleta."; /* WhatsApp: DDI + número, só dígitos */
 var d=document,h=d.getElementById("hdr"),b=d.getElementById("burger"),n=d.getElementById("nav"),v=d.getElementById("hv");
 d.getElementById("yr").textContent=new Date().getFullYear();
 if(WHATSAPP){d.documentElement.classList.add("wa");d.querySelectorAll("[data-quote]").forEach(function(a){a.href="https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent(MSG);a.target="_blank";a.rel="noopener"})}
 var pg=d.getElementById("prog");function sc(){h.classList.toggle("solid",window.scrollY>40);var m=d.documentElement.scrollHeight-innerHeight;pg.style.transform="scaleX("+(m>0?Math.min(scrollY/m,1):0)+")"}sc();addEventListener("scroll",sc,{passive:true});
 function tog(o){d.body.classList.toggle("menu-open",o);b.setAttribute("aria-expanded",o);b.setAttribute("aria-label",o?"Fechar menu":"Abrir menu");d.body.style.overflow=o?"hidden":""}
 b.addEventListener("click",function(){tog(!d.body.classList.contains("menu-open"))});
 n.addEventListener("click",function(e){if(e.target.closest("a"))tog(false)});
 addEventListener("keydown",function(e){if(e.key==="Escape")tog(false)});
 addEventListener("resize",function(){if(innerWidth>960)tog(false)});
 // destaque do link ativo
 var links=[].slice.call(n.querySelectorAll("a:not(.btn)"));
 if("IntersectionObserver" in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)links.forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+e.target.id)})})},{rootMargin:"-45% 0px -50% 0px"});
  d.querySelectorAll("main>section").forEach(function(s){io.observe(s)});
  // pausa o vídeo fora da tela
  new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var p=v.play();p&&p.catch(function(){})}else v.pause()})},{threshold:.05}).observe(v);
 }
 v.muted=true;var p=v.play();p&&p.catch(function(){});
 // Carregamento: progresso real, sem espera artificial
 var ld=d.getElementById("ld"),fill=d.getElementById("ldFill"),done=false,t0=Date.now();
 function pr(x){fill.style.transform="scaleX("+x+")"}
 function fin(){if(done)return;done=true;pr(1);setTimeout(function(){ld.classList.add("out");d.documentElement.classList.remove("ld");setTimeout(function(){ld.remove()},600)},300)}
 function chk(){if(!done&&d.readyState==="complete"&&(v.readyState>=2||Date.now()-t0>1800))fin()}
 pr(.35);if(v.readyState>=2)pr(.7);
 v.addEventListener("loadeddata",function(){pr(.7);chk()});
 addEventListener("load",function(){pr(.9);chk();setTimeout(chk,1800)});
 if(d.readyState==="complete")chk();
 setTimeout(fin,4000);
 // Revelação suave ao rolar
 var rv=[].slice.call(d.querySelectorAll(".rv"));
 rv.forEach(function(e){e.classList.add("rv")});
 if("IntersectionObserver" in window){
  var ro=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");ro.unobserve(e.target)}})},{rootMargin:"0px 0px -12% 0px"});
  rv.forEach(function(e){ro.observe(e)});d.querySelectorAll(".sec").forEach(function(e){ro.observe(e)});
 }else{rv.forEach(function(e){e.classList.add("in")});d.querySelectorAll(".sec").forEach(function(e){e.classList.add("in")})}
})();;

// Parallax leve na foto da fachada (só quando visível; respeita prefers-reduced-motion)
(function(){
 if(!("IntersectionObserver" in window)||matchMedia("(prefers-reduced-motion:reduce)").matches)return;
 var els=[].slice.call(document.querySelectorAll(".px")),vis=new Set(),t=false;
 function up(){t=false;var vh=innerHeight;vis.forEach(function(f){var r=f.getBoundingClientRect(),k=((r.top+r.height/2)-vh/2)/vh;f.querySelector("img").style.setProperty("--py",(k*-14).toFixed(1)+"px")})}
 function req(){if(!t){t=true;requestAnimationFrame(up)}}
 var o=new IntersectionObserver(function(es){es.forEach(function(e){e.isIntersecting?vis.add(e.target):vis.delete(e.target)});req()},{rootMargin:"10% 0px"});
 els.forEach(function(f){o.observe(f)});addEventListener("scroll",req,{passive:true});addEventListener("resize",req);
})();;

// Cursor moto: apenas mouse, sem interferir nos cliques. Em touch ou movimento reduzido, fica o cursor convencional.
(function(){
 if(!matchMedia("(hover:hover) and (pointer:fine)").matches||matchMedia("(prefers-reduced-motion:reduce)").matches)return;
 var c=document.getElementById("cur");if(!c)return;
 var cl=c.firstElementChild,sp=c.querySelectorAll(".sp"),
  tx=0,ty=0,x=0,y=0,px=0,py=0,vx=0,vy=0,dir=1,face=1,lean=0,wheel=0,flipT=0,last=0,raf=0,seen=false;
 var OX=20,OY=16; // posição da moto em relação à ponta do cursor
 function clamp(v,a,b){return v<a?a:v>b?b:v}
 function frame(now){
  var dt=Math.min((now-last)/1000,.05);last=now;
  if(dt<=0){raf=requestAnimationFrame(frame);return}
  // seguimento suave e independente da taxa de quadros
  var k=1-Math.exp(-dt/.09);x+=(tx-x)*k;y+=(ty-y)*k;
  // velocidade filtrada (evita tremor)
  var kv=1-Math.exp(-dt/.12);
  vx+=((x-px)/dt-vx)*kv;vy+=((y-py)/dt-vy)*kv;px=x;py=y;
  // vira a moto só com movimento horizontal claro (histerese + intervalo mínimo)
  flipT+=dt;
  if(flipT>.35&&Math.abs(vx)>110&&(vx>0?1:-1)!==dir){dir=vx>0?1:-1;flipT=0}
  face+=(dir-face)*(1-Math.exp(-dt/.07));
  // inclinação discreta (máx. 4°), suavizada
  var sp2=Math.hypot(vx,vy),lt=-dir*clamp(sp2/900,0,1)*4;
  lean+=(lt-lean)*(1-Math.exp(-dt/.15));
  // rodas giram conforme a velocidade
  var sg=(vx*dir<-30)?-1:1;wheel=(wheel+sg*sp2*dt/9*57.3)%360;
  c.style.transform="translate3d("+(x+OX-22).toFixed(2)+"px,"+(y+OY-14).toFixed(2)+"px,0)";
  cl.style.transform="rotate("+lean.toFixed(2)+"deg) scaleX("+face.toFixed(3)+")";
  for(var i=0;i<sp.length;i++)sp[i].style.transform="rotate("+wheel.toFixed(1)+"deg)";
  // para o laço quando tudo estabilizou
  if(Math.abs(tx-x)<.05&&Math.abs(ty-y)<.05&&sp2<1&&Math.abs(lean)<.02&&Math.abs(dir-face)<.002){raf=0;return}
  raf=requestAnimationFrame(frame);
 }
 addEventListener("pointermove",function(e){
  if(e.pointerType&&e.pointerType!=="mouse")return;
  tx=e.clientX;ty=e.clientY;
  if(!seen){seen=true;x=px=tx;y=py=ty;vx=vy=0}
  c.classList.add("on");
  if(!raf){last=performance.now();raf=requestAnimationFrame(frame)}
 },{passive:true});
 document.documentElement.addEventListener("mouseleave",function(){c.classList.remove("on")});
 document.documentElement.addEventListener("mouseenter",function(){if(seen)c.classList.add("on")});
 document.addEventListener("visibilitychange",function(){if(document.hidden)c.classList.remove("on")});
})();;

// Galeria: ampliar ao clicar (teclado: Esc, setas; toque: deslizar)
(function(){
 var d=document,items=[].slice.call(d.querySelectorAll(".gl-i")),lb=d.getElementById("lb"),im=d.getElementById("lbImg");
 if(!items.length||!lb)return;
 var cur=0,last=null,x0=null;
 function show(i){cur=(i+items.length)%items.length;var s=items[cur].querySelector("img");im.src=s.src;im.alt=s.alt}
 function open(i){last=d.activeElement;show(i);lb.classList.add("open");lb.setAttribute("aria-hidden","false");d.body.style.overflow="hidden";lb.querySelector(".lb-x").focus()}
 function close(){if(!lb.classList.contains("open"))return;lb.classList.remove("open");lb.setAttribute("aria-hidden","true");d.body.style.overflow="";if(last)last.focus()}
 items.forEach(function(b,i){b.addEventListener("click",function(){open(i)})});
 lb.querySelector(".lb-x").addEventListener("click",close);
 lb.querySelector(".lb-p").addEventListener("click",function(){show(cur-1)});
 lb.querySelector(".lb-n").addEventListener("click",function(){show(cur+1)});
 lb.addEventListener("click",function(e){if(e.target===lb)close()});
 addEventListener("keydown",function(e){if(!lb.classList.contains("open"))return;if(e.key==="Escape")close();else if(e.key==="ArrowLeft")show(cur-1);else if(e.key==="ArrowRight")show(cur+1);else if(e.key==="Tab"){var f=[].slice.call(lb.querySelectorAll("button")),a=d.activeElement,k=f.indexOf(a);e.preventDefault();f[(k+(e.shiftKey?-1:1)+f.length)%f.length].focus()}});
 lb.addEventListener("touchstart",function(e){x0=e.touches[0].clientX},{passive:true});
 lb.addEventListener("touchend",function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>50)show(cur+(dx<0?1:-1))},{passive:true});
})();
