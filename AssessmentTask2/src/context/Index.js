import React, { useReducer, createContext, useMemo } from 'react'
import { AppActions } from './Action/Index';
import { reducers } from './Reducer/Index';
import { defaultState } from './Reducer/Index';

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(reducers, defaultState);
    const actions = useMemo(() => AppActions(dispatch), []);
    return <GlobalContext.Provider value={{state:state,actions:actions} }>
        {props.children}
    </GlobalContext.Provider>
}