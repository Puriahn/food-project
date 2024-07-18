import Checkout from "./Components/Checkout";
import ShopCart from "./Components/Commons/ShopCart";
import Header from "./Components/Header";
import Meals from "./Components/Meals";
import { CartContextProvider } from "./Components/Store/CartContext";
import UserProgressContext, {
  UserProgressContextProvider,
} from "./Components/Store/UserProgress";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        
        <Header />
        <Meals />
        <ShopCart/>
        <Checkout/>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
