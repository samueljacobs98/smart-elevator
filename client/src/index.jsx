import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SmartElevatorProvider } from "./context/SmartElevatorProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SmartElevatorProvider>
      <App />
    </SmartElevatorProvider>
  </React.StrictMode>
);
