import{r as u,j as e}from"./index-Bhhhx7h4.js";import{u as L}from"./useUserContext-CjczNUYd.js";import{A as n,T as D}from"./index-D9_lrgu6.js";import{I as N}from"./index-CH34cjkL.js";import{a as T,u as F}from"./index-CeUTncnb.js";import{S}from"./index-_rPoQdzz.js";import{L as a}from"./index-_u3NotOF.js";import{C as M}from"./index-ydtyDG1o.js";import{F as P}from"./index-Bs36QOeU.js";import{B as A}from"./button-DgkAoqE2.js";import{M as O}from"./index-DUqLeMFK.js";import{s as l}from"./index-DaEJ5rVL.js";import{P as h}from"./index-ufwEpZVH.js";import"./Pagination-DseZJcil.js";import"./LeftOutlined-R_ycQdco.js";import"./pickAttrs-r0RFaJBP.js";import"./useBreakpoint-D4cuiZ4X.js";import"./responsiveObserver-Cz69L87y.js";import"./EllipsisOutlined-D3hTA01Z.js";import"./index-Hz7ZMWx3.js";import"./CloseOutlined-Dxm4jkL9.js";import"./SearchOutlined-CdaQ9A1C.js";import"./row-DHszOpHb.js";import"./Dropdown-DVbf8yOU.js";import"./index-CeoCv33H.js";import"./ExclamationCircleFilled-CiuxUjGk.js";import"./useClosable-CCDYGg12.js";import"./fade-2t19LHl3.js";const{Title:x,Text:f}=D;function ce(){var p;const{courseId:d}=T(),y=F(),{user:g}=L(),[j,c]=u.useState(!1),[v,m]=u.useState(!1),{mutateAsync:w}=n.userCourse.delete.useMutation(),{data:i,isLoading:C}=n.userCourse.findFirst.useQuery({where:{courseId:d,userId:g.id}}),{data:r,isLoading:b,isLoading:k}=n.course.findUnique.useQuery({where:{id:d},include:{sections:{include:{videos:!0}}}});return b||C?e.jsx(h,{layout:"full-width",children:e.jsx("div",{style:{textAlign:"center",padding:"50px"},children:e.jsx(S,{size:"large"})})}):e.jsxs(h,{layout:"full-width",children:[e.jsxs("div",{className:"mt-5",children:[e.jsx("div",{children:e.jsx(N.Img,{src:r==null?void 0:r.previewUrl,srcOnError:"/images/course-fallback.jpg",isPretty:!0,styleWrapper:{position:"relative",maxWidth:"100%",height:"auto",aspectRatio:"16/9"},styleImg:{objectFit:"cover",objectPosition:"center",width:"100%",height:"100%"}})}),e.jsxs("div",{className:"px-5",children:[e.jsx(x,{level:2,children:r==null?void 0:r.title}),e.jsx(f,{children:r==null?void 0:r.description})]}),e.jsx(a,{className:"mt-8",dataSource:(p=r==null?void 0:r.sections)==null?void 0:p.sort((t,o)=>t.order-o.order),renderItem:t=>{var o;return e.jsx(a.Item,{children:e.jsx(M,{title:t.title,children:e.jsx(a,{dataSource:(o=t.videos)==null?void 0:o.sort((s,I)=>s.order-I.order),renderItem:s=>e.jsx(a.Item,{children:e.jsxs("div",{children:[e.jsx(x,{level:5,children:s.title}),e.jsx("div",{className:"mt-4",children:e.jsx("iframe",{src:s.embedLink.replace(/(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/,"youtube.com/embed/$2"),style:{width:"100vw",height:"56.25vw",maxHeight:"90vh",margin:"0 -24px",position:"relative",zIndex:1},frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0})}),e.jsx(f,{className:"mt-4",children:s.description})]})})})})})}}),i&&e.jsx(P,{justify:"center",className:"w-full",children:e.jsx(A,{type:"primary",danger:!0,onClick:()=>c(!0),style:{marginTop:"20px"},children:"Drop Course"})})]}),e.jsx(O,{title:"Drop Course",open:j,confirmLoading:v,onOk:async()=>{m(!0);try{await w({where:{id:i==null?void 0:i.id}}),l.success("Course dropped successfully"),y("/my-courses")}catch(t){console.error("Drop course error:",t),t.code==="NOT_FOUND"?l.error("Course enrollment not found. The course may have already been dropped."):l.error((t==null?void 0:t.message)||"Failed to drop course")}finally{m(!1)}},onCancel:()=>c(!1),children:e.jsx("p",{children:"Are you sure you want to drop this course? This action cannot be undone."})})]})}export{ce as default};
