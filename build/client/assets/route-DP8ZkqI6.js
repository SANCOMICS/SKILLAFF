import{r as p,j as e}from"./index-Bhhhx7h4.js";import{F as o,I as x}from"./index-IivWOIOz.js";import{s as a}from"./index-DaEJ5rVL.js";import{A as l,T as w,d as O,e as U}from"./index-D9_lrgu6.js";import{R as V,C as j}from"./row-DHszOpHb.js";import{C as g}from"./index-ydtyDG1o.js";import{S as F}from"./index-Bjxa92qe.js";import{B as d}from"./button-DgkAoqE2.js";import{I as T,a as C}from"./index-Bs36QOeU.js";import{u as Y}from"./useUserContext-CjczNUYd.js";import{P as H}from"./index-ufwEpZVH.js";import"./pickAttrs-r0RFaJBP.js";import"./SearchOutlined-CdaQ9A1C.js";import"./collapse-BbEVqHco.js";import"./ExclamationCircleFilled-CiuxUjGk.js";import"./CloseOutlined-Dxm4jkL9.js";import"./responsiveObserver-Cz69L87y.js";import"./Dropdown-DVbf8yOU.js";import"./index-CeoCv33H.js";import"./EllipsisOutlined-D3hTA01Z.js";import"./index-_rPoQdzz.js";var W={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-92.4 233.5h-63.9c-50.1 0-59.8 23.8-59.8 58.8v77.1h119.6l-15.6 120.7h-104V912H539.2V602.2H434.9V481.4h104.3v-89c0-103.3 63.1-159.6 155.3-159.6 44.2 0 82.1 3.3 93.2 4.8v107.9z"}}]},name:"facebook",theme:"filled"},Q=function(u,n){return p.createElement(T,C({},u,{ref:n,icon:W}))},Z=p.forwardRef(Q),_={icon:{tag:"svg",attrs:{"fill-rule":"evenodd",viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M530.01 112.67c43.67-.67 87-.34 130.33-.67 2.67 51 21 103 58.33 139 37.33 37 90 54 141.33 59.66V445c-48-1.67-96.33-11.67-140-32.34-19-8.66-36.66-19.66-54-31-.33 97.33.34 194.67-.66 291.67-2.67 46.66-18 93-45 131.33-43.66 64-119.32 105.66-196.99 107-47.66 2.66-95.33-10.34-136-34.34C220.04 837.66 172.7 765 165.7 687c-.67-16.66-1-33.33-.34-49.66 6-63.34 37.33-124 86-165.34 55.33-48 132.66-71 204.99-57.33.67 49.34-1.33 98.67-1.33 148-33-10.67-71.67-7.67-100.67 12.33-21 13.67-37 34.67-45.33 58.34-7 17-5 35.66-4.66 53.66 8 54.67 60.66 100.67 116.66 95.67 37.33-.34 73-22 92.33-53.67 6.33-11 13.33-22.33 13.66-35.33 3.34-59.67 2-119 2.34-178.66.33-134.34-.34-268.33.66-402.33"}}]},name:"tik-tok",theme:"outlined"},G=function(u,n){return p.createElement(T,C({},u,{ref:n,icon:_}))},J=p.forwardRef(G),K={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M941.3 296.1a112.3 112.3 0 00-79.2-79.3C792.2 198 512 198 512 198s-280.2 0-350.1 18.7A112.12 112.12 0 0082.7 296C64 366 64 512 64 512s0 146 18.7 215.9c10.3 38.6 40.7 69 79.2 79.3C231.8 826 512 826 512 826s280.2 0 350.1-18.8c38.6-10.3 68.9-40.7 79.2-79.3C960 658 960 512 960 512s0-146-18.7-215.9zM423 646V378l232 133-232 135z"}}]},name:"youtube",theme:"filled"},X=function(u,n){return p.createElement(T,C({},u,{ref:n,icon:K}))},D=p.forwardRef(X);const{Title:ee,Text:b}=w;function be(){const{user:r}=Y(),[u]=o.useForm(),[n]=o.useForm(),[P]=o.useForm(),{data:t,refetch:v}=l.user.findFirst.useQuery({where:{id:r==null?void 0:r.id},include:{socialAccounts:!0}}),{data:f,isLoading:k,error:se}=l.affiliateLink.findFirst.useQuery(void 0,{onError:()=>{a.error("Failed to load affiliate link")}}),{mutateAsync:N}=l.user.update.useMutation(),{mutateAsync:A}=l.authentication.updatePassword.useMutation(),{mutateAsync:I}=l.socialAccount.create.useMutation(),{mutateAsync:S}=l.socialAccount.delete.useMutation(),{mutateAsync:E}=l.billing.processWithdrawal.useMutation(),{mutateAsync:R}=l.authentication.logout.useMutation({onSuccess:s=>{s.redirect&&(window.location.href=s.redirect)}}),$=async()=>{try{const s=await R();s.redirect&&(window.location.href=s.redirect)}catch{a.error("Failed to logout")}},M=async s=>{var i,c;try{r!=null&&r.id&&(await N({where:{id:r.id},data:{name:s.name}}),a.success("Profile updated successfully"),v())}catch(m){const h=((i=m.data)==null?void 0:i.code)==="UNAUTHORIZED"?"Current password is incorrect!":((c=m.data)==null?void 0:c.message)||"Failed to update password";a.error(h)}},B=async s=>{var h;const{currentPassword:i,newPassword:c,confirmPassword:m}=s;if(c!==m){a.error("New passwords do not match!");return}try{await A({userId:r==null?void 0:r.id,currentPassword:i,newPassword:c}),a.success("Password updated successfully"),n.resetFields()}catch(y){((h=y.data)==null?void 0:h.code)==="UNAUTHORIZED"?a.error("Current password is incorrect!"):a.error("Failed to update password")}},q=async s=>{try{if(s==="YouTube"){window.location.href="/api/auth/youtube";return}r!=null&&r.id&&(await I({data:{platform:s,status:"CONNECTED",userId:r.id}}),a.success(`${s} account connected`),v())}catch{a.error(`Failed to connect ${s} account`)}},z=async s=>{try{await S({where:{id:s}}),a.success("Social account disconnected"),v()}catch{a.error("Failed to disconnect account")}},L=async s=>{try{await E({amount:"0",phoneNumber:s.phoneNumber||""}),a.success("Payout settings saved successfully"),P.resetFields(["phoneNumber"])}catch{a.error("Failed to save payout settings")}};return e.jsx(H,{layout:"full-width",children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto",padding:"24px"},children:[e.jsxs(ee,{level:2,children:[e.jsx("i",{className:"las la-cog"})," Settings"]}),e.jsx(b,{children:"Manage your account settings and preferences"}),e.jsxs(V,{gutter:[24,24],style:{marginTop:24},children:[e.jsx(j,{xs:24,children:e.jsxs(g,{title:e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"las la-user"})," Profile Information"]}),children:[e.jsxs("div",{style:{marginBottom:"16px"},children:[e.jsxs(w.Text,{children:["Name:"," ",e.jsx(w.Text,{strong:!0,children:t==null?void 0:t.name})]}),e.jsx("br",{}),e.jsxs(w.Text,{children:["Email:"," ",e.jsx(w.Text,{strong:!0,children:t==null?void 0:t.email})]})]}),e.jsxs(o,{form:u,layout:"vertical",initialValues:{name:t==null?void 0:t.name,email:t==null?void 0:t.email},onFinish:M,children:[e.jsx(o.Item,{label:"Name",name:"name",children:e.jsx(x,{placeholder:"Enter your name"})}),e.jsxs(F,{children:[e.jsxs(d,{type:"primary",htmlType:"submit",children:[e.jsx("i",{className:"las la-save"})," Save Changes"]}),e.jsxs(d,{danger:!0,onClick:$,children:[e.jsx("i",{className:"las la-sign-out-alt"})," Logout"]})]})]})]})}),e.jsx(j,{xs:24,children:e.jsx(g,{title:e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"las la-share-alt"})," Connected Accounts"]}),style:{marginTop:24},children:e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:16},children:["TikTok","Facebook","YouTube"].map(s=>{var m,h;const i=(m=t==null?void 0:t.socialAccounts)==null?void 0:m.some(y=>y.platform===s),c=(h=t==null?void 0:t.socialAccounts)==null?void 0:h.find(y=>y.platform===s);return e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs(b,{style:{display:"flex",alignItems:"center"},children:[s==="YouTube"?e.jsx(D,{style:{fontSize:"16px",color:"#FF0000",marginRight:"5px"}}):s==="TikTok"?e.jsx(J,{style:{fontSize:"16px",color:"#000000",marginRight:"5px"}}):e.jsx(Z,{style:{fontSize:"16px",color:"#1877F2",marginRight:"5px"}}),s]}),i&&c?e.jsx(d,{danger:!0,onClick:()=>z(c.id),children:"Disconnect"}):e.jsx(d,{type:"primary",onClick:()=>q(s),children:"Connect"})]},s)})})})}),e.jsx(j,{xs:24,children:e.jsxs(g,{title:e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"las la-hand-holding-usd"})," Affiliate Program"]}),style:{marginTop:24},children:[e.jsx(b,{children:"Earn 50% commission on every referral!"}),e.jsx("div",{style:{marginTop:16},children:f!=null&&f.url?e.jsxs(F,{children:[e.jsx(x,{value:`${f.url}?ref=${r==null?void 0:r.id}&tx=${Date.now()}`,readOnly:!0}),e.jsx(O,{title:"Copy affiliate link",children:e.jsx(d,{icon:e.jsx(U,{}),onClick:()=>{navigator.clipboard.writeText(`${f.url}?ref=${r==null?void 0:r.id}&tx=${Date.now()}`),a.success("Affiliate link copied to clipboard!")}})})]}):e.jsx(d,{type:"primary",onClick:()=>{k||a.error("Affiliate link not available. Please try again later.")},loading:k,children:"Become An Affiliate to earn"})})]})}),e.jsx(j,{xs:24,children:e.jsx(g,{title:e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"las la-money-check"})," Payout Settings"]}),style:{marginTop:24},children:e.jsxs(o,{form:P,layout:"vertical",onFinish:L,children:[e.jsx(o.Item,{label:"Phone Number",name:"phoneNumber",rules:[{required:!0,message:"Phone number is required"},{pattern:/^(237|\+237)?[6-9][0-9]{8}$/,message:"Please enter a valid Cameroon phone number"}],children:e.jsx(x,{addonBefore:"+237",placeholder:"Enter your phone number"})}),e.jsx(o.Item,{children:e.jsxs(d,{type:"primary",htmlType:"submit",children:[e.jsx("i",{className:"las la-save"})," Save Payout Settings"]})})]})})}),e.jsx(j,{xs:24,children:e.jsx(g,{title:e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"las la-key"})," Change Passwordd"]}),style:{marginTop:24},children:e.jsxs(o,{form:n,layout:"vertical",onFinish:B,children:[e.jsx(o.Item,{label:"Current Password",name:"currentPassword",rules:[{required:!0,message:"Current password is required"}],children:e.jsx(x.Password,{placeholder:"Enter your current password"})}),e.jsx(o.Item,{label:"New Password",name:"newPassword",rules:[{required:!0,message:"New password is required"}],children:e.jsx(x.Password,{placeholder:"Enter your new password"})}),e.jsx(o.Item,{label:"Confirm New Password",name:"confirmPassword",rules:[{required:!0,message:"Please confirm your new password"}],children:e.jsx(x.Password,{placeholder:"Confirm your new password"})}),e.jsx(o.Item,{children:e.jsx(F,{children:e.jsxs(d,{type:"primary",htmlType:"submit",children:[e.jsx("i",{className:"las la-save"})," Save New Password"]})})})]})})})]})]})})}export{be as default};
