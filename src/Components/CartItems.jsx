import { currencyFormatter } from "./../utils/formatting";


export default function CartItems({ name, quantity, price,onIncrease,onDecrease }) {

  return (
    <li className="cart-item">
      <p>
        {name}- {quantity}* {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
