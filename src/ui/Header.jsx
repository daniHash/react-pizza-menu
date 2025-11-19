import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";
import MaterialUISwitch from "./Switch";
function Header() {
  const [dark, setIsDark] = useState(() => {
    return localStorage.getItem("dark") === "true";
  });
  const userName = useSelector((state) => state.user.username);
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        Fast React Pizza Co.
      </Link>

      <div className="flex items-center justify-center">
        <SearchOrder />
      </div>
      <div className="flex items-center justify-center">
        {userName ? <Username /> : null}
        <MaterialUISwitch
          checked={dark}
          onChange={() => {
            localStorage.setItem("dark", !dark);
            setIsDark(!dark);
          }}
        />
      </div>
    </header>
  );
}

export default Header;
