import{r as o,j as e}from"./index-Bhhhx7h4.js";import{U as w}from"./index-C7KOCkDY.js";import{u as b,U as F}from"./index-BZJXnv9w.js";import{F as a,I as f}from"./index-IivWOIOz.js";import{I as A,a as C,F as c}from"./index-Bs36QOeU.js";import{A as h,T as P}from"./index-D9_lrgu6.js";import{B as m}from"./button-DgkAoqE2.js";import{A as S}from"./index-BQqE00C6.js";import{u as E}from"./useUserContext-CjczNUYd.js";import{P as V}from"./index-ufwEpZVH.js";import"./pickAttrs-r0RFaJBP.js";import"./collapse-BbEVqHco.js";import"./fade-2t19LHl3.js";import"./useBreakpoint-D4cuiZ4X.js";import"./responsiveObserver-Cz69L87y.js";import"./DeleteOutlined-Cz9l2vbV.js";import"./ExclamationCircleFilled-CiuxUjGk.js";import"./CloseOutlined-Dxm4jkL9.js";import"./SearchOutlined-CdaQ9A1C.js";import"./row-DHszOpHb.js";import"./index-_rPoQdzz.js";var q={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"}}]},name:"upload",theme:"outlined"},M=function(l,n){return o.createElement(A,C({},l,{ref:n,icon:q}))},T=o.forwardRef(M);function ae(){const{user:t,refetch:l}=E(),{mutateAsync:n}=h.authentication.logout.useMutation({onSuccess:r=>{r.redirect&&(window.location.href=r.redirect)}}),[u]=a.useForm(),[g,d]=o.useState(!1),[x,p]=o.useState(!1),[i,j]=o.useState([]),{mutateAsync:y}=h.user.update.useMutation(),{mutateAsync:U}=b();o.useEffect(()=>{u.setFieldsValue(t)},[t]);const v=async r=>{d(!0);try{let s=r.pictureUrl;if(i.length>0){const{url:I}=await U({file:i[0]});s=I}await y({where:{id:t.id},data:{email:r.email,name:r.name,pictureUrl:s}}),l()}catch(s){console.error(`Could not save user: ${s.message}`,{variant:"error"})}d(!1)},L=async()=>{p(!0);try{await n()}catch(r){console.error(`Could not logout: ${r.message}`,{variant:"error"}),p(!1)}};return e.jsxs(V,{layout:"super-narrow",children:[e.jsxs(c,{justify:"space-between",align:"center",children:[e.jsx(P.Title,{level:1,children:"Profile"}),e.jsx(m,{onClick:L,loading:x,children:"Logout"})]}),e.jsx(c,{justify:"center",style:{marginBottom:"30px"},children:e.jsx(S,{size:80,src:t==null?void 0:t.pictureUrl,children:w.stringToInitials(t==null?void 0:t.name)})}),e.jsxs(a,{form:u,initialValues:t,onFinish:v,layout:"vertical",requiredMark:!1,children:[e.jsx(a.Item,{name:"name",label:"Name",rules:[{required:!0,message:"Name is required"}],children:e.jsx(f,{})}),e.jsx(a.Item,{label:"Email",name:"email",rules:[{required:!0,message:"Email is required"}],children:e.jsx(f,{type:"email",placeholder:"Your email",autoComplete:"email"})}),e.jsx(a.Item,{label:"Profile picture",name:"pictureUrl",children:e.jsx(F,{fileList:i,beforeUpload:r=>(j([...i,r]),!1),maxCount:1,children:e.jsx(m,{icon:e.jsx(T,{}),children:"Select Image"})})}),e.jsx(a.Item,{children:e.jsx(c,{justify:"end",children:e.jsx(m,{type:"primary",htmlType:"submit",loading:g,children:"Save"})})})]})]})}export{ae as default};
