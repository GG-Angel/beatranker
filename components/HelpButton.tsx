import {
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import { useOnClickOutside } from "../utils/utils";
import Icons from "../constants/icons";
import GlobalContext from "../context/GlobalContext";
import { Colors } from "../constants";

type SectionProps = {
  header: string;
  children: ReactNode;
};

const HelpButton = () => {
  const { isDark } = useContext(GlobalContext);
  const [isOpened, setIsOpened] = useState(false);
  const helpRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(helpRef, () => setIsOpened(false));

  const Section: React.FC<SectionProps> = ({ header, children }) => {
    return (
      <div className="flex flex-row gap-x-2 font-geist font-medium text-cbody text-tx-light dark:text-tx-dark">
        <div className="flex flex-col justify-center gap-y-2 w-[28.4px]">
          <div className="flex w-full h-[28.4px] items-center justify-center">
            <Icons.linestart fill={isDark ? Colors.tx.dark : Colors.tx.light} />
          </div>
          <div className="flex flex-row flex-1 items-center">
            <div className="w-[3px] h-[95%] ml-2 rounded-full bg-tx-alt"></div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <h3 className="text-csub font-bold">{header}</h3>
          {children}
        </div>
      </div>
    );
  };

  const altStyle = "text-indigo-600 dark:text-indigo-400 hover:underline";

  return (
    <>
      <button
        className="font-geist text-cbody font-medium text-tx-light dark:text-tx-dark"
        onClick={() => setIsOpened(true)}
        disabled={isOpened}
      >
        Help
      </button>
      {isOpened && (
        <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full z-40 bg-black/10 dark:bg-white/5 bg-opacity-50 backdrop-blur-md fade-in">
          <div
            ref={helpRef}
            className="relative w-5/6 sm:w-4/5 h-3/5 max-w-[800px] p-8 rounded-2xl border-4 border-solid border-card-alt-light dark:border-card-alt-dark bg-card-light dark:bg-card-dark text-tx-light dark:text-tx-dark shadow-xl shadow-black/25 fade-in-slide"
          >
            <button
              onClick={() => setIsOpened(false)}
              className="hover:brightness-95 active:brightness-75 dark:hover:brightness-75 dark:active:brightness-50 transition absolute flex items-center justify-center w-12 h-12 -top-6 -right-6 rounded-full border-4 border-solid z-50 border-card-alt-light dark:border-card-alt-dark bg-card-light dark:bg-card-dark"
            >
              <Icons.close fill={isDark ? Colors.tx.dark : Colors.tx.alt} />
            </button>
            <div className="flex flex-col h-full gap-y-8 overflow-scroll font-geist text-cbody font-medium">
              <Section header="What is BeatRanker?">
                <p>
                  <span className="font-bold">BeatRanker</span> is a web
                  app made to help{" "}
                  <a
                    className={altStyle}
                    href="https://beatsaber.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Beat Saber
                  </a>{" "}
                  players discover maps they should play in order to efficiently
                  improve their rank on{" "}
                  <a
                    className={altStyle}
                    href="https://beatleader.xyz/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    BeatLeader.
                  </a>
                </p>
                <p>
                  We base these recommendations off of maps with the highest
                  scoring potential according to your skill.
                </p>
              </Section>
              <Section header="How do I get started?">
                <p>
                  Simply paste your BeatLeader profile ID or URL into the box
                  and click the search icon. You can get your URL by{" "}
                  <a
                    className={altStyle}
                    href="https://beatleader.xyz/ranking/1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    navigating to your profile on BeatLeader
                  </a>{" "}
                  and copying the page address in your browser's navigation bar
                </p>
              </Section>
              <Section header="How does this algorithm work?">
                <ul className="list-disc list-outside ml-3">
                  <li>
                    We train an exponential regression model to predict your
                    accuracy potential from your BeatLeader ranked scores.
                  </li>
                  <li>
                    Our algorithm learns from the accuracy you scored according
                    to each map's speed, acc, and tech difficulty. Newer scores
                    are also prioritized by our algorithm in order to better
                    estimate your current skill level.
                  </li>
                  <li>
                    We then plug every ranked map into this complex model and
                    find those that you could gain the most weighted PP from
                    playing.
                  </li>
                  <li>
                    <span className="font-bold">NOTE:</span> These
                    recommendations are estimates and are not 100% accurate, so
                    take them with a grain of salt.
                  </li>
                </ul>
              </Section>
              <Section header="Why is a map not showing up?">
                <p>
                  The list of ranked maps are gathered every 2 hours using the
                  BeatLeader API. Please wait for the next update at XXXXX (the
                  last update was at XXXXX).
                </p>
              </Section>
              <Section header="I found an issue or have an idea!">
                <p>
                  Feel free to contact me on Discord @.furious. or submit
                  issues/pull requests to my{" "}
                  <a
                    className={altStyle}
                    href="https://github.com/GG-Angel?tab=repositories&q=beatranker&type=&language=&sort="
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub!
                  </a>
                </p>
              </Section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpButton;
