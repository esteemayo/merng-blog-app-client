import { useReducer, useContext, createContext } from 'react';
import jwtDecode from 'jwt-decode';

import { LOGIN, LOGOUT } from './Types';
import reducer from './Reducer';

const tokenKey = 'jwtToken';

const initialState = {
  user: null,
};

const token = localStorage.getItem(tokenKey);
if (token) {
  const decodedToken = jwtDecode(token);
  const expiredToken = decodedToken.exp * 1000;

  if (Date.now() > expiredToken) {
    localStorage.removeItem(tokenKey);
  } else {
    initialState.user = decodedToken;
  }
}

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = (userData) => {
    localStorage.setItem(tokenKey, userData.token);
    dispatch({
      type: LOGIN,
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem(tokenKey);
    dispatch({ type: LOGOUT });
  };

  return (
    <AppContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
