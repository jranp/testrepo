import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage/Loginpage";
import RegisterPage from "./pages/registerpage/Registerpage";
import SearchListPage from "./pages/SearchListPage/SearchListPage";
import SitterHomepage from "./pages/SitterHomePage/SitterHomepage";
import OwnerHomePage from "./pages/OwnerHomePage/OwnerHomePage";
import SitterDetailsPage from "./pages/SitterDetailsPage/SitterDetailsPage";
import OwnerMangementPage from "./pages/OwnerManagementPage/OwnerMangementPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<OwnerHomePage />} />
      <Route path="/sitter/:id" element={<SitterHomepage />} />
      <Route path="/list" element={<SearchListPage />} />
      <Route path="/detail/:id" element={<SitterDetailsPage />} />

      <Route path="/owner/:id/:activeTaps/" element={<OwnerMangementPage />} />
      <Route
        path="/owner/:id/:activeTaps/:subTaps"
        element={<OwnerMangementPage />}
      />
      <Route
        path="/owner/:id/:activeTaps/:subTaps/:petId"
        element={<OwnerMangementPage />}
      />
    </Routes>
  );
}

export default App;
