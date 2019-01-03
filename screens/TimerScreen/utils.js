export const timerStates = {
  NOT_STARTED_FISHING: 0,
  IN_FISHING: 1,
  IN_REST: 2,
}

export function getReadableTime(ms) {
  const secs = (ms / 1000) % 60
  const mins = (ms / 60000) % 60
  return `${Math.floor(mins)} m ${Math.floor(secs)} s`
}

export function getTimerState(
  fishingSessionEndTimestamp,
  restSessionEndTimestamp
) {
  if (fishingSessionEndTimestamp === -1 && restSessionEndTimestamp === -1) {
    return timerStates.NOT_STARTED_FISHING
  } else if (restSessionEndTimestamp === -1) {
    return timerStates.IN_FISHING
  } else if (fishingSessionEndTimestamp === -1) {
    return timerStates.IN_REST
  }

  return timerStates.NOT_STARTED_FISHING
}
