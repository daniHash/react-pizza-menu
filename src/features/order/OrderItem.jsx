import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p className="transition-all duration-300 ease-in dark:text-white">
          <span className="font-bold transition-all duration-300 ease-in dark:text-white">
            {quantity}&times;
          </span>{" "}
          {name}
        </p>
        <p className="font-bold transition-all duration-300 ease-in dark:text-white">
          {formatCurrency(totalPrice)}
        </p>
      </div>
      <p className="text-sm text-stone-500 capitalize italic transition-all duration-300 ease-in dark:text-stone-400">
        {isLoadingIngredients ? "Loading..." : ingredients.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
