import{o as _e,V as z,a as Qe,r as O,b as Ue,R as Ze,c as Ae,d as j,e as ne,u as V,f as ie,w as je,g as ea,h as W,i as Me,v as aa,t as Se,F as ta,j as na,E as ia,O as oa,W as ra,P as sa,S as la,A as ca,k as ua,B as L,M as f,l as v,Q as oe,m as b,G as E,_ as da,n as fa,p as va,q as wa,s as ha,x as pa}from"./vendor.09aa409c.js";const ma=function(){const q=document.createElement("link").relList;if(q&&q.supports&&q.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))_(c);new MutationObserver(c=>{for(const p of c)if(p.type==="childList")for(const m of p.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&_(m)}).observe(document,{childList:!0,subtree:!0});function w(c){const p={};return c.integrity&&(p.integrity=c.integrity),c.referrerpolicy&&(p.referrerPolicy=c.referrerpolicy),c.crossorigin==="use-credentials"?p.credentials="include":c.crossorigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function _(c){if(c.ep)return;c.ep=!0;const p=w(c);fetch(c.href,p)}};ma();const ga=W("div",{id:"canvas-frame"},null,-1),ya={key:0,class:"f1"},xa=na("play"),_a={class:"count"},Aa={setup(ee,{expose:q}){_e(()=>{}),window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,6e3/60)}}();var w,_,c,p=new z(30,30,0),m,R=new Qe,$=!1,y,u,T,D=O(null),g,A,M,S,C,h,I,P,k,B;Ue({A1:g,A2:M,A3:S,A4:C,B1:I,B2:P,B3:k,B4:B,C:A,D:h});var G=O(!1),re=O(0),ae=O(0);let d=["A1","A2","A3","A4","B1","B2","B3","B4","C","D"];var K=new z(1,0,0),Ie=new z(-1,0,0),X=new z(0,1,0),Y=new z(0,-1,0),H=new z(0,0,1),te=new z(0,0,-1),Pe=new Ze,se=[];async function ke(){be(),Ee(),Te(),De(),await He(),ge(),w.domElement.addEventListener("mousedown",le,!1),w.domElement.addEventListener("mousemove",ce,!1),w.domElement.addEventListener("mouseup",ue,!1),w.domElement.addEventListener("touchstart",le,!1),w.domElement.addEventListener("touchmove",ce,!1),w.domElement.addEventListener("touchend",ue,!1),window.addEventListener("keydown",Le,!1),U=new oa(N,w.domElement),U.target=new z(0,0,0)}function le(t){pe(t),!$&&y?(m=y.point,U.enabled=!1):U.enabled=!0}function ce(t){if(pe(t),y&&!$&&m&&(T=y.point,!T.equals(m))){$=!0;var e=T.sub(m),n=Be(e),i=qe(y,n);new Date().getTime(),window.requestAnimFrame(function(a){de(i,n,a,0)})}t.preventDefault()}function ue(){y=null,m=null}function Be(t){var e,n=t.angleTo(K),i=t.angleTo(Ie),a=t.angleTo(X),s=t.angleTo(Y),o=t.angleTo(H),l=t.angleTo(te),r=he([n,i,a,s,o,l]);switch(r){case n:e=0,u.equals(X)?e=e+.1:u.equals(Y)?e=e+.2:u.equals(H)?e=e+.3:e=e+.4;break;case i:e=1,u.equals(X)?e=e+.1:u.equals(Y)?e=e+.2:u.equals(H)?e=e+.3:e=e+.4;break;case a:e=2,u.equals(H)?e=e+.1:u.equals(te)?e=e+.2:u.equals(K)?e=e+.3:e=e+.4;break;case s:e=3,u.equals(H)?e=e+.1:u.equals(te)?e=e+.2:u.equals(K)?e=e+.3:e=e+.4;break;case o:e=4,u.equals(X)?e=e+.1:u.equals(Y)?e=e+.2:u.equals(K)?e=e+.3:e=e+.4;break;case l:e=5,u.equals(X)?e=e+.1:u.equals(Y)?e=e+.2:u.equals(K)?e=e+.3:e=e+.4;break}return e}function qe(t,e){for(var n=t.object.cubeIndex,i=[],a=0;a<F.length;a++)i.push(F[a].cubeIndex);var s=he(i);n=n-s;var o=parseInt(n/9),l=n%9,r=[];switch(e){case .1:case .2:case 1.1:case 1.2:case 2.3:case 2.4:case 3.3:case 3.4:for(var a=0;a<F.length;a++){var Q=F[a].cubeIndex-s;o===parseInt(Q/9)&&r.push(F[a])}break;case .3:case .4:case 1.3:case 1.4:case 4.3:case 4.4:case 5.3:case 5.4:for(var a=0;a<F.length;a++){var Q=F[a].cubeIndex-s;parseInt(l/3)===parseInt(Q%9/3)&&r.push(F[a])}break;case 2.1:case 2.2:case 3.1:case 3.2:case 4.1:case 4.2:case 5.1:case 5.2:for(var a=0;a<F.length;a++){var Q=F[a].cubeIndex-s;Q%9%3==l%3&&r.push(F[a])}break}return r}function Fe(t){for(var e=0;e<t.length;e++)for(var n=t[e],i=0;i<se.length;i++){var a=se[i];if(Math.abs(n.position.x-a.x)<=cubeParams.len/2&&Math.abs(n.position.y-a.y)<=cubeParams.len/2&&Math.abs(n.position.z-a.z)<=cubeParams.len/2){n.cubeIndex=a.cubeIndex;break}}}function de(t,e,n,i,a){var s=500;switch(i===0&&(i=n,a=n),n-i>=s&&(n=i+s,$=!1,m=null,Fe(t)),e){case .1:case 1.2:case 2.4:case 3.3:for(var o=0;o<t.length;o++)ve(t[o],-90*Math.PI/180*(n-a)/s);break;case .2:case 1.1:case 2.3:case 3.4:for(var o=0;o<t.length;o++)ve(t[o],90*Math.PI/180*(n-a)/s);break;case .4:case 1.3:case 4.3:case 5.4:for(var o=0;o<t.length;o++)fe(t[o],-90*Math.PI/180*(n-a)/s);break;case 1.4:case .3:case 4.4:case 5.3:for(var o=0;o<t.length;o++)fe(t[o],90*Math.PI/180*(n-a)/s);break;case 2.2:case 3.1:case 4.1:case 5.2:for(var o=0;o<t.length;o++)we(t[o],90*Math.PI/180*(n-a)/s);break;case 2.1:case 3.2:case 4.2:case 5.1:for(var o=0;o<t.length;o++)we(t[o],-90*Math.PI/180*(n-a)/s);break}n-i<s&&window.requestAnimFrame(function(l){de(t,e,l,i,n)})}function fe(t,e){var n=t.position.x,i=t.position.z,a=new oe;a.setFromAxisAngle(new z(0,1,0),e),t.quaternion.premultiply(a),t.position.x=Math.cos(e)*n+Math.sin(e)*i,t.position.z=Math.cos(e)*i-Math.sin(e)*n}function ve(t,e){var n=t.position.x,i=t.position.y,a=new oe;a.setFromAxisAngle(new z(0,0,1),e),t.quaternion.premultiply(a),t.position.x=Math.cos(e)*n-Math.sin(e)*i,t.position.y=Math.cos(e)*i+Math.sin(e)*n}function we(t,e){var n=t.position.y,i=t.position.z,a=new oe;a.setFromAxisAngle(new z(1,0,0),e),t.quaternion.premultiply(a),t.position.y=Math.cos(e)*n-Math.sin(e)*i,t.position.z=Math.cos(e)*i+Math.sin(e)*n}function he(t){for(var e=t[0],n=1;n<t.length;n++)t[n]<e&&(e=t[n]);return e}function pe(t){if(t.touches){var e=t.touches[0];R.x=e.clientX/_*2-1,R.y=-(e.clientY/c)*2+1}else R.x=t.clientX/_*2-1,R.y=-(t.clientY/c)*2+1;ze()}function ze(){Pe.setFromCamera(R,N)}function Le(t){console.log(t.keyCode);let e=55;t.keyCode=="40"&&(h.rotation.z=Math.PI,h.position.x-=e),t.keyCode=="38"&&(h.rotation.z=0,h.position.x+=e),t.keyCode=="37"&&(h.rotation.z=-Math.PI/2,h.position.y-=e),t.keyCode=="39"&&(h.rotation.z=Math.PI/2,h.position.y+=e)}function be(){_=document.getElementsByClassName("main")[0].offsetWidth,c=document.getElementsByClassName("main")[0].offsetHeight-60,w=new ra({alpha:!0,antialias:!0,precision:"highp"}),w.setSize(_,c),w.setClearAlpha(0),document.getElementById("canvas-frame").appendChild(w.domElement)}var N,U;function Ee(){N=new sa(60,_/c,.1,1e3),N.position.set(350,0,200),N.up.set(0,0,1),N.lookAt(p)}var x;function Te(){x=new la}var me;function De(){me=new ca(16711422),x.add(me);var t=new ua(16777215);t.position.set(200,150,-500),t.castShadow=!0,x.add(t)}var F;async function Ne(){let t=new b;var e=new f({color:485535});return await new Promise((n,i)=>{t.load("A.obj",function(a){a.traverse(function(r){r instanceof v&&(r.material=e)}),a.castShadow=!0,a.receiveShadow=!0,a.scale.set(.007,.007,.007);var s=new L(105,50,2),o=new f({color:485535}),l=new v(s,o);l.receiveShadow=!0,g=new E,g.add(a),g.add(l),g.position.x=-83,g.position.y=-85,g.position.z=0,g.width=50,g.height=105,n()})})}async function Oe(){let t=new b;var e=new f({color:485535});return await new Promise((n,i)=>{t.load("A.obj",function(a){a.traverse(function(r){r instanceof v&&(r.material=e)}),a.castShadow=!0,a.receiveShadow=!0,a.scale.set(.007,.007,.007);var s=new L(105,50,2),o=new f({color:485535}),l=new v(s,o);l.receiveShadow=!0,M=new E,M.add(a),M.add(l),M.position.x=-83,M.position.y=80,M.position.z=0,M.width=50,M.height=105,n()})})}async function Re(){let t=new b;var e=new f({color:485535});return await new Promise((n,i)=>{t.load("A.obj",function(a){a.traverse(function(r){r instanceof v&&(r.material=e)}),a.castShadow=!0,a.receiveShadow=!0,a.scale.set(.005,.005,.005);var s=new L(105,50,2),o=new f({color:485535}),l=new v(s,o);l.receiveShadow=!0,S=new E,S.add(a),S.add(l),S.position.x=27,S.position.y=-85,S.position.z=0,S.width=50,S.height=105,n()})})}async function Ve(){let t=new b;var e=new f({color:485535});return await new Promise((n,i)=>{t.load("A.obj",function(a){a.traverse(function(r){r instanceof v&&(r.material=e)}),a.castShadow=!0,a.receiveShadow=!0,a.scale.set(.007,.007,.007);var s=new L(105,50,2),o=new f({color:485535}),l=new v(s,o);l.receiveShadow=!0,C=new E,C.add(a),C.add(l),C.position.x=27,C.position.y=80,C.position.z=0,C.width=50,C.height=105,n()})})}async function We(){let t=new b;var e=new f({color:485535});return await new Promise((n,i)=>{t.load("C.obj",function(a){a.traverse(function(r){r instanceof v&&(r.material=e)}),a.castShadow=!0,a.receiveShadow=!0,a.scale.set(.005,.005,.005);var s=new L(50,50,2),o=new f({color:485535}),l=new v(s,o);l.receiveShadow=!0,I=new E,I.add(a),I.add(l),I.position.x=-.5,I.position.y=-30,I.position.z=0,I.width=50,I.height=50,n()})})}async function $e(){let t=new b;var e=new f({color:485535});return await new Promise((n,i)=>{t.load("C.obj",function(a){a.traverse(function(r){r instanceof v&&(r.material=e)}),a.castShadow=!0,a.receiveShadow=!0,a.scale.set(.005,.005,.005);var s=new L(50,50,2),o=new f({color:485535}),l=new v(s,o);l.receiveShadow=!0,P=new E,P.add(a),P.add(l),P.position.x=54.5,P.position.y=-30,P.position.z=0,P.width=50,P.height=50,n()})})}async function Ge(){let t=new b;var e=new f({color:485535});return await new Promise((n,i)=>{t.load("C.obj",function(a){a.traverse(function(r){r instanceof v&&(r.material=e)}),a.castShadow=!0,a.receiveShadow=!0,a.scale.set(.005,.005,.005);var s=new L(50,50,2),o=new f({color:485535}),l=new v(s,o);l.receiveShadow=!0,k=new E,k.add(a),k.add(l),k.position.x=109.5,k.position.y=-85,k.position.z=0,k.width=50,k.height=50,n()})})}async function Ke(){let t=new b;var e=new f({color:485535});return await new Promise((n,i)=>{t.load("C.obj",function(a){a.traverse(function(r){r instanceof v&&(r.material=e)}),a.castShadow=!0,a.receiveShadow=!0,a.scale.set(.005,.005,.005);var s=new L(50,50,2),o=new f({color:485535}),l=new v(s,o);l.receiveShadow=!0,B=new E,B.add(a),B.add(l),B.position.x=109.5,B.position.y=-30,B.position.z=0,B.width=50,B.height=50,n()})})}async function Xe(){let t=new b;var e=new f({color:485535});return await new Promise((n,i)=>{t.load("C.obj",function(a){a.traverse(function(r){r instanceof v&&(r.material=e)}),a.castShadow=!0,a.receiveShadow=!0,a.scale.set(.01,.01,.01);var s=new L(105,105,2),o=new f({color:485535}),l=new v(s,o);l.receiveShadow=!0,h=new E,h.add(a),h.add(l),h.position.x=-83,h.position.y=-2.5,h.position.z=0,h.width=105,h.height=105,n()})})}async function Ye(){let t=new b;var e=new f({color:485535});return await new Promise((n,i)=>{t.load("D.obj",function(a){a.traverse(function(r){r instanceof v&&(r.material=e)}),a.castShadow=!0,a.receiveShadow=!0,a.scale.set(.7,.7,.7);var s=new L(50,105,2),o=new f({color:485535}),l=new v(s,o);l.receiveShadow=!0,A=new E,A.add(a),A.add(l),A.position.x=109.5,A.position.y=52.5,A.position.z=0,A.width=105,A.height=50,n()})})}async function He(){for(var t=new L(50,50,1),e=0;e<5;e++)for(var n=0;n<4;n++){var i=new f({color:16777215,opacity:1}),a=new v(t,i);a.receiveShadow=!0,a.position.x=e*55-110,a.position.y=n*55-110,a.position.z=0,x.add(a)}return await Promise.all([Ne(),Oe(),Re(),Ve(),We(),$e(),Ge(),Ke(),Ye(),Xe()]).then(function(s){x.add(g),x.add(M),x.add(S),x.add(C),x.add(I),x.add(P),x.add(k),x.add(B),x.add(A),x.add(h)})}function ge(){w.autoClear=!1,N.layers.set(0),w.render(x,N),w.shadowMapEnabled=!0,window.requestAnimationFrame(ge)}async function Je(t){await ke(),await ye(t)}async function ye(t){D.value=t,G.value=!1,await J(300);for(let e=0;e<t.pos.length;e++){let n;d[e]=="A1"?n=g:d[e]=="A2"?n=M:d[e]=="A3"?n=S:d[e]=="A4"?n=C:d[e]=="B1"?n=I:d[e]=="B2"?n=P:d[e]=="B3"?n=k:d[e]=="B4"?n=B:d[e]=="C"?n=A:d[e]=="D"&&(n=h),n.timer1&&clearInterval(n.timer1);let i=t.pos[e]%4*55+n.width/2-110,a=Math.floor(t.pos[e]/4)*55+n.height/2-135.5;console.log(d[e],"x",a,"y",i),n.x=a,n.y=i,n.position.x=a,n.position.y=i}}async function xe(){let t=D.value;ae.value=0;var e=new Date().getTime();G.value=!0;var n=[];t.step&&t.step!="[]"&&(n=t.step.replace("[(","").replace(")]","").split("), ("));var i,a=new Date().getTime();re.value=a-e;for(let s=0;s<n.length;s++){if(!G.value){console.log("returns");return}let o=n[s].split(", ");d[o[0]]=="A1"?i=g:d[o[0]]=="A2"?i=M:d[o[0]]=="A3"?i=S:d[o[0]]=="A4"?i=C:d[o[0]]=="B1"?i=I:d[o[0]]=="B2"?i=P:d[o[0]]=="B3"?i=k:d[o[0]]=="B4"?i=B:d[o[0]]=="C"?i=A:d[o[0]]=="D"&&(i=h),i.position.x=i.x,i.position.y=i.y;let l=o[1];if(l=="0"){let r=i.x-55;Z(i,"x",r),await J(300),i.x=r}else if(l=="1"){let r=i.y+55;Z(i,"y",r),await J(300),i.y=r}else if(l=="2"){let r=i.x+55;Z(i,"x",r),await J(300),i.x=r}else if(l=="3"){let r=i.y-55;Z(i,"y",r),await J(300),i.y=r}ae.value=s+1}ia({message:"\u6210\u529F",type:"success"})}function Z(t,e,n){clearInterval(t.timer1),t.timer1=setInterval(function(){var i=parseInt(t.position[e]),a=5;a=i<n?a:-a,i+=a,Math.abs(n-i)>Math.abs(a)?t.position[e]=i:(clearInterval(t.timer1),t.position[e]=n)},10)}function J(t){return new Promise(e=>setTimeout(e,t))}return q({initPosition:Je,changePosition:ye,play:xe}),(t,e)=>{const n=Ae("el-button");return j(),ne(ta,null,[ga,V(D)?(j(),ne("div",ya,[ie(n,{size:"mini",type:"primary",disabled:V(G),class:"play",onClick:xe},{default:je(()=>[xa]),_:1},8,["disabled"])])):ea("",!0),W("div",_a,[Me(W("span",null,"TIME:\xA0\xA0"+Se(V(re))+"ms \xA0\xA0\xA0COUNT:\xA0\xA0"+Se(V(ae)),513),[[aa,V(G)]])])],64)}}};const Ma={class:"content"},Sa=W("div",{class:"header"},[W("span",null,"KLOTSKI 3D")],-1),Ca={class:"main"},Ia={class:"pag"},Pa={setup(ee){_e(()=>{$()});var q=O(!1),w=O(0),_=1,c=O(),p=[],m=O();function R(y){_!=y&&(_=y,c.value=p[y],m.value.changePosition(p[_]))}function $(){q.value=!0,da.get("steps.txt").then(y=>{if(y.status==200){let u=y.data.split(`
`);for(let T=0;T<u.length;T++){let D=u[T].split(":");p.push({pos:D[0].split(","),step:D[1]})}w.value=u.length-1,c.value=p[_],m.value.initPosition(p[_])}q.value=!1}).catch(y=>{q.value=!1})}return(y,u)=>{const T=Ae("el-pagination"),D=fa("loading");return Me((j(),ne("div",Ma,[Sa,W("div",Ca,[ie(Aa,{ref:(g,A)=>{A.klot=g,va(m)?m.value=g:m=g}},null,512)]),W("div",Ia,[ie(T,{class:"",background:"","pager-count":5,layout:"prev, pager, next","page-size":1,onCurrentChange:R,total:V(w)},null,8,["total"])])],512)),[[D,V(q)]])}}};const ka={setup(ee){return(q,w)=>(j(),wa(Pa))}};const Ce=ha(ka);Ce.use(pa);Ce.mount("#app");