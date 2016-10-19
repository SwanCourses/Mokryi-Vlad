import {SET_USER_PROFILE} from './UserActions';
// Initial State
const initialState = { };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };

    default:
      return state;
  }
};

/* Selectors */

export const getUserProfile = (state) => {
  return state.user.profile;
};

// Export Reducer
export default UserReducer;
