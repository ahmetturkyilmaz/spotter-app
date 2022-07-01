import {combineReducers} from '@reduxjs/toolkit';

// reducers
import nutritionReducer from '../slices/nutritionSlice';
import authReducer from '../slices/authSlice';
import programReducer from '../slices/newOrder/programSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  program: nutritionReducer,
  nutrition: programReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
