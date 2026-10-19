import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

/**
 * Root component. BrowserRouter routing ke liye, AuthProvider login
 * state poori app me share karne ke liye.
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;