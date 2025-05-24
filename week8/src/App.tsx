import debounce from "lodash/debounce";
import "./App.css";
import { throttle } from "lodash";

function App() {
  // 입력할 때만 콘솔 X
  // 입력이 멈추고 1초 후에 한 번 출력됨
  const handleDebounceSearch = debounce((query) => {
    console.log(query);
  }, 1000);

  // 1초마다 한 번씩 출력됨
  const throttledScroll = throttle(() => {
    console.log("scroll event!");
  }, 1000);

  window.addEventListener("scroll", throttledScroll);

  return (
    <>
      <div className="h-[200dvh]">
        <h3>Debounce</h3>
        <input onChange={(e) => handleDebounceSearch(e.target.value)} className="border border-blue-300" />
      </div>
    </>
  );
}

export default App;
