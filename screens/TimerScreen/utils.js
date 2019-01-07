export function getReadableTime(ms) {
  if (ms <= 0) return ''

  const secs = (ms / 1000) % 60
  const mins = (ms / 60000) % 60
  return `${Math.floor(mins)} m ${Math.floor(secs)} s`
}
