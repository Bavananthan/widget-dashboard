import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Action Types
const ADD_WIDGET = 'ADD_WIDGET';
const REMOVE_WIDGET = 'REMOVE_WIDGET';
const UPDATE_WIDGET = 'UPDATE_WIDGET';
const UPDATE_LAYOUTS = 'UPDATE_LAYOUTS';
const TOGGLE_THEME = 'TOGGLE_THEME';
const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
const SET_WIDGETS = 'SET_WIDGETS';
const SET_LAYOUTS = 'SET_LAYOUTS';
const SET_IS_DARK_MODE = 'SET_IS_DARK_MODE';
const SET_IS_SIDEBAR_OPEN = 'SET_IS_SIDEBAR_OPEN';

const DashboardContext = createContext();

const initialState = {
  widgets: [],
  layouts: [],
  isDarkMode: false,
  isSidebarOpen: true,
};

// Reducer function to handle actions
function dashboardReducer(state, action) {
  switch (action.type) {
    case ADD_WIDGET:
      return { ...state, widgets: [...state.widgets, action.payload] };
    case REMOVE_WIDGET:
      return { ...state, widgets: state.widgets.filter((w) => w.id !== action.payload) };
    case UPDATE_WIDGET:
      return {
        ...state,
        widgets: state.widgets.map((w) => (w.id === action.payload.id ? action.payload : w)),
      };
    case UPDATE_LAYOUTS:
      return { ...state, layouts: action.payload };
    case TOGGLE_THEME:
      return { ...state, isDarkMode: !state.isDarkMode };
    case TOGGLE_SIDEBAR:
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    case SET_WIDGETS:
      return { ...state, widgets: action.payload };
    case SET_LAYOUTS:
      return { ...state, layouts: action.payload };
    case SET_IS_DARK_MODE:
      return { ...state, isDarkMode: action.payload };
    case SET_IS_SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: action.payload };
    default:
      return state;
  }
}

// Function to initialize state from localStorage
function initializeState() {
  const savedState = localStorage.getItem('dashboardState');
  try {
    return savedState ? JSON.parse(savedState) : initialState;
  } catch (error) {
    console.error('Error parsing state from localStorage', error);
    return initialState;
  }
}

export function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState, initializeState);

  useEffect(() => {
    localStorage.setItem('dashboardState', JSON.stringify(state));
  }, [state]);

  return <DashboardContext.Provider value={{ state, dispatch }}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
