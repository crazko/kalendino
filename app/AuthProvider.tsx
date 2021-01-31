import React, { useEffect, useContext, useReducer } from 'react';
import firebase from 'firebase/app';

type User = firebase.User;

type Action = { type: 'sign-in'; user: User } | { type: 'sign-out' } | { type: 'pending' } | { type: 'error' };

type AuthState =
  | {
      state: 'idle' | 'pending' | 'error' | 'non-authenticated';
      user: null;
      isLoggedIn: false;
      login: () => void;
      logout: () => void;
    }
  | {
      state: 'authenticated' | 'verified';
      user: User;
      isLoggedIn: true;
      login: () => void;
      logout: () => void;
    };

const defaultState: AuthState = {
  state: 'idle',
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
};

const authReducer = (state: AuthState, action: Action): AuthState => {
  if (process.env.NEXT_PUBLIC_CONTEXT === 'development') {
    console.log(`dispatched ${action.type} action`);
  }

  switch (action.type) {
    case 'sign-in':
      return {
        ...state,
        state: action.user.emailVerified ? 'verified' : 'authenticated',
        isLoggedIn: true,
        user: action.user,
      };

    case 'sign-out':
      return {
        ...state,
        state: 'non-authenticated',
        isLoggedIn: false,
        user: null,
      };

    case 'pending':
      return {
        ...state,
        state: 'pending',
        user: null,
        isLoggedIn: false,
      };

    case 'error':
      return {
        ...state,
        state: 'error',
        user: null,
        isLoggedIn: false,
      };

    default: {
      throw new Error(`Unhandled action: ${action}`);
    }
  }
};

const AuthContext = React.createContext<AuthState>(defaultState);

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, defaultState);

  useEffect(() => {
    dispatch({ type: 'pending' });

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: 'sign-in',
          user,
        });
      } else {
        dispatch({
          type: 'sign-out',
        });
      }
    });

    return unsubscribe;
  }, []);

  const login = async () => {
    dispatch({ type: 'pending' });

    try {
      firebase.auth().useDeviceLanguage();
      await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (e) {
      console.log(e);
      dispatch({ type: 'error' });
    }
  };

  const logout = async () => await firebase.auth().signOut();

  return <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
