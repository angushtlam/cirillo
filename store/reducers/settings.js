import {
  SET_FISHING_SESSION_IN_MINS,
  SET_REST_SESSION_IN_MINS,
} from '../actions/settings'

const initialState = {
  fishingSessionInMinutes: 25,
  restSessionInMinutes: 5,
}

export default function settings(state = initialState, action) {
  switch (action.type) {
    case SET_FISHING_SESSION_IN_MINS:
      return {
        ...state,
        fishingSessionInMinutes: action.value,
      }
    case SET_REST_SESSION_IN_MINS:
      return {
        ...state,
        restSessionInMinutes: action.value,
      }
  }

  return state
}
