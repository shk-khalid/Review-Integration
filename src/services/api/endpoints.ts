// API endpoints configuration
export const endpoints = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
    googleLogin: '/google/login',
    googleCallback: '/google/callback',
    protected: '/protected',
  },
  businesses: {
    list: '/businesses',
    details: (id: string) => `/businesses/${id}`,
    reviews: (id: string) => `/businesses/${id}/reviews`,
  },
  reviews: {
    reply: (id: string) => `/reviews/${id}/reply`,
    like: (id: string) => `/reviews/${id}/like`,
  },
} as const;