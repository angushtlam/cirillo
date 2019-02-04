const accents = {
  purple: 'rgb(82, 72, 196)',
  blue: 'rgb(24, 103, 224)',
  aqua: 'rgb(30, 168, 168)',
  pink: 'rgb(186, 46, 79)',
}

const muted = {
  purple: 'rgb(49, 46, 84)',
  blue: 'rgb(35, 54, 99)',
  aqua: 'rgb(35, 86, 99)',
  pink: 'rgb(84, 47, 74)',
}

const grayscale = {
  shade0: '#ecebfa',
  shade10: '#d9d7f2',
  shade20: '#bebce0',
  shade30: '#9e9dc1',
  shade40: '#787897',
  shade50: '#525369',
  shade60: '#31323f',
  shade70: '#181a20',
  shade80: '#0a0b0d',
  shade90: '#040405',
}

export default {
  accents,
  muted,
  grayscale,
  tintColor: accents.aqua,
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: accents.aqua,
  noticeText: '#fff',
}
