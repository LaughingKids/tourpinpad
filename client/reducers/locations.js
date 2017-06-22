function locations(state=[],action) {
  console.log(action);
  switch(action.type) {
    case 'SET_MAP_LOCATIONS':
      return {
        ...state,
        locations: action.locations
      }
    default:
      return state;
  }
}

exports = module.exports = locations;
