import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { AuthenticationGuard } from 'vue-auth0-plugin';
import AddActivity from '@/views/activity/AddActivity.vue';
import UpdateActivity from '@/views/activity/UpdateActivity.vue';
import ListActivity from '@/views/activity/ListActivity.vue';
import AddEvent from '@/views/event/AddEvent.vue';
import ListEvent from '@/views/event/ListEvent.vue';
import ListBooking from '@/views/booking/ListBooking.vue';
import GetBookingEvent from '@/views/bookingSession/GetBookingEvent.vue';
import AddGuest from '@/views/bookingSession/AddGuest.vue';
import ThankYou from '@/views/bookingSession/ThankYou.vue';
import NotFoundPage from '@/views/error/NotFoundPage.vue';

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
    path: '/activity/update/:activityId',
    name: 'activity-update',
    component: UpdateActivity,
    props: true
  },
  {
    path: '/activity',
    name: 'activity-list',
    component: ListActivity
    //beforeEnter: AuthenticationGuard,
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
  },

  //Booking session
  {
    path: '/booking/event/:eventId',
    name: 'booking-event',
    component: GetBookingEvent,
    props: true
  },
  {
    path: '/booking/guest/:eventId',
    name: 'booking-guest',
    component: AddGuest,
    props: true
  },
  {
    path: '/booking/thankyou/:eventId',
    name: 'booking-thankyou',
    component: ThankYou,
    props: true
  },

  //Bookings
  {
    path: '/bookings/:eventId',
    name: 'booking-list',
    component: ListBooking,
    props: true
  },

  //Error
  {
    path: '/404',
    name: 'not-found',
    component: NotFoundPage
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found-catch-all',
    component: NotFoundPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
