import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  const [step, setStep] = useState<number>(1);
  const [history, setHistory] = useState<number[]>([]);

  function incrementCount() {
    setCount((prev: number): number => {
      return prev + step;
    });
  }

  function decrementCount() {
    setCount((prev: number): number => {
      return prev - step;
    });
  }

  function resetCounter() {
    setCount(0);
    setHistory([]);
  }

  function handleStep(event: React.ChangeEvent<HTMLInputElement>) {
    const newStepValue = Number(event.target.value);

    if (newStepValue >= 1) {
      setStep(newStepValue);
    }
  }

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
        <label htmlFor="step">Step Value:</label>
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
