import {
  ADD_ITEM,
  REMOVE_ITEM_BY_INDEX,
  SET_CURRENCY,
} from '../actions/inventory'

const initialState = {
  currency: 0,
  items: [],
}

export default function inventory(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [
          ...state.items,
          {
            description: action.description,
            name: action.name,
            value: action.value,
          },
        ],
      }
    case REMOVE_ITEM_BY_INDEX:
      return {
        ...state,
        items: state.items.filter((_, i) => i !== action.index),
      }
    case SET_CURRENCY:
      return {
        ...state,
        currency: action.value,
      }
  }

  return state
}
