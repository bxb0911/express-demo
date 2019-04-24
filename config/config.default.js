exports.routes = [
  { path: '/', name: 'index' },
  { path: '/users', sub: ['/local', '/login', '/submit', '/logout'], name: 'users' },
  { path: '/members', sub: ['/local', '/login'], name: 'members' }
]