import {
  CLEAR_FISHING_SESSION,
  CLEAR_REST_SESSION,
  SET_FISHING_SESSION_END_TIMESTAMP,
  SET_REST_SESSION_END_TIMESTAMP,
} from '../actions/timer'

const initialState = {
  fishingSessionEndTimestamp: -1,
  restSessionEndTimestamp: -1,
}

export default function settings(state = initialState, action) {
  switch (action.type) {
    case CLEAR_FISHING_SESSION:
      return {
        ...state,
        fishingSessionEndTimestamp: -1,
      }
    case CLEAR_REST_SESSION:
      return {
        ...state,
        restSessionEndTimestamp: -1,
      }
    case SET_FISHING_SESSION_END_TIMESTAMP:
      return {
        ...state,
        fishingSessionEndTimestamp: action.value,
      }
    case SET_REST_SESSION_END_TIMESTAMP:
      return {
        ...state,
        restSessionEndTimestamp: action.value,
      }
  }

  return state
}
