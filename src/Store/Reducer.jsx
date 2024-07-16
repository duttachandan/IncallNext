const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload, loading: false };
    case "SET_CATEGORY_POSTS":
      return { ...state, categoryPosts: action.payload, loading: false };
    case "SET_STATES":
      return { ...state, states: action.payload, loading: false };
    case "SET_POPULAR_LOCATIONS":
      return { ...state, popularLocations: action.payload, loading: false };
    case "SET_ALL_STATES":
      return { ...state, allStates: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
