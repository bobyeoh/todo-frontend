export default [
  {
    path: '/',
    component: () => import('@/views/login'),
  },
  {
    path: '/board',
    component: () => import('@/views/board'),
  },
];
