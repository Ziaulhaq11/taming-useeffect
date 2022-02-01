import { useState, useEffect, useMemo } from "react";
import "./App.css";

import { useFetch } from "./useFetch";
import { useFetchPrevious } from "./useFetchPrevious";

const useStopwatch = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("useStopwatch useEffect");
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
      console.log(`Count = ${count}`);
    }, 1000);
    return () => {
      console.log('cleanup')
      clearInterval(interval)
    };
  }, []);

  return count;
};

function App() {
  const [url, setUrl] = useState(null);
  // const myOptions = useMemo(() => ({ url }), [url]) This will work but not practical
  // const {data } = useFetch(myOptions)
  const count = useStopwatch();
  const { data } = useFetchPrevious({ url, onSuccess: () => console.log("success") });

  console.log("App rendering");

  return (
    <div className="App">
      <div>Hello</div>
      <div>Count: {count}</div>
      <div>{JSON.stringify(data)}</div>
      <div>
        <button onClick={() => setUrl("/jack.json")}>Jack</button>
        <button onClick={() => setUrl("/sally.json")}>Sally</button>
      </div>
    </div>
  );
}

export default App;
