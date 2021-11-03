import settings from "@/config/settings";
import {RoutesDataItem} from "@/utils/routes";
import BlankLayout from '@/layouts/BlankLayout.vue';

const IndexLayoutRoutes: Array<RoutesDataItem> = [
  /*
  {
    title: 'index-layout.menu.home',
    path: '/home',
    component: ()=> import('@/views/home/index.vue')
  }, */
  {
    icon: 'home',
    title: 'index-layout.menu.home',
    path: '/home',
    redirect: settings.homeRouteItem.path,
    component: BlankLayout,
    children: [
      {
        ...settings.homeRouteItem
      }
    ]
  },
  {
    icon: 'files',
    title: 'index-layout.menu.demand',
    path: '/demand',
    redirect: '/demand/all',
    component: BlankLayout,
    children: [
      {
        icon: 'list',
        title: 'index-layout.menu.demand.all',
        path: 'all',
        component: () => import('@/views/demand/all/index.vue'),
      }
    ]
  },
  {
    icon: 'files',
    title: 'index-layout.menu.project',
    path: '/project',
    redirect: '/project/all',
    component: BlankLayout,
    children: [
      {
        icon: 'list',
        title: 'index-layout.menu.project.all',
        path: 'all',
        component: () => import('@/views/project/all/index.vue'),
      }
    ]
  },
  {
    icon: 'files',
    title: 'index-layout.menu.feedback',
    path: '/feedback',
    redirect: '/feedback/all',
    component: BlankLayout,
    children: [
      {
        icon: 'list',
        title: 'index-layout.menu.feedback.all',
        path: 'all',
        component: () => import('@/views/feedback/all/index.vue'),
      }
    ]
  },
  {
    icon: 'files',
    title: 'index-layout.menu.service',
    path: '/service',
    redirect: '/service/all',
    component: BlankLayout,
    children: [
      {
        icon: 'list',
        title: 'index-layout.menu.service.all',
        path: 'all',
        component: () => import('@/views/service/all/index.vue'),
      }
    ]
  },
  {
    icon: 'permissions',
    title: 'index-layout.menu.roles',
    path: '/roles',
    redirect: '/roles/all',
    component: BlankLayout,
    children: [
      {
        icon: 'detail',
        title: 'index-layout.menu.roles.all',
        path: 'all',
        component: () => import('@/views/roles/all/index.vue'),
      },
      {
        icon: 'detail',
        roles: ['user'],
        title: 'index-layout.menu.roles.user',
        path: 'user',
        component: () => import('@/views/roles/user/index.vue'),
      },
      {
        icon: 'detail',
        roles: ['test'],
        title: 'index-layout.menu.roles.test',
        path: 'test',
        component: () => import('@/views/roles/test/index.vue'),
      }
    ]
  }
];

export default IndexLayoutRoutes;
