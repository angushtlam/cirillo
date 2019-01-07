import {
  CLEAR_SESSION,
  SET_END_TIMESTAMP,
  SET_START_TIMESTAMP,
  SET_TIMER_STATE,
  timerStates,
} from '../actions/timer'

const initialState = {
  endTimestamp: -1,
  startTimestamp: -1,
  timerState: timerStates.NOT_STARTED_FISHING,
}

export default function settings(state = initialState, action) {
  switch (action.type) {
    case CLEAR_SESSION:
      return {
        ...state,
        endTimestamp: -1,
        startTimestamp: -1,
        timerState: timerStates.NOT_STARTED_FISHING,
      }
    case SET_END_TIMESTAMP:
      return {
        ...state,
        endTimestamp: action.value,
      }
    case SET_START_TIMESTAMP:
      return {
        ...state,
        startTimestamp: action.value,
      }
    case SET_TIMER_STATE:
      return {
        ...state,
        timerState: action.timerState,
      }
  }

  return state
}
