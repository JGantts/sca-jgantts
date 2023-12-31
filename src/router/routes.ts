import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/dashboard/DashboardPage.vue') }],
  },
  {
    path: '/save-load',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/saveLoad/SaveLoadPage.vue') }],
  },
  {
    path: '/phone-types',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/PhoneTypesPage.vue') }],
  },
  {
    path: '/phonemes',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/phonemes/PhonemesPage.vue') }],
  },
  {
    path: '/graph',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/FamilyGraph.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
