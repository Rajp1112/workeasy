const ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    UPDATE_AVAILABILITY: 'api/auth/workers/availability',
  },
  USER: {
    GET_USER: '/api/auth/user',
    GET_WORKERS: '/api/auth/workers',
  },
  SERVICE: '/api/data/service',
  ADMIN_DASHBOARD: '/api/admin/users',
  CONTACT: '/api/form/contact',

  BOOKING: {
    CREATE: '/api/bookings/',
    GET_ALL: '/api/bookings',
    GET_CUSTOMER_BOOKINGS: '/api/bookings/customer',
    GET_WORKERS_BOOKINGS: '/api/bookings/worker',
    UPDATE: '/api/bookings',
    DELETE: '/api/bookings',
  },
  REVIEW: {
    CREATE: 'api/reviews/',
    GET_REVIEW_BY_WORKER: 'api/reviews/worker',
    UPDATE_REVIEW: 'api/reviews',
    DELETE_REVIEW: 'api/reviews',
  },
};

export default ENDPOINTS;
