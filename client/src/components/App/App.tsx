import { FormEvent, useCallback, useMemo } from "react";
import { useTimer } from "../../redux/hooks";
import TimerMessage from "../Timer/TimerMessage";
import "./App.css";

export default function App() {
  const {
    resumeTimer,
    stopTimer,
    resetTimer,
    startTimer,
    isTimerVisible,
    time,
    isStoped,
  } = useTimer();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const startTime = Object.fromEntries(new FormData(e.currentTarget));
      const [hour, min] = startTime.time
        .toString()
        .split(":")
        .map((el) => Number(el));

      if (hour || min) {
        startTimer({ hour, min });
      }
    },
    [startTimer]
  );

  const form = useMemo(() => {
    return (
      <form onSubmit={handleSubmit}>
        <input name="time" type="time" />
        <button type="submit">Start</button>
      </form>
    );
  }, [handleSubmit]);

  const timer = useMemo(() => {
    return (
      <>
        <div>
          <h1>{`${time.hour} : ${time?.min} : ${time?.sec}`}</h1>
          {isStoped ? (
            <button type="button" onClick={resumeTimer}>
              Resume
            </button>
          ) : (
            <button type="button" onClick={stopTimer}>
              Stop
            </button>
          )}
          <button type="button" onClick={resetTimer}>
            Reset
          </button>
        </div>
        <TimerMessage />
      </>
    );
  }, [resetTimer, resumeTimer, stopTimer, time]);

  return isTimerVisible ? timer : form;
}
