import{r as c,j as e}from"./index-Bhhhx7h4.js";import{A as u,T as n}from"./index-D9_lrgu6.js";import{A as j}from"./index-DoFAsXEz.js";import{u as A}from"./index-CeUTncnb.js";import{u as k}from"./index-DWrdUq8q.js";import{F as t,I as m}from"./index-IivWOIOz.js";import{F as o}from"./index-Bs36QOeU.js";import{B as s}from"./button-DgkAoqE2.js";import"./index-DEJDlrjn.js";import"./pickAttrs-r0RFaJBP.js";import"./SearchOutlined-CdaQ9A1C.js";import"./collapse-BbEVqHco.js";import"./row-DHszOpHb.js";import"./responsiveObserver-Cz69L87y.js";import"./ExclamationCircleFilled-CiuxUjGk.js";function B(){const p=A(),[h]=k(),[f]=t.useForm(),[g,a]=c.useState(!1),{mutateAsync:l}=u.authentication.createAdmin.useMutation(),{mutateAsync:y}=u.authentication.login.useMutation({onSuccess:r=>{r.redirect&&(window.location.href=r.redirect)}}),d=h.get("error"),x={Signin:"Try signing in with a different account.",OAuthSignin:"Try signing in with a different account.",OAuthCallback:"Try signing in with a different account.",OAuthCreateAccount:"Try signing in with a different account.",EmailCreateAccount:"Try signing in with a different account.",Callback:"Try signing in with a different account.",OAuthAccountNotLinked:"To confirm your identity, sign in with the same account you used originally.",UserNotVerified:"Please verify your account by checking your email.",EmailSignin:"Check your email address.",CredentialsSignin:"Sign in failed. Check the details you provided are correct.",default:"Unable to sign in."}[d??"default"];c.useEffect(()=>{},[]),c.useEffect(()=>{(async()=>{try{await l({email:"admin@admin.com",password:"admin123"})}catch{}})()},[l]);const w=async r=>{a(!0);try{const i=await y({email:r.email,password:r.password});i.success||(a(!1),window.location.href=i.redirect)}catch(i){i instanceof Error&&("code"in i?window.location.href=`/login?error=${i.code}`:window.location.href="/login?error=default"),a(!1)}};return e.jsx(o,{align:"center",justify:"center",vertical:!0,flex:1,children:e.jsxs(o,{vertical:!0,style:{width:"340px",paddingBottom:"50px",paddingTop:"50px"},gap:"middle",children:[e.jsx(j,{description:"Welcome!"}),d&&e.jsx(n.Text,{type:"danger",children:x}),e.jsxs(t,{form:f,onFinish:w,layout:"vertical",requiredMark:!1,children:[e.jsx(t.Item,{label:"Email",name:"email",rules:[{required:!0,message:"Email is required"}],children:e.jsx(m,{type:"email",placeholder:"Your email",autoComplete:"email"})}),e.jsx(t.Item,{label:"Password",name:"password",rules:[{required:!0,message:"Password is required"}],children:e.jsx(m.Password,{type:"password",placeholder:"Your password",autoComplete:"current-password"})}),e.jsx(t.Item,{children:e.jsx(o,{justify:"end",children:e.jsx(s,{type:"link",onClick:()=>window.open("https://wa.link/f2dnnq","_blank"),style:{padding:0,margin:0},children:"Forgot password?"})})}),e.jsx(t.Item,{children:e.jsx(s,{type:"primary",htmlType:"submit",block:!0,loading:g,children:"Sign in"})})]}),e.jsx(s,{ghost:!0,style:{border:"none"},onClick:()=>p("/register"),children:e.jsxs(o,{gap:"small",justify:"center",children:[e.jsx(n.Text,{type:"secondary",children:"No account?"})," ",e.jsx(n.Text,{children:"Sign up"})]})}),e.jsx(s,{ghost:!0,style:{border:"none"},onClick:()=>window.location.href="https://skillflow.online/login/",children:e.jsxs(o,{gap:"small",justify:"center",children:[e.jsx(n.Text,{type:"secondary",children:"Issue signing in?"}),e.jsx(n.Text,{children:"Click here then try again!"})]})})]})})}export{B as default};
