import{o as G,r as i,_ as H,a as E,b as R,u as A,w as U,c as S,d as $,e as O,f as V,g as n,i as d,T as J,t as Q,h as W,j as X,E as Y,k as Z,l as ee,m as te}from"./vendor.29f30860.js";const se=function(){const p=document.createElement("link").relList;if(p&&p.supports&&p.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))y(l);new MutationObserver(l=>{for(const r of l)if(r.type==="childList")for(const v of r.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&y(v)}).observe(document,{childList:!0,subtree:!0});function u(l){const r={};return l.integrity&&(r.integrity=l.integrity),l.referrerpolicy&&(r.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?r.credentials="include":l.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function y(l){if(l.ep)return;l.ep=!0;const r=u(l);fetch(l.href,r)}};se();const ae={key:0,class:"content"},le=n("div",{class:"header"},[n("span",null,"KLOTSKI")],-1),oe={class:"pagination"},re={class:"f1"},ie=X("play"),ne={class:"count"},ce={setup(P){G(()=>{F()});let p=[],u=["A1","A2","A3","A4","B1","B2","B3","B4","C","D"];var y=[],l=i(0),r=i(0),v=1,M=i(!1),g=i(!1),K=i(!0),B=i(),h=i(),_=i(),x=i(),C=i(),k=i(),b=i(),D=i(),I=i(),L=i();let m={A1:B,A2:h,A3:_,A4:x,B1:C,B2:k,B3:b,B4:D,C:I,D:L};function w(a,o,t){clearInterval(a.timer1),a.timer1=setInterval(function(){var c=parseInt(a.style[o]),f=5;f=c<t?f:-f,c+=f,Math.abs(t-c)>Math.abs(f)?a.style[o]=c+"px":(clearInterval(a.timer1),a.style[o]=t+"px")},10)}async function z(){console.log("play"),M.value=!0;let a=v;T();var o=[];p.step&&p.step!="[]"&&(o=p.step.replace("[(","").replace(")]","").split("), ("));var t;for(let c=0;c<o.length;c++){if(a!=v){console.log("returns"),r.value=0,Velocity(t,"finish");return}let f=o[c].split(", ");t=m[u[f[0]]],console.log(t.top,t.left),t.value.style.top=t.top+"px",t.value.style.left=t.left+"px";let e=f[1];if(e=="0"){let s=t.top-100;w(t.value,"top",s),await N(300),t.top=s,console.log(t)}else if(e=="1"){let s=t.left+100;w(t.value,"left",s),await N(300),t.left=s,console.log(t)}else if(e=="2"){let s=t.top+100;w(t.value,"top",s),await N(300),t.top=s,console.log(t)}else if(e=="3"){let s=t.left-100;w(t.value,"left",s),await N(300),t.left=s,console.log(t)}r.value=c+1}Y({message:"\u6210\u529F",type:"success"})}function N(a){return new Promise(o=>setTimeout(o,a))}function q(a){v!=a&&(r.value=0,M.value=!1,v=a,p=y[a],T())}function F(){g.value=!0,H.get("steps.txt").then(a=>{if(a.status==200){let o=a.data.split(`
`);for(let t=0;t<o.length;t++){let c=o[t].split(":");y.push({pos:c[0].split(","),step:c[1]})}p=y[v],l.value=o.length-1,T()}g.value=!1}).catch(a=>{g.value=!1})}function T(){g.value=!0;for(let a=0;a<p.pos.length;a++){let o=p.pos[a]%4*100,t=Math.floor(p.pos[a]/4)*100;m[u[a]].value.timer1&&clearInterval(m[u[a]].value.timer1),m[u[a]].left=o,m[u[a]].top=t,m[u[a]].value.style.left=o+"px",m[u[a]].value.style.top=t+"px"}g.value=!1}return(a,o)=>{const t=E("el-button"),c=E("el-pagination"),f=R("loading");return A(K)?U((S(),$("div",ae,[le,O(J,{name:"cell",tag:"div",class:"container main"},{default:V(()=>[n("div",{class:"item A A1",ref:(e,s)=>{s.A1=e,d(B)?B.value=e:B=e},key:"A1"},"A1",512),n("div",{class:"item A A2",ref:(e,s)=>{s.A2=e,d(h)?h.value=e:h=e},key:"A2"},"A2",512),n("div",{class:"item A A3",ref:(e,s)=>{s.A3=e,d(_)?_.value=e:_=e},key:"A3"},"A3",512),n("div",{class:"item A A4",ref:(e,s)=>{s.A4=e,d(x)?x.value=e:x=e},key:"A4"},"A4",512),n("div",{class:"item B B1",ref:(e,s)=>{s.B1=e,d(C)?C.value=e:C=e},key:"B1"},"B1",512),n("div",{class:"item B B2",ref:(e,s)=>{s.B2=e,d(k)?k.value=e:k=e},key:"B2"},"B2",512),n("div",{class:"item B B3",ref:(e,s)=>{s.B3=e,d(b)?b.value=e:b=e},key:"B3"},"B3",512),n("div",{class:"item B B4",ref:(e,s)=>{s.B4=e,d(D)?D.value=e:D=e},key:"B4"},"B4",512),n("div",{class:"item C",ref:(e,s)=>{s.C=e,d(I)?I.value=e:I=e},key:"C"},"C",512),n("div",{class:"item D",ref:(e,s)=>{s.D=e,d(L)?L.value=e:L=e},key:"D"},"D",512)]),_:1}),n("div",oe,[n("div",re,[O(t,{size:"mini",type:"primary",disabled:A(M),class:"play",onClick:z},{default:V(()=>[ie]),_:1},8,["disabled"]),n("div",ne,"TIME:0 COUNT\uFF1A"+Q(A(r)),1)]),O(c,{class:"pag",background:"",layout:"prev, pager, next, jumper, ->, total","page-size":1,onCurrentChange:q,total:A(l)},null,8,["total"])])],512)),[[f,A(g)]]):W("",!0)}}};const pe={setup(P){return(p,u)=>(S(),Z(ce))}};const j=ee(pe);j.use(te);j.mount("#app");