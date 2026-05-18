// @ts-nocheck

export const ENDPOINTS = {
  AUTH: {
    REGISTER: '/register',
    LOGIN: '/login',
    LOGOUT: '/logout',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
  },

  USER: {
    PROFILE: '/profile',
    GET_USER_BY_ID: (id: number) => `/user/id/${id}`,
    UPDATE: '/user',
    SETTINGS: '/settings',
    CHANGE_PASSWORD: '/change-password',
  },

  POSTS: {
    BASE: '/posts',
    SAVED: (userId: number, offset: number) => `/posts/saved/${userId}/${offset}`,
    TOGGLE_SAVE: (postId: number) => `/posts/${postId}/save`,
    NEWSFEED: (limit: number, offset: number) => `/posts/${limit}/${offset}`,
    POST_BY_ID: (id: number) => `/posts/${id}`,
    EDIT_POST: (id: number) => `/posts/${id}`,
    USER_POSTS: (userId: number, limit: number, offset: number) => `/posts/user/${userId}/${limit}/${offset}`,
    USER_REELS: (userId: number, limit: number, offset: number) => `/reels/user/${userId}/${limit}/${offset}`,
  },
  
  COMMENTS: {
    ADD_COMMENTS: '/comments',
    GET_COMMENTS: (postId: string | number, limit: number, offset: number) => `/comments/${postId}/${limit}/${offset}`,
    DELETE_COMMENTS: (commentId: number) => `/comments/${commentId}`,
    UPDATE_COMMENTS: (commentId: number) => `/comments/${commentId}`,
    REACT_COMMENT: (commentId: number) => `/comments/${commentId}/react`,
    REPLY_COMMENT: (commentId: number) => `/comments/${commentId}/reply`,
  },

  SEARCH: {
    USERS: (query: string) => `/users/search/${query}`,
    RECIPES: (query: string) => `/posts/search/${query}`,
    TAGS: (tag: string) => `/posts/search-tag/${tag}`,
    INGREDIENTS: (tag: string) => `/ingredients/search/${tag}`,
  },

  NOTIFICATIONS: {
    BASE: '/notifications',
    REGISTER_TOKEN: '/notifications/register-token',
  },

  SUGGEST: {
    TRENDING: '/suggest-trending',
  },

  MEAL_PLAN: {
    ADD_MEAL: '/meals',
    USER_MEAL: (userId: number) => `/meals/user/${userId}`,
    DELETE_MEAL: (mealId: number) => `/meals/${mealId}`,
  },

  FOOD_SCANNER: {
    SCAN_IMAGE: '/scan-history/auto',
    GET_HISTORY: '/scan-history/history',
    DELETE_HISTORY: (scanId: number) => `/scan-history/${scanId}`,
  },

  SHOPPING_LIST: {
    ADD_FROM_POST: (postId: number) => `/shopping/from-post/${postId}`,
    ADD_BATCH: '/shopping/ingredients/aggregate',
    ADD_COMBO: '/shopping/combo',
    GET_HISTORY: '/shopping/history',
    DELETE_HISTORY: (listId: number) => `/shopping/${listId}`,
    GET_DETAILS: (listId: number) => `/shopping/${listId}/details`,
    ADD_ITEM: (listId: number) => `/shopping/${listId}/item`,
  },
};
