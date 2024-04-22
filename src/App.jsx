import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeV4 from "./pages/HomeV4";
import { useEffect } from "react";
import ClaimToken from "./pages/ClaimToken";
import Header from "./components/header/v4/Header";
import HowToBuy from "./pages/HowToBuy";

function App() {
  useEffect(() => {
    if (window.location.href.includes("?ref=")) {
      let getAddress = window.location.href.split("?ref=")[1];
      let final = getAddress.slice(0, 42);
      localStorage.setItem("bfm_refAddress", final);
    }
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeV4 />} />
        <Route path="/claim-token" element={<ClaimToken />} />
        <Route path="/HowToBuy" element={<HowToBuy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
