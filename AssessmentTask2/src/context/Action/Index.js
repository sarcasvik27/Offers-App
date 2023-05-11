export const AppActions = dispatch => ({
    NavigationDecider: async data => {
        dispatch({ type: 'NAVIGATION_DECIDER', data });
    },
    AllOffersAction: async data=>{
        dispatch({type: 'ALL_OFFERS',data})
    },
    TokenAction: async data=>{
        dispatch({type:'TOKEN',data})
    },
    SaveOffersAction: async data=>{
        dispatch({type:'SAVED_OFFERS',data})
    }

});