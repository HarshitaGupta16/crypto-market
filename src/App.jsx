import { Route, Routes, useParams } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import CoinPage from "./components/Pages/CoinPage";
import Home from "./components/Pages/Home";

function App() {
  const { id } = useParams();
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins/:id" element={<CoinPage />} />
      </Routes>
    </div>
  );
}

export default App;
