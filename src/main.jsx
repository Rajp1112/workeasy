import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./app/auth";
import { ToastProvider } from "./components/ToastProvider";

// Custom Material UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1f2937", // dark gray/blue
    },
    secondary: {
      main: "#f50057", // pink
    },
  },
});

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Provider store={store}>
          <BrowserRouter>
          <ToastProvider>
            <App />
          </ToastProvider>
            <ToastContainer />
          </BrowserRouter>
        </Provider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
