import { useContext } from "react";
import { currencyFormatter } from "../utils/formatting.js";
import Button from "./Commons/Button.jsx";
import CartContext from "./Store/CartContext.jsx";
import mealss from '../available-meals.json'

export default function Meals() {
  const cartCtx = useContext(CartContext);

  
  function handleAddMealToCart(meal) {
    cartCtx.addItem(meal);
  }

  return (
    <ul id="meals">
      {mealss.map((meal) => {
      return (
        <li key={meal.id} className="meal-item">
          <article>
            <img src={`../../${meal.image}`} alt={meal.name} />
            <div>
              <h3>{meal.name}</h3>
              <p className="meal-item-price">
                {currencyFormatter.format(meal.price)}
              </p>
              <p className="meal-item-description">{meal.description}</p>
            </div>
            <p className="meal-item-actions">
              <Button onClick={() => handleAddMealToCart(meal)}>
                Add To Cart
              </Button>
            </p>
          </article>
        </li>)
      })}
    </ul>
  );
}
