export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM_BY_INDEX = 'REMOVE_ITEM_BY_INDEX'
export const SET_CURRENCY = 'SET_CURRENCY'

export function addItem({description, name, value}) {
  return {
    type: ADD_ITEM,
    description,
    name,
    value,
  }
}

export function removeItemByIndex(index) {
  return {type: REMOVE_ITEM_BY_INDEX, index}
}

export function setCurrency(value) {
  return {
    type: SET_CURRENCY,
    value,
  }
}
