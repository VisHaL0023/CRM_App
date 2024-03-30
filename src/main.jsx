import "./index.css";

import { ThemeProvider } from "@material-tailwind/react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import store from "./Redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
);
