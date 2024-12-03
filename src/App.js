import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Headphone from "./components/Headphone";
import Speaker from "./components/Speaker";
import Earphone from "./components/Earphone";
import ProductDetail from "./components/ProductDetail";
import Cartorder from "./components/Cartorder";
import Notfound from "./components/Notfound";

function App() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/audiophile" replace />} />

      <Route path="/audiophile" element={<Home />}>
        <Route path="headphones" element={<Headphone />} />
        <Route path="speakers" element={<Speaker />} />
        <Route path="earphones" element={<Earphone />} />
        <Route
          path=":id"
          element={
            location.pathname === "/audiophile/checkout" ? (
              <Cartorder />
            ) : (
              <ProductDetail />
            )
          }
        />
      </Route>

      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;
