import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { createTheme, ThemeProvider } from "@mui/material";

import App from "./App";

const { store, persistor } = configureStore();
const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Make sure that 'rootElement' is not null
const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","), // Corrected to use parentheses
  },
});

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      {" "}
      {/* Added ThemeProvider */}
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
