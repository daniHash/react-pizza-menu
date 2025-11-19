import { Outlet, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTotalQuantity } from "../features/cart/cartSlice";
import Header from "./Header";
import Loader from "./Loader";
import CartOverview from "../features/cart/CartOverview";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const totalQuantity = useSelector(getTotalQuantity);
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      <Header />

      <div className="overflow-auto">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      {!totalQuantity ? null : <CartOverview />}
    </div>
  );
}

export default AppLayout;
