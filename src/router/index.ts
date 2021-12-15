import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import AddActivity from '../views/activity/AddActivity.vue';
import AddEvent from '../views/event/AddEvent.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/activity/add',
    name: 'activity-add',
    component: AddActivity
  },
  {
    path: '/event/add/:activityId',
    name: 'event-add',
    component: AddEvent,
    props: true
  } /*
  {
    path: '/external-api',
    component: ExternalApi,
    beforeEnter: Auth0.routeGuard
  }*/
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
