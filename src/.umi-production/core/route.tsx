// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';

export async function getRoutes() {
  const routes = {"1":{"path":"/","name":"主页","icon":"smile","parentId":"ant-design-pro-layout","id":"1"},"2":{"path":"/interface","name":"接口广场","icon":"smile","parentId":"ant-design-pro-layout","id":"2"},"3":{"path":"/interface_info/:id","name":"查看接口","icon":"smile","hideInMenu":true,"parentId":"ant-design-pro-layout","id":"3"},"4":{"path":"/user","layout":false,"id":"4"},"5":{"name":"登录","path":"/user/login","parentId":"4","id":"5"},"6":{"path":"/admin","name":"管理页","icon":"crown","access":"canAdmin","parentId":"ant-design-pro-layout","id":"6"},"7":{"name":"接口管理","icon":"table","path":"/admin/interface_info","layout":{"contentWidth":"Fixed"},"parentId":"6","id":"7"},"8":{"name":"接口分析","icon":"analysis","path":"/admin/interface_analysis","parentId":"6","id":"8"},"9":{"path":"*","layout":false,"id":"9"},"ant-design-pro-layout":{"id":"ant-design-pro-layout","path":"/","isLayout":true}} as const;
  return {
    routes,
    routeComponents: {
'1': React.lazy(() => import(/* webpackChunkName: "p__Welcome" */'@/pages/Welcome.tsx')),
'2': React.lazy(() => import(/* webpackChunkName: "p__Index__index" */'@/pages/Index/index.tsx')),
'3': React.lazy(() => import(/* webpackChunkName: "p__InterfaceInfo__index" */'@/pages/InterfaceInfo/index.tsx')),
'4': React.lazy(() => import('./EmptyRoute')),
'5': React.lazy(() => import(/* webpackChunkName: "p__User__Login__index" */'@/pages/User/Login/index.tsx')),
'6': React.lazy(() => import('./EmptyRoute')),
'7': React.lazy(() => import(/* webpackChunkName: "p__Admin__InterfaceInfo__index" */'@/pages/Admin/InterfaceInfo/index.tsx')),
'8': React.lazy(() => import(/* webpackChunkName: "p__Admin__InterfaceAnalysis__index" */'@/pages/Admin/InterfaceAnalysis/index.tsx')),
'9': React.lazy(() => import(/* webpackChunkName: "p__404" */'@/pages/404.tsx')),
'ant-design-pro-layout': React.lazy(() => import(/* webpackChunkName: "t__plugin-layout__Layout" */'/Users/yanghaoxin/Desktop/项目/SAPI/sapi-frontend/src/.umi-production/plugin-layout/Layout.tsx')),
},
  };
}
