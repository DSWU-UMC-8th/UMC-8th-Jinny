import { useEffect, useState } from "react";

export default function Parent() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <h1>useEffect</h1>
      <button onClick={() => setVisible(!visible)}>{visible ? "숨기기" : "보이기"}</button>
      {visible && <Child />}
    </>
  );
}

function Child() {
  useEffect(() => {
    let i = 0;
    const counterInterval = setInterval(() => {
      console.log("Numbr => " + i);
      i++;
    }, 1000);

    console.log("Child rendered");

    return () => {
      console.log("unmount");
      clearInterval(counterInterval);
    };
  }, []);

  return <div className="mt-20 text-4xl">Child</div>;
}
