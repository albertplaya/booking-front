export const endpoints = {
  v1: {
    partner_create: '/partner',
    activity_create: '/activity',
    activity_update: '/activity',
    activity_get: '/activity/{activityId}',
    activity_list: '/activity/user/{partnerId}',
    activity_upload_image: '/activity/image',
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
