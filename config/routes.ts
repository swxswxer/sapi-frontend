export default [
  { path: '/', name: '主页', icon: 'smile', component: './Welcome' },
  { path: '/interface', name: '接口广场', icon: 'smile', component: './Index' },
  {
    path: '/user/userInfo',
    name: '个人信息',
    hideInMenu: true,
    icon: 'smile',
    component: './User/UserInfo',
  },
  {
    path: '/interface_info/:id',
    name: '查看接口',
    icon: 'smile',
    component: './InterfaceInfo',
    hideInMenu: true,
  },

  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' },
    ],
  },

  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        name: '接口管理',
        icon: 'table',
        path: '/admin/interface_info',
        component: './Admin/interfaceInfoPro',
        layout: {
          contentWidth: 'Fixed', // 单独为此页面设置
        },
      },
      {
        name: '接口分析',
        icon: 'analysis',
        path: '/admin/interface_analysis',
        component: './Admin/InterfaceAnalysis',
      },
    ],
  },

  {
    path: 'https://github.com/swxswxer/sapi-client-sdk',
    name: '使用指南',
    icon: 'GithubOutlined',
  },

  // { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
