import { useAuth } from "@/use/Authentication";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Register from "@/views/auth/Register.vue";
import Login from "@/views/auth/Login.vue";
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
import Guest from "@/views/guest/Guest.vue";
import NotFoundPage from "@/views/error/NotFoundPage.vue";
import PosListActivity from "@/views/pos/ListActivity.vue";
import PosActivityEventList from "@/views/pos/ActivityEventList.vue";
import PosAddGuest from "@/views/pos/AddGuest.vue";
import ListPass from "@/views/pass/ListPass.vue";
import AddPass from "@/views/pass/AddPass.vue";
import UpdatePass from "@/views/pass/UpdatePass.vue";
import AssignPass from "@/views/guestPass/AssignPass.vue";
import Wallet from "@/views/wallet/Wallet.vue";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    redirect: { name: "activity-list" },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    props: true,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    props: true,
  },
  {
    path: "/activity/add",
    name: "activity-add",
    component: AddActivity,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/activity/update/:activityId",
    name: "activity-update",
    component: UpdateActivity,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/activity",
    name: "activity-list",
    component: ListActivity,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/event/add/:activityId",
    name: "event-add",
    component: AddEvent,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/events/:activityId",
    name: "event-list",
    component: ListEvent,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/event/update/:eventId",
    name: "event-update",
    component: UpdateEvent,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },

  //Booking session thought partner landing
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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/bookings",
    name: "booking-list",
    component: ListBooking,
    meta: {
      requiresAuth: true,
    },
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
    meta: {
      requiresAuth: true,
    },
  },

  // Guest
  {
    path: "/guests",
    name: "guest-list",
    component: ListGuest,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/guest/:guestId",
    name: "guest",
    component: Guest,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/guest/add",
    name: "guest-add",
    component: CreateGuest,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },

  //POS
  {
    path: "/pos",
    name: "pos-activity-list",
    component: PosListActivity,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/pos/activity/:activityId",
    name: "pos-activity-event-list",
    component: PosActivityEventList,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/pos/guest/:eventId",
    name: "pos-activity-guest",
    component: PosAddGuest,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },

  //Pass
  {
    path: "/pass",
    name: "pass-list",
    component: ListPass,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/pass/add",
    name: "pass-add",
    component: AddPass,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/pass/update/:passId",
    name: "pass-update",
    component: UpdatePass,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },

  // Pass Guest
  {
    path: "/pass/assign",
    name: "pass-assign",
    component: AssignPass,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },

  //Wallet
  {
    path: "/wallet",
    name: "wallet",
    component: Wallet,
    props: false,
    meta: {
      requiresAuth: true,
    },
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

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        next({ name: "login" });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

export default router;
