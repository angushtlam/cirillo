export const CLEAR_SESSION = 'CLEAR_SESSION'
export const SET_END_TIMESTAMP = 'SET_END_TIMESTAMP'
export const SET_START_TIMESTAMP = 'SET_START_TIMESTAMP'
export const SET_TIMER_STATE = 'SET_TIMER_STATE'

export const timerStates = {
  NOT_STARTED_FISHING: 'NOT_STARTED_FISHING',
  IN_FISHING: 'IN_FISHING',
  COMPLETED_FISHING: 'COMPLETED_FISHING',
  IN_REST: 'IN_REST',
  COMPLETED_REST: 'COMPLETED_REST',
}

export function clearSession() {
  return {type: CLEAR_SESSION}
}

export function setEndTimestamp(value) {
  return {type: SET_END_TIMESTAMP, value}
}

export function setStartTimestamp(value) {
  return {type: SET_START_TIMESTAMP, value}
}

export function setTimerState(timerState) {
  return {type: SET_TIMER_STATE, timerState}
}
