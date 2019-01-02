export const SET_FISHING_SESSION_IN_MINS = 'SET_FISHING_SESSION_IN_MINS'
export const SET_REST_SESSION_IN_MINS = 'SET_REST_SESSION_IN_MINS'

export function setFishingSessionInMinutes(value) {
  return {type: SET_FISHING_SESSION_IN_MINS, value}
}

export function setRestSessionInMinutes(value) {
  return {type: SET_REST_SESSION_IN_MINS, value}
}
