import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { points } from './points.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  points
});

export default rootReducer;