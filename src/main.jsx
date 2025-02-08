import React, { StrictMode } from "react"; 
import { createRoot } from "react-dom/client"; 
import { BrowserRouter } from "react-router-dom"; 
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const root = createRoot(document.getElementById("root")); 

root.render(
  <StrictMode> 
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
