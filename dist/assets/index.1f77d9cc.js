import{o as M,r as v,_ as T,a as A,b as V,w as j,u as _,c as C,d as K,e as g,f as x,g as z,t as q,h as F,i as H,E as $,j as G,k as J,l as Q}from"./vendor.95c726ab.js";const R=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&d(r)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function d(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}};R();const U={class:"content"},W=F('<div class="header"><span>KLOTSKI</span></div><div class="main"><div class="item A A1"></div><div class="item A A2"></div><div class="item A A3"></div><div class="item A A4"></div><div class="item B B1"></div><div class="item B B2"></div><div class="item B B3"></div><div class="item B B4"></div><div class="item C"></div><div class="item D"></div></div>',2),X={class:"pagination"},Y={class:"f1"},Z=H("play"),ee={class:"count"},te={setup(B){M(()=>{D()});let s=[],c=["A1","A2","A3","A4","B1","B2","B3","B4","C","D"];var d=[],e=v(0),t=v(0),r=1,m=v(!1),f=v(!1);async function E(){m.value=!0;let l=r;y();var a=[];s.step&&s.step!="[]"&&(a=s.step.replace("[(","").replace(")]","").split("), ("));for(let n=0;n<a.length;n++){if(l!=r){m.value=!1;return}let o=a[n].split(", "),i=document.getElementsByClassName(c[o[0]])[0],p=o[1];p=="0"?i.style.top=parseInt(i.style.top)-100+"px":p=="1"?i.style.left=parseInt(i.style.left)+100+"px":p=="2"?i.style.top=parseInt(i.style.top)+100+"px":p=="3"&&(i.style.left=parseInt(i.style.left)-100+"px"),await b(100),t.value=n+1}m.value=!1,$({message:"\u6210\u529F",type:"success"})}function b(l){return new Promise(a=>setTimeout(a,l))}function L(l){t.value=0,m.value=!1,r=l,s=d[l],y()}function D(){f.value=!0,T.get("steps.txt").then(l=>{if(l.status==200){let a=l.data.split(`
`);for(let n=0;n<a.length;n++){let o=a[n].split(":");d.push({pos:o[0].split(","),step:o[1]})}s=d[r],e.value=a.length-1,y()}f.value=!1}).catch(l=>{f.value=!1})}function y(){let l=document.getElementsByClassName("A1")[0],a=document.getElementsByClassName("A2")[0],n=document.getElementsByClassName("A3")[0],o=document.getElementsByClassName("A4")[0],i=document.getElementsByClassName("B1")[0],p=document.getElementsByClassName("B2")[0],I=document.getElementsByClassName("B3")[0],P=document.getElementsByClassName("B4")[0],S=document.getElementsByClassName("C")[0],k=document.getElementsByClassName("D")[0],h={A1:l,A2:a,A3:n,A4:o,B1:i,B2:p,B3:I,B4:P,C:S,D:k};for(let u=0;u<s.pos.length;u++){let w=s.pos[u]%4*100,O=Math.floor(s.pos[u]/4)*100;h[c[u]].style.left=w+"px",h[c[u]].style.top=O+"px"}}return(l,a)=>{const n=A("el-button"),o=A("el-pagination"),i=V("loading");return j((C(),K("div",U,[W,g("div",X,[g("div",Y,[x(n,{size:"mini",type:"primary",disabled:_(m),class:"play",onClick:E},{default:z(()=>[Z]),_:1},8,["disabled"]),g("div",ee,"\u6B65\u9AA4\u603B\u8BA1\uFF1A"+q(_(t)),1)]),x(o,{class:"pag",background:"",layout:"prev, pager, next","page-size":1,onCurrentChange:L,total:_(e)},null,8,["total"])])],512)),[[i,_(f)]])}}};const se={setup(B){return(s,c)=>(C(),G(te))}};const N=J(se);N.use(Q);N.mount("#app");
