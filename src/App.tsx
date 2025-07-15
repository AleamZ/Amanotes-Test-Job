import { BrowserRouter } from "react-router-dom";
import MainRouter from "./routers/index.router.tsx";
import { FilterProvider } from "./context/FilterContext";

function App() {
  return (
    <FilterProvider>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </FilterProvider>
  );
}

export default App;
