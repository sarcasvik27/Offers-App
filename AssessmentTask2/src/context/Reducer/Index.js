export const defaultState = {
  Token: null,
  navigationState: false,
  AllOffers: [],
  SavedOffers: [],
  Otp: null,
};
export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'NAVIGATION_DECIDER':  
      return {
        ...state,
        navigationState: action.data,
      };
    case 'ALL_OFFERS':
      return {
        ...state,
        AllOffers: action?.data,
      };
    case 'TOKEN':
      return {
         ...state,
        Token: action?.data,
      };
    case 'SAVED_OFFERS':
      return {
         ...state,
        SavedOffers: action?.data,
      };
  }
};
