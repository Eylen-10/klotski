import{o as w,r as v,_ as M,a as A,b as T,w as j,u as _,c as C,d as K,e as g,f as N,g as z,t as q,h as F,i as H,E as U,j as $,k as G,l as J}from"./vendor.88bf0f92.js";const Q=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&d(r)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function d(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}};Q();const R={class:"content"},W=F('<div class="header"><span>KLOTSKI</span></div><div class="main"><div class="item A A1">A1</div><div class="item A A2">A2</div><div class="item A A3">A3</div><div class="item A A4">A4</div><div class="item B B1">B1</div><div class="item B B2">B2</div><div class="item B B3">B3</div><div class="item B B4">B4</div><div class="item C">C</div><div class="item D">D</div></div>',2),X={class:"pagination"},Y={class:"f1"},Z=H("play"),ee={class:"count"},te={setup(B){w(()=>{L()});let s=[],c=["A1","A2","A3","A4","B1","B2","B3","B4","C","D"];var d=[],e=v(0),t=v(0),r=1,m=v(!1),f=v(!1);async function E(){m.value=!0;let l=r;y();var a=[];s.step&&s.step!="[]"&&(a=s.step.replace("[(","").replace(")]","").split("), ("));for(let i=0;i<a.length;i++){if(l!=r){m.value=!1;return}let o=a[i].split(", "),n=document.getElementsByClassName(c[o[0]])[0],u=o[1];u=="0"?Velocity(n,{top:parseInt(n.style.top)-100+"px"},{duration:300}):u=="1"?Velocity(n,{left:parseInt(n.style.left)+100+"px"},{duration:300}):u=="2"?Velocity(n,{top:parseInt(n.style.top)+100+"px"},{duration:300}):u=="3"&&Velocity(n,{left:parseInt(n.style.left)-100+"px"},{duration:300}),await b(300),t.value=i+1}m.value=!1,U({message:"\u6210\u529F",type:"success"})}function b(l){return new Promise(a=>setTimeout(a,l))}function D(l){t.value=0,m.value=!1,r=l,s=d[l],y()}function L(){f.value=!0,M.get("steps.txt").then(l=>{if(l.status==200){let a=l.data.split(`
`);for(let i=0;i<a.length;i++){let o=a[i].split(":");d.push({pos:o[0].split(","),step:o[1]})}s=d[r],e.value=a.length-1,y()}f.value=!1}).catch(l=>{f.value=!1})}function y(){let l=document.getElementsByClassName("A1")[0],a=document.getElementsByClassName("A2")[0],i=document.getElementsByClassName("A3")[0],o=document.getElementsByClassName("A4")[0],n=document.getElementsByClassName("B1")[0],u=document.getElementsByClassName("B2")[0],I=document.getElementsByClassName("B3")[0],V=document.getElementsByClassName("B4")[0],O=document.getElementsByClassName("C")[0],P=document.getElementsByClassName("D")[0],h={A1:l,A2:a,A3:i,A4:o,B1:n,B2:u,B3:I,B4:V,C:O,D:P};for(let p=0;p<s.pos.length;p++){let S=s.pos[p]%4*100,k=Math.floor(s.pos[p]/4)*100;h[c[p]].style.left=S+"px",h[c[p]].style.top=k+"px"}}return(l,a)=>{const i=A("el-button"),o=A("el-pagination"),n=T("loading");return j((C(),K("div",R,[W,g("div",X,[g("div",Y,[N(i,{size:"mini",type:"primary",disabled:_(m),class:"play",onClick:E},{default:z(()=>[Z]),_:1},8,["disabled"]),g("div",ee,"COUNT\uFF1A"+q(_(t)),1)]),N(o,{class:"pag",background:"",layout:"prev, pager, next, jumper, ->, total","page-size":1,onCurrentChange:D,total:_(e)},null,8,["total"])])],512)),[[n,_(f)]])}}};const se={setup(B){return(s,c)=>(C(),$(te))}};const x=G(se);x.use(J);x.mount("#app");
