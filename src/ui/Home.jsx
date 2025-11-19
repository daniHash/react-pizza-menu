import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";

function Home() {
  const userName = useSelector((state) => state.user.username);

  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-semibold transition-all duration-300 ease-in md:text-3xl dark:text-white">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {!userName && <CreateUser />}
    </div>
  );
}

export default Home;
