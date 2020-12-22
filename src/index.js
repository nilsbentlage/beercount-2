import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { ThemeProvider, createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import themeConfig from './config/theme.jsx'

let theme = createMuiTheme(themeConfig);

theme = responsiveFontSizes(theme);

ReactDOM.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>{" "}
    </ThemeProvider>
  </RecoilRoot>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
