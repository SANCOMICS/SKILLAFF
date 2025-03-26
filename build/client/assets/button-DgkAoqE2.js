import{r as g,R as d}from"./index-Bhhhx7h4.js";import{C as So,u as Qo,d as x,p as Yo,a5 as Zo,s as ko,R as oe,B as ee,a6 as re,G as xo,E as Bo,e as $o,_ as z,a7 as Ho,a0 as te,m as T,a8 as M,g as ne,c as I,i as ie,M as le,a9 as ae,D as se,v as ce,aa as de,j as ue,L as ge,W as me}from"./index-Bs36QOeU.js";var be=function(o,e){var r={};for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&e.indexOf(t)<0&&(r[t]=o[t]);if(o!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(o);n<t.length;n++)e.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(o,t[n])&&(r[t[n]]=o[t[n]]);return r};const Oo=g.createContext(void 0),fe=o=>{const{getPrefixCls:e,direction:r}=g.useContext(So),{prefixCls:t,size:n,className:i}=o,l=be(o,["prefixCls","size","className"]),a=e("btn-group",t),[,,s]=Qo();let u="";switch(n){case"large":u="lg";break;case"small":u="sm";break}const f=x(a,{[`${a}-${u}`]:u,[`${a}-rtl`]:r==="rtl"},i,s);return g.createElement(Oo.Provider,{value:n},g.createElement("div",Object.assign({},l,{className:f})))},ho=/^[\u4E00-\u9FA5]{2}$/,X=ho.test.bind(ho);function rr(o){return o==="danger"?{danger:!0}:{type:o}}function vo(o){return typeof o=="string"}function F(o){return o==="text"||o==="link"}function pe(o,e){if(o==null)return;const r=e?" ":"";return typeof o!="string"&&typeof o!="number"&&vo(o.type)&&X(o.props.children)?Yo(o,{children:o.props.children.split("").join(r)}):vo(o)?X(o)?d.createElement("span",null,o.split("").join(r)):d.createElement("span",null,o):Zo(o)?d.createElement("span",null,o):o}function he(o,e){let r=!1;const t=[];return d.Children.forEach(o,n=>{const i=typeof n,l=i==="string"||i==="number";if(r&&l){const a=t.length-1,s=t[a];t[a]=`${s}${n}`}else t.push(n);r=l}),d.Children.map(t,n=>pe(n,e))}const Eo=g.forwardRef((o,e)=>{const{className:r,style:t,children:n,prefixCls:i}=o,l=x(`${i}-icon`,r);return d.createElement("span",{ref:e,className:l,style:t},n)}),Co=g.forwardRef((o,e)=>{const{prefixCls:r,className:t,style:n,iconClassName:i}=o,l=x(`${r}-loading-icon`,t);return d.createElement(Eo,{prefixCls:r,className:l,style:n,ref:e},d.createElement(oe,{className:i}))}),V=()=>({width:0,opacity:0,transform:"scale(0)"}),q=o=>({width:o.scrollWidth,opacity:1,transform:"scale(1)"}),ve=o=>{const{prefixCls:e,loading:r,existIcon:t,className:n,style:i}=o,l=!!r;return t?d.createElement(Co,{prefixCls:e,className:n,style:i}):d.createElement(ko,{visible:l,motionName:`${e}-loading-icon-motion`,motionLeave:l,removeOnLeave:!0,onAppearStart:V,onAppearActive:q,onEnterStart:V,onEnterActive:q,onLeaveStart:q,onLeaveActive:V},(a,s)=>{let{className:u,style:f}=a;return d.createElement(Co,{prefixCls:e,className:n,style:Object.assign(Object.assign({},i),f),ref:s,iconClassName:u})})},yo=(o,e)=>({[`> span, > ${o}`]:{"&:not(:last-child)":{[`&, & > ${o}`]:{"&:not(:disabled)":{borderInlineEndColor:e}}},"&:not(:first-child)":{[`&, & > ${o}`]:{"&:not(:disabled)":{borderInlineStartColor:e}}}}}),Ce=o=>{const{componentCls:e,fontSize:r,lineWidth:t,groupBorderColor:n,colorErrorHover:i}=o;return{[`${e}-group`]:[{position:"relative",display:"inline-flex",[`> span, > ${e}`]:{"&:not(:last-child)":{[`&, & > ${e}`]:{borderStartEndRadius:0,borderEndEndRadius:0}},"&:not(:first-child)":{marginInlineStart:o.calc(t).mul(-1).equal(),[`&, & > ${e}`]:{borderStartStartRadius:0,borderEndStartRadius:0}}},[e]:{position:"relative",zIndex:1,"&:hover, &:focus, &:active":{zIndex:2},"&[disabled]":{zIndex:0}},[`${e}-icon-only`]:{fontSize:r}},yo(`${e}-primary`,n),yo(`${e}-danger`,i)]}};var ye=["b"],Se=["v"],U=function(e){return Math.round(Number(e||0))},xe=function(e){if(e instanceof Ho)return e;if(e&&te(e)==="object"&&"h"in e&&"b"in e){var r=e,t=r.b,n=$o(r,ye);return z(z({},n),{},{v:t})}return typeof e=="string"&&/hsb/.test(e)?e.replace(/hsb/,"hsv"):e},j=function(o){ee(r,o);var e=re(r);function r(t){return xo(this,r),e.call(this,xe(t))}return Bo(r,[{key:"toHsbString",value:function(){var n=this.toHsb(),i=U(n.s*100),l=U(n.b*100),a=U(n.h),s=n.a,u="hsb(".concat(a,", ").concat(i,"%, ").concat(l,"%)"),f="hsba(".concat(a,", ").concat(i,"%, ").concat(l,"%, ").concat(s.toFixed(s===0?0:2),")");return s===1?u:f}},{key:"toHsb",value:function(){var n=this.toHsv(),i=n.v,l=$o(n,Se);return z(z({},l),{},{b:i,a:this.a})}}]),r}(Ho),Be=function(e){return e instanceof j?e:new j(e)};Be("#1677ff");const $e=(o,e)=>(o==null?void 0:o.replace(/[^\w/]/g,"").slice(0,e?8:6))||"",He=(o,e)=>o?$e(o,e):"";let Oe=function(){function o(e){xo(this,o);var r;if(this.cleared=!1,e instanceof o){this.metaColor=e.metaColor.clone(),this.colors=(r=e.colors)===null||r===void 0?void 0:r.map(n=>({color:new o(n.color),percent:n.percent})),this.cleared=e.cleared;return}const t=Array.isArray(e);t&&e.length?(this.colors=e.map(n=>{let{color:i,percent:l}=n;return{color:new o(i),percent:l}}),this.metaColor=new j(this.colors[0].color.metaColor)):this.metaColor=new j(t?"":e),(!e||t&&!this.colors)&&(this.metaColor=this.metaColor.setA(0),this.cleared=!0)}return Bo(o,[{key:"toHsb",value:function(){return this.metaColor.toHsb()}},{key:"toHsbString",value:function(){return this.metaColor.toHsbString()}},{key:"toHex",value:function(){return He(this.toHexString(),this.metaColor.a<1)}},{key:"toHexString",value:function(){return this.metaColor.toHexString()}},{key:"toRgb",value:function(){return this.metaColor.toRgb()}},{key:"toRgbString",value:function(){return this.metaColor.toRgbString()}},{key:"isGradient",value:function(){return!!this.colors&&!this.cleared}},{key:"getColors",value:function(){return this.colors||[{color:this,percent:0}]}},{key:"toCssString",value:function(){const{colors:r}=this;return r?`linear-gradient(90deg, ${r.map(n=>`${n.color.toRgbString()} ${n.percent}%`).join(", ")})`:this.metaColor.toRgbString()}},{key:"equals",value:function(r){return!r||this.isGradient()!==r.isGradient()?!1:this.isGradient()?this.colors.length===r.colors.length&&this.colors.every((t,n)=>{const i=r.colors[n];return t.percent===i.percent&&t.color.equals(i.color)}):this.toHexString()===r.toHexString()}}])}();const Ee=(o,e)=>{const{r,g:t,b:n,a:i}=o.toRgb(),l=new j(o.toRgbString()).onBackground(e).toHsv();return i<=.5?l.v>.5:r*.299+t*.587+n*.114>192},Po=o=>{const{paddingInline:e,onlyIconSize:r,paddingBlock:t}=o;return T(o,{buttonPaddingHorizontal:e,buttonPaddingVertical:t,buttonIconOnlyFontSize:r})},Io=o=>{var e,r,t,n,i,l;const a=(e=o.contentFontSize)!==null&&e!==void 0?e:o.fontSize,s=(r=o.contentFontSizeSM)!==null&&r!==void 0?r:o.fontSize,u=(t=o.contentFontSizeLG)!==null&&t!==void 0?t:o.fontSizeLG,f=(n=o.contentLineHeight)!==null&&n!==void 0?n:M(a),v=(i=o.contentLineHeightSM)!==null&&i!==void 0?i:M(s),C=(l=o.contentLineHeightLG)!==null&&l!==void 0?l:M(u),$=Ee(new Oe(o.colorBgSolid),"#fff")?"#000":"#fff";return{fontWeight:400,defaultShadow:`0 ${o.controlOutlineWidth}px 0 ${o.controlTmpOutline}`,primaryShadow:`0 ${o.controlOutlineWidth}px 0 ${o.controlOutline}`,dangerShadow:`0 ${o.controlOutlineWidth}px 0 ${o.colorErrorOutline}`,primaryColor:o.colorTextLightSolid,dangerColor:o.colorTextLightSolid,borderColorDisabled:o.colorBorder,defaultGhostColor:o.colorBgContainer,ghostBg:"transparent",defaultGhostBorderColor:o.colorBgContainer,paddingInline:o.paddingContentHorizontal-o.lineWidth,paddingInlineLG:o.paddingContentHorizontal-o.lineWidth,paddingInlineSM:8-o.lineWidth,onlyIconSize:o.fontSizeLG,onlyIconSizeSM:o.fontSizeLG-2,onlyIconSizeLG:o.fontSizeLG+2,groupBorderColor:o.colorPrimaryHover,linkHoverBg:"transparent",textTextColor:o.colorText,textTextHoverColor:o.colorText,textTextActiveColor:o.colorText,textHoverBg:o.colorBgTextHover,defaultColor:o.colorText,defaultBg:o.colorBgContainer,defaultBorderColor:o.colorBorder,defaultBorderColorDisabled:o.colorBorder,defaultHoverBg:o.colorBgContainer,defaultHoverColor:o.colorPrimaryHover,defaultHoverBorderColor:o.colorPrimaryHover,defaultActiveBg:o.colorBgContainer,defaultActiveColor:o.colorPrimaryActive,defaultActiveBorderColor:o.colorPrimaryActive,solidTextColor:$,contentFontSize:a,contentFontSizeSM:s,contentFontSizeLG:u,contentLineHeight:f,contentLineHeightSM:v,contentLineHeightLG:C,paddingBlock:Math.max((o.controlHeight-a*f)/2-o.lineWidth,0),paddingBlockSM:Math.max((o.controlHeightSM-s*v)/2-o.lineWidth,0),paddingBlockLG:Math.max((o.controlHeightLG-u*C)/2-o.lineWidth,0)}},Pe=o=>{const{componentCls:e,iconCls:r,fontWeight:t}=o;return{[e]:{outline:"none",position:"relative",display:"inline-flex",gap:o.marginXS,alignItems:"center",justifyContent:"center",fontWeight:t,whiteSpace:"nowrap",textAlign:"center",backgroundImage:"none",background:"transparent",border:`${I(o.lineWidth)} ${o.lineType} transparent`,cursor:"pointer",transition:`all ${o.motionDurationMid} ${o.motionEaseInOut}`,userSelect:"none",touchAction:"manipulation",color:o.colorText,"&:disabled > *":{pointerEvents:"none"},"> span":{display:"inline-block"},[`${e}-icon`]:{lineHeight:1},"> a":{color:"currentColor"},"&:not(:disabled)":Object.assign({},ie(o)),[`&${e}-two-chinese-chars::first-letter`]:{letterSpacing:"0.34em"},[`&${e}-two-chinese-chars > *:not(${r})`]:{marginInlineEnd:"-0.34em",letterSpacing:"0.34em"},"&-icon-end":{flexDirection:"row-reverse"}}}},jo=(o,e,r)=>({[`&:not(:disabled):not(${o}-disabled)`]:{"&:hover":e,"&:active":r}}),Ie=o=>({minWidth:o.controlHeight,paddingInlineStart:0,paddingInlineEnd:0,borderRadius:"50%"}),je=o=>({borderRadius:o.controlHeight,paddingInlineStart:o.calc(o.controlHeight).div(2).equal(),paddingInlineEnd:o.calc(o.controlHeight).div(2).equal()}),ze=o=>({cursor:"not-allowed",borderColor:o.borderColorDisabled,color:o.colorTextDisabled,background:o.colorBgContainerDisabled,boxShadow:"none"}),J=(o,e,r,t,n,i,l,a)=>({[`&${o}-background-ghost`]:Object.assign(Object.assign({color:r||void 0,background:e,borderColor:t||void 0,boxShadow:"none"},jo(o,Object.assign({background:e},l),Object.assign({background:e},a))),{"&:disabled":{cursor:"not-allowed",color:n||void 0,borderColor:i||void 0}})}),Te=o=>({[`&:disabled, &${o.componentCls}-disabled`]:Object.assign({},ze(o))}),we=o=>({[`&:disabled, &${o.componentCls}-disabled`]:{cursor:"not-allowed",color:o.colorTextDisabled}}),w=(o,e,r,t)=>{const i=t&&["link","text"].includes(t)?we:Te;return Object.assign(Object.assign({},i(o)),jo(o.componentCls,e,r))},K=(o,e,r,t,n)=>({[`&${o.componentCls}-solid`]:Object.assign({color:e,background:r},w(o,t,n))}),Q=(o,e,r,t,n)=>({[`&${o.componentCls}-outlined, &${o.componentCls}-dashed`]:Object.assign({borderColor:e,background:r},w(o,t,n))}),Y=o=>({[`&${o.componentCls}-dashed`]:{borderStyle:"dashed"}}),Z=(o,e,r,t)=>({[`&${o.componentCls}-filled`]:Object.assign({boxShadow:"none",background:e},w(o,r,t))}),B=(o,e,r,t,n)=>({[`&${o.componentCls}-${r}`]:Object.assign({color:e,boxShadow:"none"},w(o,t,n,r))}),Le=o=>Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({color:o.defaultColor,boxShadow:o.defaultShadow},K(o,o.solidTextColor,o.colorBgSolid,{background:o.colorBgSolidHover},{background:o.colorBgSolidActive})),Q(o,o.defaultBorderColor,o.defaultBg,{color:o.defaultHoverColor,borderColor:o.defaultHoverBorderColor,background:o.defaultHoverBg},{color:o.defaultActiveColor,borderColor:o.defaultActiveBorderColor,background:o.defaultActiveBg})),Y(o)),Z(o,o.colorFillTertiary,{background:o.colorFillSecondary},{background:o.colorFill})),B(o,o.textTextColor,"text",{color:o.textTextHoverColor,background:o.textHoverBg},{color:o.textTextActiveColor,background:o.colorBgTextActive})),B(o,o.textTextColor,"link",{color:o.colorLinkHover,background:o.linkHoverBg},{color:o.colorLinkActive})),J(o.componentCls,o.ghostBg,o.defaultGhostColor,o.defaultGhostBorderColor,o.colorTextDisabled,o.colorBorder)),Ae=o=>Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({color:o.colorPrimary,boxShadow:o.primaryShadow},K(o,o.primaryColor,o.colorPrimary,{background:o.colorPrimaryHover},{background:o.colorPrimaryActive})),Q(o,o.colorPrimary,o.colorBgContainer,{color:o.colorPrimaryTextHover,borderColor:o.colorPrimaryHover,background:o.colorBgContainer},{color:o.colorPrimaryTextActive,borderColor:o.colorPrimaryActive,background:o.colorBgContainer})),Y(o)),Z(o,o.colorPrimaryBg,{background:o.colorPrimaryBgHover},{background:o.colorPrimaryBorder})),B(o,o.colorPrimary,"text",{color:o.colorPrimaryTextHover,background:o.colorPrimaryBg},{color:o.colorPrimaryTextActive,background:o.colorPrimaryBorder})),B(o,o.colorPrimary,"link",{color:o.colorPrimaryTextHover,background:o.linkHoverBg},{color:o.colorPrimaryTextActive})),J(o.componentCls,o.ghostBg,o.colorPrimary,o.colorPrimary,o.colorTextDisabled,o.colorBorder,{color:o.colorPrimaryHover,borderColor:o.colorPrimaryHover},{color:o.colorPrimaryActive,borderColor:o.colorPrimaryActive})),Ne=o=>Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({color:o.colorError,boxShadow:o.dangerShadow},K(o,o.dangerColor,o.colorError,{background:o.colorErrorHover},{background:o.colorErrorActive})),Q(o,o.colorError,o.colorBgContainer,{color:o.colorErrorHover,borderColor:o.colorErrorBorderHover},{color:o.colorErrorActive,borderColor:o.colorErrorActive})),Y(o)),Z(o,o.colorErrorBg,{background:o.colorErrorBgFilledHover},{background:o.colorErrorBgActive})),B(o,o.colorError,"text",{color:o.colorErrorHover,background:o.colorErrorBg},{color:o.colorErrorHover,background:o.colorErrorBgActive})),B(o,o.colorError,"link",{color:o.colorErrorHover},{color:o.colorErrorActive})),J(o.componentCls,o.ghostBg,o.colorError,o.colorError,o.colorTextDisabled,o.colorBorder,{color:o.colorErrorHover,borderColor:o.colorErrorHover},{color:o.colorErrorActive,borderColor:o.colorErrorActive})),Re=o=>{const{componentCls:e}=o;return{[`${e}-default`]:Le(o),[`${e}-primary`]:Ae(o),[`${e}-dangerous`]:Ne(o)}},k=function(o){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";const{componentCls:r,controlHeight:t,fontSize:n,lineHeight:i,borderRadius:l,buttonPaddingHorizontal:a,iconCls:s,buttonPaddingVertical:u}=o,f=`${r}-icon-only`;return[{[e]:{fontSize:n,lineHeight:i,height:t,padding:`${I(u)} ${I(a)}`,borderRadius:l,[`&${f}`]:{width:t,paddingInline:0,[`&${r}-compact-item`]:{flex:"none"},[`&${r}-round`]:{width:"auto"},[s]:{fontSize:o.buttonIconOnlyFontSize}},[`&${r}-loading`]:{opacity:o.opacityLoading,cursor:"default"},[`${r}-loading-icon`]:{transition:`width ${o.motionDurationSlow} ${o.motionEaseInOut}, opacity ${o.motionDurationSlow} ${o.motionEaseInOut}`}}},{[`${r}${r}-circle${e}`]:Ie(o)},{[`${r}${r}-round${e}`]:je(o)}]},Ge=o=>{const e=T(o,{fontSize:o.contentFontSize,lineHeight:o.contentLineHeight});return k(e,o.componentCls)},We=o=>{const e=T(o,{controlHeight:o.controlHeightSM,fontSize:o.contentFontSizeSM,lineHeight:o.contentLineHeightSM,padding:o.paddingXS,buttonPaddingHorizontal:o.paddingInlineSM,buttonPaddingVertical:o.paddingBlockSM,borderRadius:o.borderRadiusSM,buttonIconOnlyFontSize:o.onlyIconSizeSM});return k(e,`${o.componentCls}-sm`)},De=o=>{const e=T(o,{controlHeight:o.controlHeightLG,fontSize:o.contentFontSizeLG,lineHeight:o.contentLineHeightLG,buttonPaddingHorizontal:o.paddingInlineLG,buttonPaddingVertical:o.paddingBlockLG,borderRadius:o.borderRadiusLG,buttonIconOnlyFontSize:o.onlyIconSizeLG});return k(e,`${o.componentCls}-lg`)},_e=o=>{const{componentCls:e}=o;return{[e]:{[`&${e}-block`]:{width:"100%"}}}},Me=ne("Button",o=>{const e=Po(o);return[Pe(e),Ge(e),We(e),De(e),_e(e),Re(e),Ce(e)]},Io,{unitless:{fontWeight:!0,contentLineHeight:!0,contentLineHeightSM:!0,contentLineHeightLG:!0}});function Fe(o,e){return{[`&-item:not(${e}-last-item)`]:{marginBottom:o.calc(o.lineWidth).mul(-1).equal()},"&-item":{"&:hover,&:focus,&:active":{zIndex:2},"&[disabled]":{zIndex:0}}}}function Ve(o,e){return{[`&-item:not(${e}-first-item):not(${e}-last-item)`]:{borderRadius:0},[`&-item${e}-first-item:not(${e}-last-item)`]:{[`&, &${o}-sm, &${o}-lg`]:{borderEndEndRadius:0,borderEndStartRadius:0}},[`&-item${e}-last-item:not(${e}-first-item)`]:{[`&, &${o}-sm, &${o}-lg`]:{borderStartStartRadius:0,borderStartEndRadius:0}}}}function qe(o){const e=`${o.componentCls}-compact-vertical`;return{[e]:Object.assign(Object.assign({},Fe(o,e)),Ve(o.componentCls,e))}}const Ue=o=>{const{componentCls:e,calc:r}=o;return{[e]:{[`&-compact-item${e}-primary`]:{[`&:not([disabled]) + ${e}-compact-item${e}-primary:not([disabled])`]:{position:"relative","&:before":{position:"absolute",top:r(o.lineWidth).mul(-1).equal(),insetInlineStart:r(o.lineWidth).mul(-1).equal(),display:"inline-block",width:o.lineWidth,height:`calc(100% + ${I(o.lineWidth)} * 2)`,backgroundColor:o.colorPrimaryHover,content:'""'}}},"&-compact-vertical-item":{[`&${e}-primary`]:{[`&:not([disabled]) + ${e}-compact-vertical-item${e}-primary:not([disabled])`]:{position:"relative","&:before":{position:"absolute",top:r(o.lineWidth).mul(-1).equal(),insetInlineStart:r(o.lineWidth).mul(-1).equal(),display:"inline-block",width:`calc(100% + ${I(o.lineWidth)} * 2)`,height:o.lineWidth,backgroundColor:o.colorPrimaryHover,content:'""'}}}}}}},Xe=le(["Button","compact"],o=>{const e=Po(o);return[ae(e),qe(e),Ue(e)]},Io);var Je=function(o,e){var r={};for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&e.indexOf(t)<0&&(r[t]=o[t]);if(o!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(o);n<t.length;n++)e.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(o,t[n])&&(r[t[n]]=o[t[n]]);return r};function Ke(o){if(typeof o=="object"&&o){let e=o==null?void 0:o.delay;return e=!Number.isNaN(e)&&typeof e=="number"?e:0,{loading:e<=0,delay:e}}return{loading:!!o,delay:0}}const Qe={default:["default","outlined"],primary:["primary","solid"],dashed:["default","dashed"],link:["primary","link"],text:["default","text"]},Ye=d.forwardRef((o,e)=>{var r,t,n;const{loading:i=!1,prefixCls:l,color:a,variant:s,type:u,danger:f=!1,shape:v="default",size:C,styles:$,disabled:L,className:To,rootClassName:wo,children:y,icon:H,iconPosition:Lo="start",ghost:Ao=!1,block:No=!1,htmlType:Ro="button",classNames:A,style:Go={},autoInsertSpace:N}=o,oo=Je(o,["loading","prefixCls","color","variant","type","danger","shape","size","styles","disabled","className","rootClassName","children","icon","iconPosition","ghost","block","htmlType","classNames","style","autoInsertSpace"]),Wo=u||"default",[eo,O]=g.useMemo(()=>{if(a&&s)return[a,s];const b=Qe[Wo]||[];return f?["danger",b[1]]:b},[u,a,s,f]),ro=eo==="danger"?"dangerous":eo,{getPrefixCls:Do,direction:to,button:m}=g.useContext(So),R=(r=N??(m==null?void 0:m.autoInsertSpace))!==null&&r!==void 0?r:!0,c=Do("btn",l),[no,_o,Mo]=Me(c),Fo=g.useContext(se),E=L??Fo,Vo=g.useContext(Oo),P=g.useMemo(()=>Ke(i),[i]),[h,io]=g.useState(P.loading),[G,lo]=g.useState(!1),S=ce(e,g.createRef()),ao=g.Children.count(y)===1&&!H&&!F(O);g.useEffect(()=>{let b=null;P.delay>0?b=setTimeout(()=>{b=null,io(!0)},P.delay):io(P.loading);function p(){b&&(clearTimeout(b),b=null)}return p},[P]),g.useEffect(()=>{if(!S||!S.current||!R)return;const b=S.current.textContent;ao&&X(b)?G||lo(!0):G&&lo(!1)},[S]);const so=b=>{const{onClick:p}=o;if(h||E){b.preventDefault();return}p==null||p(b)},{compactSize:qo,compactItemClassnames:co}=de(c,to),Uo={large:"lg",small:"sm",middle:void 0},uo=ue(b=>{var p,_;return(_=(p=C??qo)!==null&&p!==void 0?p:Vo)!==null&&_!==void 0?_:b}),go=uo&&Uo[uo]||"",Xo=h?"loading":H,W=ge(oo,["navigate"]),mo=x(c,_o,Mo,{[`${c}-${v}`]:v!=="default"&&v,[`${c}-${ro}`]:ro,[`${c}-${O}`]:O,[`${c}-${go}`]:go,[`${c}-icon-only`]:!y&&y!==0&&!!Xo,[`${c}-background-ghost`]:Ao&&!F(O),[`${c}-loading`]:h,[`${c}-two-chinese-chars`]:G&&R&&!h,[`${c}-block`]:No,[`${c}-rtl`]:to==="rtl",[`${c}-icon-end`]:Lo==="end"},co,To,wo,m==null?void 0:m.className),bo=Object.assign(Object.assign({},m==null?void 0:m.style),Go),Jo=x(A==null?void 0:A.icon,(t=m==null?void 0:m.classNames)===null||t===void 0?void 0:t.icon),Ko=Object.assign(Object.assign({},($==null?void 0:$.icon)||{}),((n=m==null?void 0:m.styles)===null||n===void 0?void 0:n.icon)||{}),fo=H&&!h?d.createElement(Eo,{prefixCls:c,className:Jo,style:Ko},H):d.createElement(ve,{existIcon:!!H,prefixCls:c,loading:h}),po=y||y===0?he(y,ao&&R):null;if(W.href!==void 0)return no(d.createElement("a",Object.assign({},W,{className:x(mo,{[`${c}-disabled`]:E}),href:E?void 0:W.href,style:bo,onClick:so,ref:S,tabIndex:E?-1:0}),fo,po));let D=d.createElement("button",Object.assign({},oo,{type:Ro,className:mo,style:bo,onClick:so,disabled:E,ref:S}),fo,po,!!co&&d.createElement(Xe,{key:"compact",prefixCls:c}));return F(O)||(D=d.createElement(me,{component:"Button",disabled:h},D)),no(D)}),zo=Ye;zo.Group=fe;zo.__ANT_BUTTON=!0;export{zo as B,rr as c};
