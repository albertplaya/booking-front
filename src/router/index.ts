import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { AuthenticationGuard } from 'vue-auth0-plugin';
import AddActivity from '@/views/activity/AddActivity.vue';
import ListActivity from '@/views/activity/ListActivity.vue';
import AddEvent from '@/views/event/AddEvent.vue';
import ListEvent from '@/views/event/ListEvent.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/  ',
    name: 'home',
    component: AddActivity
  },
  {
    path: '/activity/add',
    name: 'activity-add',
    component: AddActivity
  },
  {
    path: '/activity',
    name: 'activity-list',
    component: ListActivity
    //beforeEnter: AuthenticationGuard
  },
  {
    path: '/event/add/:activityId',
    name: 'event-add',
    component: AddEvent,
    props: true
  },
  {
    path: '/events/:activityId',
    name: 'event-list',
    component: ListEvent,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
