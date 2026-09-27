import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import "./App.css";

/**
 * App.tsx
 * ---------------------------------------------------------
 * Root component. Wraps the whole app in BrowserRouter so
 * that routing (AppRoutes.tsx) works, and renders the
 * matched page.
 * ---------------------------------------------------------
 */
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;