import { useEffect, useState } from "react";

export default function Counter() {
    const [count, setCount] = useState<number>(0);
    const [step, setStep] = useState<number>(1);
    const [history, setHistory] = useState<number[]>([])


    function incrementCount() {
        setCount((prev: number): number => {
            return prev + step
        })
    }

    function decrementCount() {
        setCount((prev: number): number => {
            return prev - step
        })
    }

    function resetCounter() {
        setCount(0);
        setHistory([])
    }

}