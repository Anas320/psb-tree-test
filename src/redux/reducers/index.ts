import { combineReducers } from "redux";
import authReducer from "./authReducer";
const appReducer = combineReducers({
  auth: authReducer,
});

// const appReducer = combineReducers({
//   /* your app’s top-level reducers */
//   users: UsersReducer,
//   orders: OrderReducer,
//   notifications: NotificationReducer,
//   comment: CommentReducer,
// });

const rootReducer = (state : any, action : any) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === "USER_LOGGED_OUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
