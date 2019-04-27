/**
 * 路由-控制器 配置
 * path     路径
 * name     控制器名称
 * method   请求方式[默认GET]
 * sub      子集配置[参数同上]
 */
exports.routes = [
  { path: '/', name: 'index'},
  {
    path: '/users',
    name: 'users', 
    sub: [
      { path: '/login', name: 'login' },
      { path: '/login', name: 'submit', method: 'post' },
      { path: '/logout', name: 'logout' }
    ]},
  { path: '/order', name: 'order' }
]