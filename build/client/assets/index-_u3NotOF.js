import{C as F,d as j,p as he,g as Se,m as ye,c as l,r as ve,j as xe,q as U}from"./index-Bs36QOeU.js";import{R as h,r}from"./index-Bhhhx7h4.js";import{e as Ce,P as be,D as Ee}from"./Pagination-DseZJcil.js";import{r as Z}from"./responsiveObserver-Cz69L87y.js";import{u as ze}from"./useBreakpoint-D4cuiZ4X.js";import{C as Pe,R as Oe}from"./row-DHszOpHb.js";import{S as Ne}from"./index-_rPoQdzz.js";const q=h.createContext({});q.Consumer;var k=function(t,e){var i={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(i[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(t);a<n.length;a++)e.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(i[n[a]]=t[n[a]]);return i};const Be=t=>{var{prefixCls:e,className:i,avatar:n,title:a,description:s}=t,$=k(t,["prefixCls","className","avatar","title","description"]);const{getPrefixCls:y}=r.useContext(F),m=y("list",e),z=j(`${m}-item-meta`,i),C=h.createElement("div",{className:`${m}-item-meta-content`},a&&h.createElement("h4",{className:`${m}-item-meta-title`},a),s&&h.createElement("div",{className:`${m}-item-meta-description`},s));return h.createElement("div",Object.assign({},$,{className:z}),n&&h.createElement("div",{className:`${m}-item-meta-avatar`},n),(a||s)&&C)},Ie=h.forwardRef((t,e)=>{const{prefixCls:i,children:n,actions:a,extra:s,styles:$,className:y,classNames:m,colStyle:z}=t,C=k(t,["prefixCls","children","actions","extra","styles","className","classNames","colStyle"]),{grid:P,itemLayout:c}=r.useContext(q),{getPrefixCls:O,list:f}=r.useContext(F),b=u=>{var d,E;return j((E=(d=f==null?void 0:f.item)===null||d===void 0?void 0:d.classNames)===null||E===void 0?void 0:E[u],m==null?void 0:m[u])},N=u=>{var d,E;return Object.assign(Object.assign({},(E=(d=f==null?void 0:f.item)===null||d===void 0?void 0:d.styles)===null||E===void 0?void 0:E[u]),$==null?void 0:$[u])},H=()=>{let u=!1;return r.Children.forEach(n,d=>{typeof d=="string"&&(u=!0)}),u&&r.Children.count(n)>1},B=()=>c==="vertical"?!!s:!H(),S=O("list",i),I=a&&a.length>0&&h.createElement("ul",{className:j(`${S}-item-action`,b("actions")),key:"actions",style:N("actions")},a.map((u,d)=>h.createElement("li",{key:`${S}-item-action-${d}`},u,d!==a.length-1&&h.createElement("em",{className:`${S}-item-action-split`})))),T=P?"div":"li",L=h.createElement(T,Object.assign({},C,P?{}:{ref:e},{className:j(`${S}-item`,{[`${S}-item-no-flex`]:!B()},y)}),c==="vertical"&&s?[h.createElement("div",{className:`${S}-item-main`,key:"content"},n,I),h.createElement("div",{className:j(`${S}-item-extra`,b("extra")),key:"extra",style:N("extra")},s)]:[n,I,he(s,{key:"extra"})]);return P?h.createElement(Pe,{ref:e,flex:1,style:z},L):L}),ee=Ie;ee.Meta=Be;const Le=t=>{const{listBorderedCls:e,componentCls:i,paddingLG:n,margin:a,itemPaddingSM:s,itemPaddingLG:$,marginLG:y,borderRadiusLG:m}=t;return{[e]:{border:`${l(t.lineWidth)} ${t.lineType} ${t.colorBorder}`,borderRadius:m,[`${i}-header,${i}-footer,${i}-item`]:{paddingInline:n},[`${i}-pagination`]:{margin:`${l(a)} ${l(y)}`}},[`${e}${i}-sm`]:{[`${i}-item,${i}-header,${i}-footer`]:{padding:s}},[`${e}${i}-lg`]:{[`${i}-item,${i}-header,${i}-footer`]:{padding:$}}}},we=t=>{const{componentCls:e,screenSM:i,screenMD:n,marginLG:a,marginSM:s,margin:$}=t;return{[`@media screen and (max-width:${n}px)`]:{[e]:{[`${e}-item`]:{[`${e}-item-action`]:{marginInlineStart:a}}},[`${e}-vertical`]:{[`${e}-item`]:{[`${e}-item-extra`]:{marginInlineStart:a}}}},[`@media screen and (max-width: ${i}px)`]:{[e]:{[`${e}-item`]:{flexWrap:"wrap",[`${e}-action`]:{marginInlineStart:s}}},[`${e}-vertical`]:{[`${e}-item`]:{flexWrap:"wrap-reverse",[`${e}-item-main`]:{minWidth:t.contentWidth},[`${e}-item-extra`]:{margin:`auto auto ${l($)}`}}}}}},je=t=>{const{componentCls:e,antCls:i,controlHeight:n,minHeight:a,paddingSM:s,marginLG:$,padding:y,itemPadding:m,colorPrimary:z,itemPaddingSM:C,itemPaddingLG:P,paddingXS:c,margin:O,colorText:f,colorTextDescription:b,motionDurationSlow:N,lineWidth:H,headerBg:B,footerBg:S,emptyTextPadding:I,metaMarginBottom:T,avatarMarginRight:L,titleMarginBottom:u,descriptionFontSize:d}=t;return{[e]:Object.assign(Object.assign({},ve(t)),{position:"relative","*":{outline:"none"},[`${e}-header`]:{background:B},[`${e}-footer`]:{background:S},[`${e}-header, ${e}-footer`]:{paddingBlock:s},[`${e}-pagination`]:{marginBlockStart:$,[`${i}-pagination-options`]:{textAlign:"start"}},[`${e}-spin`]:{minHeight:a,textAlign:"center"},[`${e}-items`]:{margin:0,padding:0,listStyle:"none"},[`${e}-item`]:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:m,color:f,[`${e}-item-meta`]:{display:"flex",flex:1,alignItems:"flex-start",maxWidth:"100%",[`${e}-item-meta-avatar`]:{marginInlineEnd:L},[`${e}-item-meta-content`]:{flex:"1 0",width:0,color:f},[`${e}-item-meta-title`]:{margin:`0 0 ${l(t.marginXXS)} 0`,color:f,fontSize:t.fontSize,lineHeight:t.lineHeight,"> a":{color:f,transition:`all ${N}`,"&:hover":{color:z}}},[`${e}-item-meta-description`]:{color:b,fontSize:d,lineHeight:t.lineHeight}},[`${e}-item-action`]:{flex:"0 0 auto",marginInlineStart:t.marginXXL,padding:0,fontSize:0,listStyle:"none","& > li":{position:"relative",display:"inline-block",padding:`0 ${l(c)}`,color:b,fontSize:t.fontSize,lineHeight:t.lineHeight,textAlign:"center","&:first-child":{paddingInlineStart:0}},[`${e}-item-action-split`]:{position:"absolute",insetBlockStart:"50%",insetInlineEnd:0,width:H,height:t.calc(t.fontHeight).sub(t.calc(t.marginXXS).mul(2)).equal(),transform:"translateY(-50%)",backgroundColor:t.colorSplit}}},[`${e}-empty`]:{padding:`${l(y)} 0`,color:b,fontSize:t.fontSizeSM,textAlign:"center"},[`${e}-empty-text`]:{padding:I,color:t.colorTextDisabled,fontSize:t.fontSize,textAlign:"center"},[`${e}-item-no-flex`]:{display:"block"}}),[`${e}-grid ${i}-col > ${e}-item`]:{display:"block",maxWidth:"100%",marginBlockEnd:O,paddingBlock:0,borderBlockEnd:"none"},[`${e}-vertical ${e}-item`]:{alignItems:"initial",[`${e}-item-main`]:{display:"block",flex:1},[`${e}-item-extra`]:{marginInlineStart:$},[`${e}-item-meta`]:{marginBlockEnd:T,[`${e}-item-meta-title`]:{marginBlockStart:0,marginBlockEnd:u,color:f,fontSize:t.fontSizeLG,lineHeight:t.lineHeightLG}},[`${e}-item-action`]:{marginBlockStart:y,marginInlineStart:"auto","> li":{padding:`0 ${l(y)}`,"&:first-child":{paddingInlineStart:0}}}},[`${e}-split ${e}-item`]:{borderBlockEnd:`${l(t.lineWidth)} ${t.lineType} ${t.colorSplit}`,"&:last-child":{borderBlockEnd:"none"}},[`${e}-split ${e}-header`]:{borderBlockEnd:`${l(t.lineWidth)} ${t.lineType} ${t.colorSplit}`},[`${e}-split${e}-empty ${e}-footer`]:{borderTop:`${l(t.lineWidth)} ${t.lineType} ${t.colorSplit}`},[`${e}-loading ${e}-spin-nested-loading`]:{minHeight:n},[`${e}-split${e}-something-after-last-item ${i}-spin-container > ${e}-items > ${e}-item:last-child`]:{borderBlockEnd:`${l(t.lineWidth)} ${t.lineType} ${t.colorSplit}`},[`${e}-lg ${e}-item`]:{padding:P},[`${e}-sm ${e}-item`]:{padding:C},[`${e}:not(${e}-vertical)`]:{[`${e}-item-no-flex`]:{[`${e}-item-action`]:{float:"right"}}}}},Me=t=>({contentWidth:220,itemPadding:`${l(t.paddingContentVertical)} 0`,itemPaddingSM:`${l(t.paddingContentVerticalSM)} ${l(t.paddingContentHorizontal)}`,itemPaddingLG:`${l(t.paddingContentVerticalLG)} ${l(t.paddingContentHorizontalLG)}`,headerBg:"transparent",footerBg:"transparent",emptyTextPadding:t.padding,metaMarginBottom:t.padding,avatarMarginRight:t.padding,titleMarginBottom:t.paddingSM,descriptionFontSize:t.fontSize}),He=Se("List",t=>{const e=ye(t,{listBorderedCls:`${t.componentCls}-bordered`,minHeight:t.controlHeightLG});return[je(e),Le(e),we(e)]},Me);var Te=function(t,e){var i={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(i[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(t);a<n.length;a++)e.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(i[n[a]]=t[n[a]]);return i};function We(t,e){var{pagination:i=!1,prefixCls:n,bordered:a=!1,split:s=!0,className:$,rootClassName:y,style:m,children:z,itemLayout:C,loadMore:P,grid:c,dataSource:O=[],size:f,header:b,footer:N,loading:H=!1,rowKey:B,renderItem:S,locale:I}=t,T=Te(t,["pagination","prefixCls","bordered","split","className","rootClassName","style","children","itemLayout","loadMore","grid","dataSource","size","header","footer","loading","rowKey","renderItem","locale"]);const L=i&&typeof i=="object"?i:{},[u,d]=r.useState(L.defaultCurrent||1),[E,te]=r.useState(L.defaultPageSize||10),{getPrefixCls:ie,renderEmpty:_,direction:ne,list:M}=r.useContext(F),ae={current:1,total:0},J=o=>(p,x)=>{var V;d(p),te(x),i&&((V=i==null?void 0:i[o])===null||V===void 0||V.call(i,p,x))},re=J("onChange"),oe=J("onShowSizeChange"),le=(o,p)=>{if(!S)return null;let x;return typeof B=="function"?x=B(o):B?x=o[B]:x=o.key,x||(x=`list-item-${p}`),r.createElement(r.Fragment,{key:x},S(o,p))},se=()=>!!(P||i||N),g=ie("list",n),[ce,de,me]=He(g);let w=H;typeof w=="boolean"&&(w={spinning:w});const A=!!(w!=null&&w.spinning),ge=xe(f);let W="";switch(ge){case"large":W="lg";break;case"small":W="sm";break}const pe=j(g,{[`${g}-vertical`]:C==="vertical",[`${g}-${W}`]:W,[`${g}-split`]:s,[`${g}-bordered`]:a,[`${g}-loading`]:A,[`${g}-grid`]:!!c,[`${g}-something-after-last-item`]:se(),[`${g}-rtl`]:ne==="rtl"},M==null?void 0:M.className,$,y,de,me),v=Ce(ae,{total:O.length,current:u,pageSize:E},i||{}),K=Math.ceil(v.total/v.pageSize);v.current>K&&(v.current=K);const Y=i&&r.createElement("div",{className:j(`${g}-pagination`)},r.createElement(be,Object.assign({align:"end"},v,{onChange:re,onShowSizeChange:oe})));let D=U(O);i&&O.length>(v.current-1)*v.pageSize&&(D=U(O).splice((v.current-1)*v.pageSize,v.pageSize));const $e=Object.keys(c||{}).some(o=>["xs","sm","md","lg","xl","xxl"].includes(o)),Q=ze($e),R=r.useMemo(()=>{for(let o=0;o<Z.length;o+=1){const p=Z[o];if(Q[p])return p}},[Q]),fe=r.useMemo(()=>{if(!c)return;const o=R&&c[R]?c[R]:c.column;if(o)return{width:`${100/o}%`,maxWidth:`${100/o}%`}},[JSON.stringify(c),R]);let X=A&&r.createElement("div",{style:{minHeight:53}});if(D.length>0){const o=D.map((p,x)=>le(p,x));X=c?r.createElement(Oe,{gutter:c.gutter},r.Children.map(o,p=>r.createElement("div",{key:p==null?void 0:p.key,style:fe},p))):r.createElement("ul",{className:`${g}-items`},o)}else!z&&!A&&(X=r.createElement("div",{className:`${g}-empty-text`},(I==null?void 0:I.emptyText)||(_==null?void 0:_("List"))||r.createElement(Ee,{componentName:"List"})));const G=v.position||"bottom",ue=r.useMemo(()=>({grid:c,itemLayout:C}),[JSON.stringify(c),C]);return ce(r.createElement(q.Provider,{value:ue},r.createElement("div",Object.assign({ref:e,style:Object.assign(Object.assign({},M==null?void 0:M.style),m),className:pe},T),(G==="top"||G==="both")&&Y,b&&r.createElement("div",{className:`${g}-header`},b),r.createElement(Ne,Object.assign({},w),X,z),N&&r.createElement("div",{className:`${g}-footer`},N),P||(G==="bottom"||G==="both")&&Y)))}const Re=r.forwardRef(We),Ge=Re;Ge.Item=ee;export{Ge as L};
