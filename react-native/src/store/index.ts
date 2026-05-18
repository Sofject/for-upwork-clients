// @ts-nocheck
0
import { rootApi } from '@api';
import { reduxStorage } from '@core/storage/ReduxStorage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { appReducer } from '@features/app';
import { authReducer } from '@features/auth';
import { createPostReducer } from '@features/createPosts';
import { postReducer } from '@features/posts';
import { profileReducer } from '@features/profile';
import { shoppingListReducer, pantryReducer } from '@features/shoppingList';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  createPost: createPostReducer,
  post: postReducer,
  shoppingList: shoppingListReducer,
  pantry: pantryReducer,
  [rootApi.reducerPath]: rootApi.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: reduxStorage,
  whitelist: ['auth', 'app', 'shoppingList', 'pantry'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(rootApi.middleware);

    return middleware;
  },
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
