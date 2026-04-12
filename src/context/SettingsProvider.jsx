import { useReducer } from "react";
import { SettingsContext } from "./SettingsContext";

const initialState = {
  theme: "light",
  view: "grid",
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };

    case "SET_VIEW":
      return {
        ...state,
        view: action.payload,
      };

    default:
      return state;
  }
}

export default function SettingsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SettingsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
}