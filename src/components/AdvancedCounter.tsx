import { useEffect, useState } from "react";

export default function Counter() {
  const [step, setStep] = useState<number>(1);

  //========LOCAL STORAGE KEY==========

  const savedCountStorageKey = "savedCount";

  const [count, setCount] = useState<number>(() => {
    const savedCountString = localStorage.getItem(savedCountStorageKey);

    if (savedCountString === null) {
      return 0;
    }

    const savedCountNumber = Number(savedCountString);

    if (Number.isNaN(savedCountNumber)) {
      return 0;
    }

    return savedCountNumber;
  });

  const [history, setHistory] = useState<number[]>(() => {
    return [count];
  });

  //=========INCREMENT COUNT AND UPDATE HISTORY========

  function incrementCount() {
    setCount((prev: number): number => {
      const newCount = prev + step;

      setHistory((prev) => {
        return [...prev, newCount];
      });

      return newCount;
    });
  }

  //==========DECREMENT COUNT AND UPDATE HISTORY==========

  function decrementCount() {
    setCount((prev: number): number => {
      const newCount = prev - step;

      setHistory((prev) => {
        return [...prev, newCount];
      });

      return newCount;
    });
  }

  //=========RESET COUNT AND RESET HISTORY=========

  function resetCounter() {
    const resetCount = 0;

    setCount(resetCount);
    setHistory([resetCount]);
    localStorage.removeItem(savedCountStorageKey);
  }

  //==============HANDLE STEP===================

  function handleStep(event: React.ChangeEvent<HTMLInputElement>) {
    const newStepValue = Number(event.target.value);

    if (newStepValue >= 1) {
      setStep(newStepValue);
    }
  }
  //=============LOCAL STORAGE=================

  useEffect(() => {
    const saveTimerId = window.setTimeout(() => {
      localStorage.setItem(savedCountStorageKey, String(count));
    }, 300);

    return () => {
      window.clearTimeout(saveTimerId);
    };
  }, [count]);

  //=============KEYBOARD EVENT LISTENERS===========

  useEffect(() => {
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowUp") {
      setCount((previousCountValue) => {
        const newCountValue = previousCountValue + step;

        setHistory((previousHistoryValues) => {
          return [...previousHistoryValues, newCountValue];
        });

        return newCountValue;
      });
    }

    if (event.key === "ArrowDown") {
      setCount((previousCountValue) => {
        const newCountValue = previousCountValue - step;

        setHistory((previousHistoryValues) => {
          return [...previousHistoryValues, newCountValue];
        });

        return newCountValue;
      });
    }
  }

  document.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
}, [step]);


  //==============RETURN UI====================

  return (
    <div className="container">
      <h3>Counter</h3>
      <br />
      <h1>Current Count: {count}</h1>
      <div className="btns">
        <button onClick={decrementCount}>Decrement</button>
        <button onClick={incrementCount}>Increment</button>
        <button onClick={resetCounter} className="btn-red">
          Reset
        </button>
      </div>
      <div>
        <label htmlFor="step">Step Value: </label>
        <input type="number" min={1} value={step} onChange={handleStep} />
      </div>
      <h3>Count History:</h3>
      <p className="his-para">{history.join(", ")}</p>
    </div>
  );
}
