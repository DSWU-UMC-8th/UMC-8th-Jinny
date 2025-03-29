import "./App.css";
import { useState } from "react";

function App() {
  // const [count, setCount] = useState(0);

  const [person, setPerson] = useState({
    name: "김진효",
    age: 23,
    nickname: "jinny",
    city: "",
  });

  const newPerson = { ...person }; // 얕은 복사
  newPerson.nickname = "jinny2";
  console.log(person.nickname); // jinny

  // const newPersonDeep = JSON.parse(JSON.stringify(person)); // 깊은 복사

  // city 값을 새로 추가하여 업데이트하는 함수
  const updateCity = () => {
    setPerson((prevPerson) => ({
      ...prevPerson, // 이전 person 객체의 복사본 생성
      city: "서울", // city 값 추가 or 업데이트
    }));
  };

  // age 값을 1씩 증가시키는 함수
  const increaseAge = () => {
    setPerson((prevPerson) => ({
      ...prevPerson, // 이전 person 객체의 복사본 생성
      age: prevPerson.age + 1, // age 값 1 증가
    }));
  };

  // const handleIncreaseNumber = () => {
  //   setCount((prev) => prev + 1);
  //   setCount((prev) => prev + 1);
  //   setCount((prev) => prev + 1);
  //   setCount((prev) => prev + 1);
  //   setCount((prev) => prev + 1);
  //   setCount((prev) => prev + 1); // 6씩 증가
  // };

  return (
    <>
      <h1>이름: {person.name}</h1>
      <h1>나이: {person.age}</h1>
      <h1>닉네임: {person.nickname}</h1>
      {person.city && <h4>도시: {person.city}</h4>}
      <button onClick={updateCity}>도시 추가</button>
      <button onClick={increaseAge}>나이 증가</button>
    </>
  );
}

export default App;
