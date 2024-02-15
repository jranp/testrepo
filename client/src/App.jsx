import "./App.css";
import jwtInterceptor from "./utils/jwtInterceptor.js";
import { useAuth } from "./contexts/authentication.jsx";
import OwnerApp from "./OwnerApp.jsx";
import GuestApp from "./GuestApp.jsx";
import SitterApp from "./SitterApp.jsx";

function App() {
  jwtInterceptor();
  const { state } = useAuth();

  return (
    <>
      {state.user && state.user.role === "pet_owner" && <OwnerApp />}
      {!state.user && <GuestApp />}
      {state.user && state.user.role === "pet_sitter" && <SitterApp />}
    </>
  );
}

export default App;
