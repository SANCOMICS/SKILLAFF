import{j as i}from"./index-Bhhhx7h4.js";import{R as h,C as g}from"./row-DHszOpHb.js";import{S as u}from"./index-_rPoQdzz.js";import{E as x}from"./index-Hz7ZMWx3.js";import{C as f}from"./index-ydtyDG1o.js";import{F as n}from"./index-Bs36QOeU.js";import{A as o,T as t}from"./index-D9_lrgu6.js";import{T as y}from"./index-CqSqlCYd.js";import{P as j}from"./index-ufwEpZVH.js";import"./responsiveObserver-Cz69L87y.js";import"./Dropdown-DVbf8yOU.js";import"./index-CeoCv33H.js";import"./CloseOutlined-Dxm4jkL9.js";import"./EllipsisOutlined-D3hTA01Z.js";import"./useClosable-CCDYGg12.js";import"./pickAttrs-r0RFaJBP.js";function D(){const{data:r,isLoading:a}=o.billing.findManyProducts.useQuery({},{initialData:[]}),{mutateAsync:l}=o.billing.createPaymentLink.useMutation(),{data:c}=o.billing.findManySubscriptions.useQuery({},{initialData:[]}),d=async e=>{const{url:s}=await l({productId:e.id});window.open(s,"_blank")},m=e=>e.price===0?"Free":`XAF ${e.price}`,p=e=>c.find(s=>s.productId===e.id);return i.jsx(j,{isCentered:!0,children:i.jsxs(h,{gutter:[16,16],justify:"center",className:"w-full",children:[r.length===0&&a&&i.jsx(u,{}),r.length===0&&!a&&i.jsx(x,{imageStyle:{height:60},description:"No products found on Stripe"}),r.filter(e=>e.name!=="Enterprise").map(e=>i.jsx(g,{xs:24,sm:12,md:12,lg:12,xl:8,children:i.jsx(f,{style:{height:"100%",overflow:"hidden"},hoverable:!0,onClick:()=>d(e),cover:i.jsx(n,{style:{position:"relative",height:"40vh",width:"100%",overflow:"hidden",display:"flex",justifyContent:"center",alignItems:"center",borderTopLeftRadius:"10px",borderTopRightRadius:"10px"},children:i.jsx("img",{src:e.coverUrl,alt:e.name,style:{position:"absolute",top:0,left:0,height:"100%",width:"100%",objectFit:"cover"}})}),children:i.jsxs(n,{vertical:!0,gap:10,children:[i.jsx(t.Title,{level:3,style:{margin:0},children:e.name}),i.jsxs(n,{align:"center",children:[i.jsx(t.Title,{level:1,style:{margin:0},children:m(e)}),e.interval&&i.jsxs(t.Text,{className:"ml-1",children:["/ ",e.interval]})]}),p(e)&&i.jsx("div",{children:i.jsx(y,{color:"success",children:"Active"})}),i.jsx(t.Text,{type:"secondary",children:e.description})]})})},e.id))]})})}export{D as default};
