import { useContext } from "react";
import Modal from "./Commons/Modal";
import CartContext from "./Store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Input from "./Commons/Input";
import Button from "./Commons/Button";
import UserProgressContext from "./Store/UserProgress";
import useHttp from "../Hooks/useHttp";

const w = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const { data, isLoading, error, sendRequest,clearData } = useHttp(
    "http://localhost:3000/orders",
    w
  );

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckOut();
  }

  function handleFinish() {
    userProgressCtx.hideCheckOut();
    cartCtx.clearCart();
    clearData()
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button type="button" onClick={handleClose} textOnly>
        Close
      </Button>
      <Button>Sibmit Order</Button>
    </>
  );

  if (isLoading) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    console.log(data, "   ", error);
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success</h2>
        <p>Your order was submitted.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-mail Address" type="email" id="email" />
        <Input label="City" type="text" id="city" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="Street" type="text" id="street" />
        </div>
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
