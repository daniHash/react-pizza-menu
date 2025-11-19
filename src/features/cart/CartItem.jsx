import { formatCurrency } from "../../utils/helpers";
import DeleteButton from "./DeleteButton";
import UpdateQuantityBtn from "./UpdateQuantityBtn";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 transition-all duration-300 ease-in sm:mb-0 dark:text-white">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold transition-all duration-300 ease-in dark:text-white">
          {formatCurrency(totalPrice)}
        </p>
      </div>
      <div className="flex items-center gap-1 sm:gap-2.5 md:gap-3">
        <UpdateQuantityBtn pizzaId={pizzaId} quantity={quantity} />
        <DeleteButton pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
