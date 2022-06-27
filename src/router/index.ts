import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { AuthenticationGuard } from "vue-auth0-plugin";
import AddActivity from "@/views/activity/AddActivity.vue";
import UpdateActivity from "@/views/activity/UpdateActivity.vue";
import ListActivity from "@/views/activity/ListActivity.vue";
import AddEvent from "@/views/event/AddEvent.vue";
import ListEvent from "@/views/event/ListEvent.vue";
import UpdateEvent from "@/views/event/UpdateEvent.vue";
import ListBooking from "@/views/booking/ListBooking.vue";
import ListBookingByEvent from "@/views/booking/ListBookingByEvent.vue";
import GetBookingEvent from "@/views/bookingSession/GetBookingEvent.vue";
import AddGuest from "@/views/bookingSession/AddGuest.vue";
import ThankYou from "@/views/bookingSession/ThankYou.vue";
import ActivityCards from "@/views/partnerLanding/ActivityCards.vue";
import ActivityEventsList from "@/views/partnerLanding/ActivityEventList.vue";
import UpdateAccount from "@/views/account/UpdateAccount.vue";
import ListGuest from "@/views/guest/ListGuest.vue";
import CreateGuest from "@/views/guest/AddGuest.vue";
import NotFoundPage from "@/views/error/NotFoundPage.vue";
import PosListActivity from "@/views/pos/ListActivity.vue";
import PosActivityEventList from "@/views/pos/ActivityEventList.vue";
import PosAddGuest from "@/views/pos/AddGuest.vue";
import ListPass from "@/views/pass/ListPass.vue";
import AddPass from "@/views/pass/AddPass.vue";
import UpdatePass from "@/views/pass/UpdatePass.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "activity-cards",
    component: ActivityCards,
    props: true,
  },
  {
    path: "/activity/add",
    name: "activity-add",
    component: AddActivity,
  },
  {
    path: "/activity/update/:activityId",
    name: "activity-update",
    component: UpdateActivity,
    props: true,
  },
  {
    path: "/activity",
    name: "activity-list",
    component: ListActivity,
    //beforeEnter: AuthenticationGuard,
  },
  {
    path: "/event/add/:activityId",
    name: "event-add",
    component: AddEvent,
    props: true,
  },
  {
    path: "/events/:activityId",
    name: "event-list",
    component: ListEvent,
    props: true,
  },
  {
    path: "/event/update/:eventId",
    name: "event-update",
    component: UpdateEvent,
    props: true,
  },

  //Booking session
  {
    path: "/booking/event/:eventId",
    name: "booking-event",
    component: GetBookingEvent,
    props: true,
  },
  {
    path: "/booking/guest/:eventId",
    name: "booking-guest",
    component: AddGuest,
    props: true,
  },
  {
    path: "/booking/thankyou/:eventId",
    name: "booking-thankyou",
    component: ThankYou,
    props: true,
  },

  //Bookings
  {
    path: "/bookings/:eventId",
    name: "booking-list-by-event",
    component: ListBookingByEvent,
    props: true,
  },
  {
    path: "/bookings",
    name: "booking-list",
    component: ListBooking,
  },

  //Partner page
  {
    path: "/partner/activity/:activityId",
    name: "activity-events-list",
    component: ActivityEventsList,
    props: true,
  },

  // Account
  {
    path: "/account",
    name: "account",
    component: UpdateAccount,
    props: true,
  },

  // Guest
  {
    path: "/guests",
    name: "guest-list",
    component: ListGuest,
    props: true,
  },
  {
    path: "/guest/add",
    name: "guest-add",
    component: CreateGuest,
    props: true,
  },

  //POS
  {
    path: "/pos",
    name: "pos-activity-list",
    component: PosListActivity,
    props: true,
  },
  {
    path: "/pos/activity/:activityId",
    name: "pos-activity-event-list",
    component: PosActivityEventList,
    props: true,
  },
  {
    path: "/pos/guest/:eventId",
    name: "pos-activity-guest",
    component: PosAddGuest,
    props: true,
  },

  //Pass
  {
    path: "/pass",
    name: "pass-list",
    component: ListPass,
    props: true,
  },
  {
    path: "/pass/add",
    name: "pass-add",
    component: AddPass,
    props: true,
  },
  {
    path: "/pass/update/:passId",
    name: "pass-update",
    component: UpdatePass,
    props: true,
  },
  //Error
  /*
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
  */
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  let subdomain = window.location.host.split(".")[0];
  if (
    subdomain != "www" &&
    subdomain != "localhost:8080" &&
    subdomain != "booking"
  ) {
    to.params["subdomain"] = subdomain;
  }
  next();
});

export default router;
