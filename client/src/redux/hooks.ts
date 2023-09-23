import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import {
  reWriteTime,
  setIntervalId,
  setTime,
  resetTimer as resetTimerAction,
  stopTimer as stopTimerAction,
} from "./timerSlice";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useTimer = () => {
  const {
    interval,
    time,
    visible: isTimerVisible,
    isStoped
  } = useAppSelector((state) => state.timer);
  const dispatch = useAppDispatch();

  const stopTimer = () => dispatch(stopTimerAction(interval));
  const resetTimer = () => dispatch(resetTimerAction(interval));
  const resumeTimer = () => {
      const id = setInterval(() => {
        dispatch(setIntervalId(id));
        dispatch(reWriteTime(id));
      }, 1000);
  };

  const startTimer = ({ hour, min }: { hour: number; min: number }) => {
    dispatch(
      setTime({
        hour: hour,
        min: min,
        sec: 0,
      })
    );

    const id = setInterval(() => {
      dispatch(setIntervalId(id));
      dispatch(reWriteTime(id));
    }, 1000);
  };

  return {
    isStoped,
    isTimerVisible,
    time,
    stopTimer,
    resetTimer,
    resumeTimer,
    startTimer,
  };
};
