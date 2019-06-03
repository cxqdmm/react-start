const ADD_GOODS = 'ADD_GOODS';
const REMOVE_GOODS = 'REMOVE_GOODS';
const initialState = [];

const add = (state, action) => {
  state.push({
    name: action.name,
  })
  return state;
}

const remove = (state, action) => {
  state.splice(action.index);
  return state;
}

const shopReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_GOODS:
      return [].concat(add(state, action));
    case REMOVE_GOODS:
      return [].concat(remove(state, action));
    default:
      return state;
  }
}
export { ADD_GOODS, REMOVE_GOODS, shopReducer };