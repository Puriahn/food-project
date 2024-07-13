import { useContext } from "react";
import logoimg from "../assets/logo.jpg";
import Button from "./Commons/Button";
import CartContext from "./Store/CartContext";
import UserProgressContext from "./Store/UserProgress";
export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx=useContext(UserProgressContext)


  const totalCartItems = cartCtx.items.reduce((totalNumbersOfItems, item) => {
    return totalNumbersOfItems + item.quantity;
  }, 0);

  function handleShowCart(){
    userProgressCtx.showCart()
  }


  return (
    <header id="main-header">
      <div id="title">
        <img src={logoimg} alt="The Logo Of Resturant" />
        <h1>rEACTfOOD</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart} textOnly>Cart({totalCartItems})</Button>
      </nav>
    </header>
  );
}
