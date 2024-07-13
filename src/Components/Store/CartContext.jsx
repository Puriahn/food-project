import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartIndexItem = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];
    if (existingCartIndexItem > -1) {
      const updateditem = {
        ...state.items[existingCartIndexItem],
        quantity: state.items[existingCartIndexItem].quantity + 1,
      };
      updatedItems[existingCartIndexItem] = updateditem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingCartIndexItem = state.items.findIndex(
      (item) => item.id === action.id
    );
    const updatedItems = [...state.items];

    if (state.items[existingCartIndexItem].quantity === 1) {
      updatedItems.splice(existingCartIndexItem, 1);
    } else {
      const updateditem = {
        ...state.items[existingCartIndexItem],
        quantity: state.items[existingCartIndexItem].quantity - 1,
      };
      updatedItems[existingCartIndexItem] = updateditem;
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "CLEAR-CART") {
    return { ...state, items: [] };
  }
  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
    addItem,
    removeItem,
  });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }
  function clearCart() {
    dispatchCartAction({ type: "CLEAR-CART" });
  }
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
export default CartContext;
