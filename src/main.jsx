import React, { StrictMode } from "react"; // ✅ Import StrictMode
import { createRoot } from "react-dom/client"; // ✅ Correct import
import { BrowserRouter } from "react-router-dom"; // ✅ Import BrowserRouter
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const root = createRoot(document.getElementById("root")); // ✅ Fix createRoot

root.render(
  <StrictMode> 
    <BrowserRouter> {/* ✅ Ensure BrowserRouter wraps everything */}
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
