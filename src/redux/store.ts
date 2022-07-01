import {configureStore} from '@reduxjs/toolkit';
import {addInterceptor} from 'api/interceptor';
import {AuthMiddleware, IntegrationsMiddleware} from './middleware/';

import rootReducer from './reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(AuthMiddleware, IntegrationsMiddleware),
});

// attach interceptor
addInterceptor(store);

export type AppDispatch = typeof store.dispatch;

export default store;
