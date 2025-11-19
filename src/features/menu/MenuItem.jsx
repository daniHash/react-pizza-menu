import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import {
  addItem,
  getCurrentQuantityById,
  increaseItem,
} from "../cart/cartSlice";
import Button from "../../ui/Button";
import DeleteButton from "../cart/DeleteButton";
import UpdateQuantityBtn from "../cart/UpdateQuantityBtn";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  const handleAdd = () => {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };
    currentQuantity > 0
      ? dispatch(increaseItem(id))
      : dispatch(addItem(newItem));
  };
  return (
    <li className="group flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/pizza.jpg";
        }}
        className={`image h-24 w-24 cursor-pointer object-cover transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] group-hover:scale-105 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium transition-all duration-300 ease-in dark:text-white">
          {name}
        </p>
        <p className="text-sm text-stone-500 capitalize italic transition-all duration-300 ease-in dark:text-stone-400">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm transition-all duration-300 ease-in dark:text-white">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="text-sm font-medium text-stone-500 uppercase transition-all duration-300 ease-in dark:text-stone-400">
              Sold out
            </p>
          )}

          {currentQuantity > 0 && (
            <div className="flex items-center gap-1 sm:gap-2.5 md:gap-3">
              <UpdateQuantityBtn pizzaId={id} quantity={currentQuantity} />
              <DeleteButton pizzaId={id} />
            </div>
          )}

          {!soldOut && !currentQuantity && (
            <Button type="small" onClick={handleAdd}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
