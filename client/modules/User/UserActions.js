import callApi from '../../util/apiCaller';
export const SET_USER_PROFILE = 'SET_USER_PROFILE';
import { browserHistory } from 'react-router';

export function addUserRequest(user) {
  return (dispatch) => {
    return callApi('users/registration', 'post', { user }).then(res => {
      localStorage.setItem('authentication_token', res.token);
      localStorage.setItem('is_admin', res.admin);
      browserHistory.push('/');
    });
  };
}

export function signInRequest(creds) {
  return (dispatch) => {
    return callApi('auth', 'post', creds).then(res => {
      localStorage.setItem('authentication_token', res.token);
      localStorage.setItem('is_admin', res.admin);
      browserHistory.push('/');
    });
  };
}

export function setUserProfile(profile) {
  return {
    type: SET_USER_PROFILE,
    profile,
  };
}

export function fetchUserProfile() {
  return (dispatch) => {
    return callApi('users/profile').then(res => {
      dispatch(setUserProfile(res));
    });
  };
}

export function updateProfile(data) {
  return (dispatch) => {
    return callApi('users/profile', 'put', data).then(res => {
      dispatch(setUserProfile(res));
    });
  };
}
