import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Provider } from 'react-redux'
import { createStore } from 'redux'


const theme = createMuiTheme({
  palette: {
    primary: { main: "#2196f3" }
  },
  typography: {
    useNextVariants: true
  }
});

const stateChanger = (state, action) => {
  if (state === undefined) {
    return { user: {} }
  }
  else {
    if (action.type === 'LOGOUT') {
      let newState = {
        user: {}
      }
      return newState
    }
    else if (action.type === 'LOGIN') {
      let newState = {
        user: action.payload
      }
      return newState
    }
    else {
      return state
    }
  }
}

const store = createStore(stateChanger)

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
