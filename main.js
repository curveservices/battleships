(()=>{"use strict";const e=class{constructor(e,t){this.name=e,this.length=t,this.hits=0,this.sunk=!1}hit(){this.hits+=1,this.hits===this.length&&(this.sunk=!0)}isSunk(){return this.sunk}};(()=>{const t=document.getElementById("gamesboard-container"),n=document.querySelector(".option-container"),r=document.getElementById("flip-button");let o=0;function s(){const e=Array.from(n.children);o=0===o?90:0,e.forEach((e=>e.style.transform=`rotate(${o}deg)`))}r.addEventListener("click",s),s();const a=10;function c(e,n){const r=document.createElement("div");r.classList.add("game-board"),r.style.background=e,r.id=n;for(let e=0;e<a*a;e++){const t=document.createElement("div");t.classList.add("block"),t.id=e,r.append(t)}t.append(r)}c("#0077be","player"),c("seagreen","computer");const i=[new e("destroyer",2),new e("submarine",3),new e("cruiser",3),new e("battleship",4),new e("carrier",5)];let l,d;function u(e,t,n,r){let o,s=t?n<=a*a-r.length?n:a*a-r.length:n<=a*a-a*r.length?n:n-r.length*a+a,c=[];for(let n=0;n<r.length;n++)t?c.push(e[Number(s)+n]):c.push(e[Number(s)+n*a]);t?c.every(((e,t)=>o=c[0].id%a!=a-(c.length-(t+1)))):c.every(((e,t)=>o=c[0].id<a*t+1+90));const i=c.every((e=>!e.classList.contains("taken")));return{shipBlocks:c,valid:o,notTaken:i}}function h(e,t,n){const r=document.querySelectorAll(`#${e} div`);let s=Math.random()<.5,c="player"===e?0===o:s,i=Math.floor(Math.random()*a*a),d=n||i;const{shipBlocks:m,valid:p,notTaken:f}=u(r,c,d,t);p&&f?m.forEach((e=>{e.classList.add(t.name),e.classList.add("taken")})):("computer"===e&&h(e,t,n),"player"===e&&(l=!0))}function m(e){l=!1,d=e.target}function p(e){e.preventDefault();const t=i[d.id];!function(e,t){const n=document.querySelectorAll("#player div");let r=0===o;const{shipBlocks:s,valid:a,notTaken:c}=u(n,r,e,t);a&&c&&s.forEach((e=>{e.classList.add("hover"),setTimeout((()=>e.classList.remove("hover")),500)}))}(e.target.id,t)}function f(e){const t=e.target.id;h("player",i[d.id],t),l||d.remove()}i.forEach((e=>h("computer",e))),Array.from(n.children).forEach((e=>e.addEventListener("dragstart",m))),document.querySelectorAll("#player div").forEach((e=>{e.addEventListener("dragover",p),e.addEventListener("drop",f)}))})(),console.log("Hello world")})();