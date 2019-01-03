export const CLEAR_FISHING_SESSION = 'CLEAR_FISHING_SESSION'
export const CLEAR_REST_SESSION = 'CLEAR_REST_SESSION'
export const SET_FISHING_SESSION_END_TIMESTAMP =
  'SET_FISHING_SESSION_END_TIMESTAMP'
export const SET_REST_SESSION_END_TIMESTAMP = 'SET_REST_SESSION_END_TIMESTAMP'

export function clearFishingSession() {
  return {type: CLEAR_FISHING_SESSION}
}

export function clearRestSession() {
  return {type: CLEAR_REST_SESSION}
}

export function setFishingSessionEndTimestamp(value) {
  return {type: SET_FISHING_SESSION_END_TIMESTAMP, value}
}

export function setRestSessionEndTimestamp(value) {
  return {type: SET_REST_SESSION_END_TIMESTAMP, value}
}
