import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import { fetchAddress } from "../user/userSlice";
import Button from "../../ui/Button";
import store from "../../store";
import EmptyCart from "../cart/EmptyCart";
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const { username, status, position, error, address } = useSelector(
    (state) => state.user,
  );
  const [withPriority, setWithPriority] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const price = useSelector(getTotalPrice);
  const cart = useSelector(getCart);
  const formErrors = useActionData();

  const isLoading = status === "loading";
  const isSubmitting = navigation.state === "submitting";
  const periortyPrice = withPriority ? price * 0.2 : 0;

  return (
    <div className="px-4 py-6">
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          {" "}
          <h2 className="mb-8 text-xl font-semibold transition-all duration-300 ease-in dark:text-white">
            Ready to order? Let's go!
          </h2>
          <Form method="POST">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="transition-all duration-300 ease-in sm:basis-40 dark:text-white">
                First Name
              </label>
              <input
                className="input grow transition-all duration-300 ease-in dark:text-white"
                defaultValue={username}
                type="text"
                name="customer"
                required
              />
            </div>

            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="transition-all duration-300 ease-in sm:basis-40 dark:text-white">
                Phone number
              </label>
              <div className="grow">
                <input
                  className="input w-full transition-all duration-300 ease-in dark:text-white"
                  type="tel"
                  name="phone"
                  required
                />
                {formErrors?.phone && (
                  <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                    {formErrors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="transition-all duration-300 ease-in sm:basis-40 dark:text-white">
                Address
              </label>
              <div className="grow">
                <input
                  className="input w-full transition-all duration-300 ease-in dark:text-white"
                  type="text"
                  name="address"
                  disabled={isLoading}
                  defaultValue={address}
                  required
                />
                {status === "error" && (
                  <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                    {error}
                  </p>
                )}
              </div>
              {!address && (
                <span className="absolute top-[3px] right-[3px] z-50 md:top-[5px] md:right-[5px]">
                  <Button
                    disabled={isLoading}
                    type="small"
                    onClick={() => {
                      event.preventDefault();
                      dispatch(fetchAddress());
                    }}
                  >
                    Get position
                  </Button>
                </span>
              )}
            </div>

            <div className="mb-12 flex items-center gap-5">
              <input
                className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
                type="checkbox"
                name="priority"
                id="priority"
                value={withPriority}
                onChange={(e) => setWithPriority(e.target.checked)}
              />
              <label
                htmlFor="priority"
                className="font-medium transition-all duration-300 ease-in dark:text-white"
              >
                Want to yo give your order priority?
              </label>
            </div>

            <div>
              <input type="hidden" name="cart" value={JSON.stringify(cart)} />
              <input
                type="hidden"
                name="position"
                value={
                  position.latitude && position.longitude
                    ? `${position.latitude},${position.longitude}`
                    : ""
                }
              />
              <Button disabled={isSubmitting} type="primary">
                {isSubmitting
                  ? "Placing order...."
                  : `Order now from $${price + periortyPrice}`}
              </Button>
            </div>
          </Form>
        </>
      )}
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
