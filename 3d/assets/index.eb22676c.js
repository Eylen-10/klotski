import{o as _e,G as Qe,V as z,a as Ue,r as O,b as Ze,R as je,c as Ae,d as j,e as ne,u as V,f as ie,w as ea,g as aa,h as $,i as Me,v as ta,t as Se,F as na,j as ia,E as oa,O as ra,W as sa,P as la,S as ca,A as ua,k as da,B as L,M as d,l as f,Q as oe,m as b,n as T,_ as fa,p as va,q as wa,s as ha,x as pa,y as ma}from"./vendor.474eff62.js";const ga=function(){const q=document.createElement("link").relList;if(q&&q.supports&&q.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))g(c);new MutationObserver(c=>{for(const p of c)if(p.type==="childList")for(const m of p.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&g(m)}).observe(document,{childList:!0,subtree:!0});function v(c){const p={};return c.integrity&&(p.integrity=c.integrity),c.referrerpolicy&&(p.referrerPolicy=c.referrerpolicy),c.crossorigin==="use-credentials"?p.credentials="include":c.crossorigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function g(c){if(c.ep)return;c.ep=!0;const p=v(c);fetch(c.href,p)}};ga();const ya=$("div",{id:"canvas-frame"},null,-1),xa={key:0,class:"f1"},_a=ia("play"),Aa={class:"count"},Ma={setup(ee,{expose:q}){_e(()=>{}),window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,6e3/60)}}(),new Qe;var v,g,c,p=new z(30,30,0),m,R=new Ue,W=!1,x,u,E,D=O(null),y,A,M,S,C,w,I,P,B,k;Ze({A1:y,A2:M,A3:S,A4:C,B1:I,B2:P,B3:B,B4:k,C:A,D:w});var G=O(!1),re=O(0),ae=O(0);let h=["A1","A2","A3","A4","B1","B2","B3","B4","C","D"];var K=new z(1,0,0),Ie=new z(-1,0,0),X=new z(0,1,0),Y=new z(0,-1,0),H=new z(0,0,1),te=new z(0,0,-1),Pe=new je,se=[];async function Be(){Ee(),be(),Te(),De(),await He(),ge(),v.domElement.addEventListener("mousedown",le,!1),v.domElement.addEventListener("mousemove",ce,!1),v.domElement.addEventListener("mouseup",ue,!1),v.domElement.addEventListener("touchstart",le,!1),v.domElement.addEventListener("touchmove",ce,!1),v.domElement.addEventListener("touchend",ue,!1),window.addEventListener("keydown",Le,!1),U=new ra(N,v.domElement),U.target=new z(0,0,0)}function le(t){pe(t),!W&&x?(m=x.point,U.enabled=!1):U.enabled=!0}function ce(t){if(pe(t),x&&!W&&m&&(E=x.point,console.log("move",E,m),!E.equals(m))){W=!0;var e=E.sub(m),n=ke(e),i=qe(x,n);new Date().getTime(),window.requestAnimFrame(function(a){de(i,n,a,0)})}t.preventDefault()}function ue(){x=null,m=null}function ke(t){var e,n=t.angleTo(K),i=t.angleTo(Ie),a=t.angleTo(X),s=t.angleTo(Y),o=t.angleTo(H),l=t.angleTo(te),r=he([n,i,a,s,o,l]);switch(r){case n:e=0,u.equals(X)?e=e+.1:u.equals(Y)?e=e+.2:u.equals(H)?e=e+.3:e=e+.4;break;case i:e=1,u.equals(X)?e=e+.1:u.equals(Y)?e=e+.2:u.equals(H)?e=e+.3:e=e+.4;break;case a:e=2,u.equals(H)?e=e+.1:u.equals(te)?e=e+.2:u.equals(K)?e=e+.3:e=e+.4;break;case s:e=3,u.equals(H)?e=e+.1:u.equals(te)?e=e+.2:u.equals(K)?e=e+.3:e=e+.4;break;case o:e=4,u.equals(X)?e=e+.1:u.equals(Y)?e=e+.2:u.equals(K)?e=e+.3:e=e+.4;break;case l:e=5,u.equals(X)?e=e+.1:u.equals(Y)?e=e+.2:u.equals(K)?e=e+.3:e=e+.4;break}return e}function qe(t,e){for(var n=t.object.cubeIndex,i=[],a=0;a<F.length;a++)i.push(F[a].cubeIndex);var s=he(i);n=n-s;var o=parseInt(n/9),l=n%9,r=[];switch(e){case .1:case .2:case 1.1:case 1.2:case 2.3:case 2.4:case 3.3:case 3.4:for(var a=0;a<F.length;a++){var Q=F[a].cubeIndex-s;o===parseInt(Q/9)&&r.push(F[a])}break;case .3:case .4:case 1.3:case 1.4:case 4.3:case 4.4:case 5.3:case 5.4:for(var a=0;a<F.length;a++){var Q=F[a].cubeIndex-s;parseInt(l/3)===parseInt(Q%9/3)&&r.push(F[a])}break;case 2.1:case 2.2:case 3.1:case 3.2:case 4.1:case 4.2:case 5.1:case 5.2:for(var a=0;a<F.length;a++){var Q=F[a].cubeIndex-s;Q%9%3==l%3&&r.push(F[a])}break}return r}function Fe(t){for(var e=0;e<t.length;e++)for(var n=t[e],i=0;i<se.length;i++){var a=se[i];if(Math.abs(n.position.x-a.x)<=cubeParams.len/2&&Math.abs(n.position.y-a.y)<=cubeParams.len/2&&Math.abs(n.position.z-a.z)<=cubeParams.len/2){n.cubeIndex=a.cubeIndex;break}}}function de(t,e,n,i,a){var s=500;switch(i===0&&(i=n,a=n),n-i>=s&&(n=i+s,W=!1,m=null,Fe(t)),e){case .1:case 1.2:case 2.4:case 3.3:for(var o=0;o<t.length;o++)ve(t[o],-90*Math.PI/180*(n-a)/s);break;case .2:case 1.1:case 2.3:case 3.4:for(var o=0;o<t.length;o++)ve(t[o],90*Math.PI/180*(n-a)/s);break;case .4:case 1.3:case 4.3:case 5.4:for(var o=0;o<t.length;o++)fe(t[o],-90*Math.PI/180*(n-a)/s);break;case 1.4:case .3:case 4.4:case 5.3:for(var o=0;o<t.length;o++)fe(t[o],90*Math.PI/180*(n-a)/s);break;case 2.2:case 3.1:case 4.1:case 5.2:for(var o=0;o<t.length;o++)we(t[o],90*Math.PI/180*(n-a)/s);break;case 2.1:case 3.2:case 4.2:case 5.1:for(var o=0;o<t.length;o++)we(t[o],-90*Math.PI/180*(n-a)/s);break}n-i<s&&window.requestAnimFrame(function(l){de(t,e,l,i,n)})}function fe(t,e){var n=t.position.x,i=t.position.z,a=new oe;a.setFromAxisAngle(new z(0,1,0),e),t.quaternion.premultiply(a),t.position.x=Math.cos(e)*n+Math.sin(e)*i,t.position.z=Math.cos(e)*i-Math.sin(e)*n}function ve(t,e){var n=t.position.x,i=t.position.y,a=new oe;a.setFromAxisAngle(new z(0,0,1),e),t.quaternion.premultiply(a),t.position.x=Math.cos(e)*n-Math.sin(e)*i,t.position.y=Math.cos(e)*i+Math.sin(e)*n}function we(t,e){var n=t.position.y,i=t.position.z,a=new oe;a.setFromAxisAngle(new z(1,0,0),e),t.quaternion.premultiply(a),t.position.y=Math.cos(e)*n-Math.sin(e)*i,t.position.z=Math.cos(e)*i+Math.sin(e)*n}function he(t){for(var e=t[0],n=1;n<t.length;n++)t[n]<e&&(e=t[n]);return e}function pe(t){if(t.touches){var e=t.touches[0];R.x=e.clientX/g*2-1,R.y=-(e.clientY/c)*2+1}else R.x=t.clientX/g*2-1,R.y=-(t.clientY/c)*2+1;ze()}function ze(){Pe.setFromCamera(R,N)}function Le(t){console.log(t.keyCode);let e=55;t.keyCode=="40"&&(w.rotation.z=Math.PI,w.position.x-=e),t.keyCode=="38"&&(w.rotation.z=0,w.position.x+=e),t.keyCode=="37"&&(w.rotation.z=-Math.PI/2,w.position.y-=e),t.keyCode=="39"&&(w.rotation.z=Math.PI/2,w.position.y+=e)}function Ee(){g=document.getElementsByClassName("main")[0].offsetWidth,c=document.getElementsByClassName("main")[0].offsetHeight-60,console.log("wh",g,c),v=new sa({alpha:!0,antialias:!0,precision:"highp"}),v.setSize(g,c),v.setClearAlpha(0),console.log(document.getElementById("canvas-frame")),document.getElementById("canvas-frame").appendChild(v.domElement)}var N,U;function be(){N=new la(50,g/c,.1,1e3),console.log(g/c),N.position.set(290,200,250),N.up.set(0,0,1),N.lookAt(p)}var _;function Te(){_=new ca}var me;function De(){me=new ua(16711422),_.add(me);var t=new da(16777215);t.position.set(200,150,-500),t.castShadow=!0,_.add(t)}var F;async function Ne(){let t=new b;var e=new d({color:485535});return await new Promise((n,i)=>{t.load("A.obj",function(a){a.traverse(function(r){r instanceof f&&(r.material=e)}),a.castShadow=!0,a.receiveShadow=!0,a.scale.set(.007,.007,.007);var s=new L(105,50,2),o=new d({color:485535}),l=new f(s,o);l.receiveShadow=!0,y=new T,y.add(a),y.add(l),y.position.x=-82.5,y.position.y=-110,y.position.z=0,y.width=50,y.height=105,n()})})}async function Oe(){let t=new b;var e=new d({color:485535});return await new Promise((n,i)=>{t.load("A.obj",function(a){a.traverse(function(r){r instanceof f&&(r.material=e)}),a.castShadow=!0,a.receiveShadow=!0,a.scale.set(.007,.007,.007);var s=new L(105,50,2),o=new d({color:485535}),l=new f(s,o);l.receiveShadow=!0,M=new T,M.add(a),M.add(l),M.position.x=-82.5,M.position.y=-110+55+55+55,M.position.z=0,M.width=50,M.height=105,n()})})}async function Re(){let t=new b;var e=new d({color:485535});return await new Promise((n,i)=>{t.load("A.obj",function(a){a.traverse(function(r){r instanceof f&&(r.material=e)}),a.castShadow=!0,a.receiveShadow=!0,a.scale.set(.005,.005,.005);var s=new L(105,50,2),o=new d({color:485535}),l=new f(s,o);l.receiveShadow=!0,S=new T,S.add(a),S.add(l),S.position.x=-82.5+110,S.position.y=-110,S.position.z=0,S.width=50,S.height=105,n()})})}async function Ve(){let t=new b;var e=new d({color:485535});return await new Promise((n,i)=>{t.load("A.obj",function(a){a.traverse(function(r){r instanceof f&&(r.material=e)}),a.castShadow=!0,a.receiveShadow=!0,a.scale.set(.007,.007,.007);var s=new L(105,50,2),o=new d({color:485535}),l=new f(s,o);l.receiveShadow=!0,C=new T,C.add(a),C.add(l),C.position.x=-82.5+110,C.position.y=-110+55+55+55,C.position.z=0,C.width=50,C.height=105,n()})})}async function $e(){let t=new b;var e=new d({color:485535});return await new Promise((n,i)=>{t.load("C.obj",function(a){a.traverse(function(r){r instanceof f&&(r.material=e)}),a.castShadow=!0,a.receiveShadow=!0,a.scale.set(.005,.005,.005);var s=new L(50,50,2),o=new d({color:485535}),l=new f(s,o);l.receiveShadow=!0,I=new T,I.add(a),I.add(l),I.position.x=-82.5+110+82.5,I.position.y=-110+55+55+55,I.position.z=0,I.width=50,I.height=50,n()})})}async function We(){let t=new b;var e=new d({color:485535});return await new Promise((n,i)=>{t.load("C.obj",function(a){a.traverse(function(r){r instanceof f&&(r.material=e)}),a.castShadow=!0,a.receiveShadow=!0,a.scale.set(.005,.005,.005);var s=new L(50,50,2),o=new d({color:485535}),l=new f(s,o);l.receiveShadow=!0,P=new T,P.add(a),P.add(l),P.position.x=-82.5+82.5+55,P.position.y=-110+55+55,P.position.z=0,P.width=50,P.height=50,n()})})}async function Ge(){let t=new b;var e=new d({color:485535});return await new Promise((n,i)=>{t.load("C.obj",function(a){a.traverse(function(r){r instanceof f&&(r.material=e)}),a.castShadow=!0,a.receiveShadow=!0,a.scale.set(.005,.005,.005);var s=new L(50,50,2),o=new d({color:485535}),l=new f(s,o);l.receiveShadow=!0,B=new T,B.add(a),B.add(l),B.position.x=-82.5+82.5+55,B.position.y=-110+55,B.position.z=0,B.width=50,B.height=50,n()})})}async function Ke(){let t=new b;var e=new d({color:485535});return await new Promise((n,i)=>{t.load("C.obj",function(a){a.traverse(function(r){r instanceof f&&(r.material=e)}),a.castShadow=!0,a.receiveShadow=!0,a.scale.set(.005,.005,.005);var s=new L(50,50,2),o=new d({color:485535}),l=new f(s,o);l.receiveShadow=!0,k=new T,k.add(a),k.add(l),k.position.x=-82.5+82.5+55+55,k.position.y=-110,k.position.z=0,k.width=50,k.height=50,n()})})}async function Xe(){let t=new b;var e=new d({color:485535});return await new Promise((n,i)=>{t.load("C.obj",function(a){a.traverse(function(r){r instanceof f&&(r.material=e)}),a.castShadow=!0,a.receiveShadow=!0,a.scale.set(.01,.01,.01);var s=new L(105,105,2),o=new d({color:485535}),l=new f(s,o);l.receiveShadow=!0,w=new T,w.add(a),w.add(l),w.position.x=-82.5,w.position.y=-110+82.5,w.position.z=0,w.width=105,w.height=105,n()})})}async function Ye(){let t=new b;var e=new d({color:485535});return await new Promise((n,i)=>{t.load("D.obj",function(a){a.traverse(function(r){r instanceof f&&(r.material=e)}),a.castShadow=!0,a.receiveShadow=!0,a.scale.set(.7,.7,.7);var s=new L(50,105,2),o=new d({color:485535}),l=new f(s,o);l.receiveShadow=!0,A=new T,A.add(a),A.add(l),A.position.x=-110+55+55,A.position.y=-110+82.5,A.position.z=0,A.width=105,A.height=50,n()})})}async function He(){for(var t=new L(50,50,1),e=0;e<5;e++)for(var n=0;n<4;n++){var i=new d({color:16777215,opacity:1}),a=new f(t,i);a.receiveShadow=!0,a.position.x=e*55-110,a.position.y=n*55-110,a.position.z=0,_.add(a)}return await Promise.all([Ne(),Oe(),Re(),Ve(),$e(),We(),Ge(),Ke(),Ye(),Xe()]).then(function(s){_.add(y),_.add(M),_.add(S),_.add(C),_.add(I),_.add(P),_.add(B),_.add(k),_.add(A),_.add(w)})}function ge(){v.autoClear=!1,N.layers.set(0),v.render(_,N),v.shadowMapEnabled=!0,window.requestAnimationFrame(ge)}async function Je(t){await Be(),await ye(t)}async function ye(t){D.value=t,G.value=!1,await J(300);for(let e=0;e<t.pos.length;e++){let n;h[e]=="A1"?n=y:h[e]=="A2"?n=M:h[e]=="A3"?n=S:h[e]=="A4"?n=C:h[e]=="B1"?n=I:h[e]=="B2"?n=P:h[e]=="B3"?n=B:h[e]=="B4"?n=k:h[e]=="C"?n=A:h[e]=="D"&&(n=w),n.timer1&&clearInterval(n.timer1);let i=t.pos[e]%4*55+n.width/2-110,a=Math.floor(t.pos[e]/4)*55+n.height/2-135.5;n.x=a,n.y=i,n.position.x=a,n.position.y=i}}async function xe(){let t=D.value;ae.value=0;var e=new Date().getTime();G.value=!0;var n=[];t.step&&t.step!="[]"&&(n=t.step.replace("[(","").replace(")]","").split("), ("));var i,a=new Date().getTime();re.value=a-e;for(let s=0;s<n.length;s++){if(!G.value){console.log("returns");return}let o=n[s].split(", ");h[o[0]]=="A1"?i=y:h[o[0]]=="A2"?i=M:h[o[0]]=="A3"?i=S:h[o[0]]=="A4"?i=C:h[o[0]]=="B1"?i=I:h[o[0]]=="B2"?i=P:h[o[0]]=="B3"?i=B:h[o[0]]=="B4"?i=k:h[o[0]]=="C"?i=A:h[o[0]]=="D"&&(i=w),i.position.x=i.x,i.position.y=i.y;let l=o[1];if(l=="0"){let r=i.x-55;Z(i,"x",r),await J(300),i.x=r}else if(l=="1"){let r=i.y+55;Z(i,"y",r),await J(300),i.y=r}else if(l=="2"){let r=i.x+55;Z(i,"x",r),await J(300),i.x=r}else if(l=="3"){let r=i.y-55;Z(i,"y",r),await J(300),i.y=r}ae.value=s+1}oa({message:"\u6210\u529F",type:"success"})}function Z(t,e,n){clearInterval(t.timer1),t.timer1=setInterval(function(){var i=parseInt(t.position[e]),a=5;a=i<n?a:-a,i+=a,Math.abs(n-i)>Math.abs(a)?t.position[e]=i:(clearInterval(t.timer1),t.position[e]=n)},10)}function J(t){return new Promise(e=>setTimeout(e,t))}return q({initPosition:Je,changePosition:ye,play:xe}),(t,e)=>{const n=Ae("el-button");return j(),ne(na,null,[ya,V(D)?(j(),ne("div",xa,[ie(n,{size:"mini",type:"primary",disabled:V(G),class:"play",onClick:xe},{default:ea(()=>[_a]),_:1},8,["disabled"])])):aa("",!0),$("div",Aa,[Me($("span",null,"TIME:\xA0\xA0"+Se(V(re))+"ms \xA0\xA0\xA0COUNT:\xA0\xA0"+Se(V(ae)),513),[[ta,V(G)]])])],64)}}};const Sa={class:"content"},Ca=$("div",{class:"header"},[$("span",null,"KLOTSKI 3D")],-1),Ia={class:"main"},Pa={class:"pag"},Ba={setup(ee){_e(()=>{W()});var q=O(!1),v=O(0),g=1,c=O(),p=[],m=O();function R(x){g!=x&&(g=x,c.value=p[x],m.value.changePosition(p[g]))}function W(){q.value=!0,fa.get("steps.txt").then(x=>{if(x.status==200){let u=x.data.split(`\r
`);for(let E=0;E<u.length;E++){let D=u[E].split(":");p.push({pos:D[0].split(","),step:D[1]})}v.value=u.length-1,c.value=p[g],m.value.initPosition(p[g])}q.value=!1}).catch(x=>{q.value=!1})}return(x,u)=>{const E=Ae("el-pagination"),D=va("loading");return Me((j(),ne("div",Sa,[Ca,$("div",Ia,[ie(Ma,{ref:(y,A)=>{A.klot=y,wa(m)?m.value=y:m=y}},null,512)]),$("div",Pa,[ie(E,{class:"",background:"","pager-count":5,layout:"prev, pager, next","page-size":1,onCurrentChange:R,total:V(v)},null,8,["total"])])],512)),[[D,V(q)]])}}};const ka={setup(ee){return(q,v)=>(j(),ha(Ba))}};const Ce=pa(ka);Ce.use(ma);Ce.mount("#app");