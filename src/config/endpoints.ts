export const endpoints = {
  v1: {
    activity_create: '/activity',
    activity_list: '/activity/user/{partnerId}',
    event_create: '/event',
    event_list: '/event/activity/{activityId}',
    booking_event: '/booking/event/{eventId}',
    booking_init: '/booking/init',
    booking_add_guest: '/booking/guest',
    booking_finish: '/booking/finish',
    booking_get: '/booking/{bookingId}',
    booking_list_by_event: '/bookings/event/{eventId}'
  }
};
