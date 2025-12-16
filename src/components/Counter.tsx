import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  const [step, setStep] = useState<number>(1);
  const [history, setHistory] = useState<number[]>([0]);


//==============INCREMENT COUNT AND UPDATE HISTORY===================


  function incrementCount() {
    setCount((prev: number): number => {
      const newCount = prev + step;

      setHistory((prev) => {
        return [...prev, newCount];
      })

      return newCount;
    });
  }


//==============DECREMENT COUNT AND UPDATE HISTORY===================


  function decrementCount() {
    setCount((prev: number): number => {
      const newCount = prev - step;

      setHistory((prev) => {
        return [...prev, newCount];
      })

      return newCount;
    });
  }


//==============RESET COUNT AND RESET HISTORY========================


  function resetCounter() {

    const resetCount = 0;

    setCount(resetCount);
    setHistory([resetCount]);
  }


//==============HANDLE STEP===================


  function handleStep(event: React.ChangeEvent<HTMLInputElement>) {
    const newStepValue = Number(event.target.value);

    if (newStepValue >= 1) {
      setStep(newStepValue);
    }
  }


//==============RETURN UI====================

  return (
    <div>
      <h3>Counter</h3>
      <br />
      <h1>Current Count: {count}</h1>
      <div className="btns">
            <button onClick={decrementCount}>Decrement</button>
            <button onClick={incrementCount}>Increment</button>
            <button onClick={resetCounter}>Reset</button>
      </div>
      <div>
        <label htmlFor="step">Step Value: </label>
        <input type="number" 
        min={1}
        value={step} 
        onChange={handleStep}/>
      </div>
      <h3>Count History:</h3>
      <p>{ history.join(", ") }</p>
    </div> 
  );
}
