import { useContext, useRef, useState } from 'react'
import { useOnClickOutside } from '../utils/utils';
import Icons from '../constants/icons';
import GlobalContext from '../context/GlobalContext';
import { Colors } from '../constants';
import Plot from 'react-plotly.js';

const PlotMenu = () => {
  const { data, isDark } = useContext(GlobalContext)
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const plotRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(plotRef, () => setIsOpened(false));


  return (
    <>
      <button 
        className={`font-geist text-cbody font-medium transition ${
          isOpened
            ? "text-indigo-500 dark:text-indigo-300"
            : `text-tx-light dark:text-tx-dark hover:text-indigo-500 hover:dark:text-indigo-300`
        }`}
        onClick={() => setIsOpened(true)}
        disabled={isOpened}
      >
        Plot
      </button>
      {isOpened && (
        <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full z-40 bg-black/10 dark:bg-white/5 bg-opacity-50 backdrop-blur-md fade-in">
          <div
            ref={plotRef}
            className="relative w-5/6 h-5/6 p-4 bg-card-light dark:bg-card-dark rounded-2xl border-4 border-solid border-card-alt-light dark:border-card-alt-dark shadow-xl shadow-black/25 fade-in-slide"
          >
            <button
              onClick={() => setIsOpened(false)}
              className="hover:brightness-95 active:brightness-75 dark:hover:brightness-75 dark:active:brightness-50 transition absolute flex items-center justify-center w-12 h-12 -top-6 -right-6 rounded-full border-4 border-solid z-50 border-card-alt-light dark:border-card-alt-dark bg-card-light dark:bg-card-dark"
            >
              <Icons.close fill={isDark ? Colors.tx.dark : Colors.tx.alt} />
            </button>
            <div className="overflow-auto w-full h-full rounded-lg bg-white">
              { data && <Plot data={data.ml.plot.data} layout={data.ml.plot.layout} style={{ width: "100%", height: "100%"}} />}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PlotMenu