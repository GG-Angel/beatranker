import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const HomeButton = () => {
  const { setData } = useContext(GlobalContext);
  return (
    <button
      className="text-cbody font-geist font-medium transition text-tx-light dark:text-tx-dark hover:text-indigo-500 hover:dark:text-indigo-300"
      onClick={() => setData(null)}
    >
      Home
    </button>
  );
};

export default HomeButton
