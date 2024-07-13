import { useContext } from "react";
import { currencyFormatter } from "../utils/formatting.js";
import Button from "./Commons/Button.jsx";
import CartContext from "./Store/CartContext.jsx";
import useHttp from "../Hooks/useHttp.js";
import Error from "./Commons/Error.jsx";
const w = {};

export default function Meals() {
  const cartCtx = useContext(CartContext);

  const { data, isLoading, error } = useHttp(
    "http://localhost:3000/meals",
    w,
    []
  );

  if (isLoading) {
    return <p className="center">Fetching Meals...</p>;
  }
  if (error) {
    return <Error title="Failed to fetch data" message={error} />;
  }

  function handleAddMealToCart(meal) {
    cartCtx.addItem(meal);
  }

  return (
    <ul id="meals">
      {data.map((meal) => (
        <li key={meal.id} className="meal-item">
          <article>
            <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
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
        </li>
      ))}
    </ul>
  );
}
