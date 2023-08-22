import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Configuracao from "./Paginas";
import Sorteio from "./Paginas/Sorteio";

function App() {
  return (
    <div>
      <BrowserRouter>
        <RecoilRoot>
          <Routes>
            <Route path="/" element={<Configuracao />} />
            <Route path="/sorteio" element={<Sorteio />} />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;
