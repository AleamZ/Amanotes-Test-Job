import { BrowserRouter } from "react-router-dom";
import MainRouter from "./routers/index.router.tsx";
import { FilterProvider } from "./context/FilterContext";
import { CartProvider } from "./context/CartContext";
import { PurchasedCoursesProvider } from "./context/PurchasedCoursesContext";

function App() {
  return (
    <CartProvider>
      <PurchasedCoursesProvider>
        <FilterProvider>
          <BrowserRouter>
            <MainRouter />
          </BrowserRouter>
        </FilterProvider>
      </PurchasedCoursesProvider>
    </CartProvider>
  );
}

export default App;
