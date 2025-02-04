import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const HomeButton = () => {
  const { setData, setOriginalRecs } = useContext(GlobalContext);

  const handleHome = () => {
    setData(null);
    setOriginalRecs(null);
  };

  return (
    <button
      className="text-cbody font-geist font-medium transition text-tx-light dark:text-tx-dark hover:text-indigo-500 hover:dark:text-indigo-300"
      onClick={handleHome}
    >
      Home
    </button>
  );
};

export default HomeButton;
