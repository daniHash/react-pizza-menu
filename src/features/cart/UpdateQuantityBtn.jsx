import { useDispatch } from "react-redux";
import { decreaseItem, increaseItem } from "./cartSlice";
import Button from "../../ui/Button";

const UpdateQuantityBtn = ({ pizzaId, quantity }) => {
  const dispatch = useDispatch();

  return (
    <div className="gap- flex items-center gap-1 md:gap-1">
      <Button type="round" onClick={() => dispatch(decreaseItem(pizzaId))}>
        -
      </Button>
      <span className="transition-all duration-300 ease-in dark:text-white">
        {quantity}
      </span>
      <Button type="round" onClick={() => dispatch(increaseItem(pizzaId))}>
        +
      </Button>
    </div>
  );
};

export default UpdateQuantityBtn;
