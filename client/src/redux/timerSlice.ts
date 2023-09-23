import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  SetMessagePayload,
  SetVisiblePayload,
  StopResetTimerPayload,
  Time,
  Timer,
} from "./types/timerTypes";

const initialState: Timer = {
  time: {
    hour: 0,
    min: 0,
    sec: 0,
  },
  message: "",
  interval: 0,
  visible: false,
  isStoped: true,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTime: (state, action: PayloadAction<Time>) => {
      state.time = action.payload;
      state.visible = true;
      state.isStoped = false;
    },

    setMessage: (state, action: PayloadAction<SetMessagePayload>) => {
      state.message = action.payload;
    },

    stopTimer: (state, action: PayloadAction<StopResetTimerPayload>) => {
      state.isStoped = true;
      clearInterval(action.payload);
    },

    resetTimer: (state, action: PayloadAction<StopResetTimerPayload>) => {
      clearInterval(action.payload);
      return initialState;
    },

    setIntervalId: (state, action: PayloadAction<number>) => {
      state.interval = action.payload;
      state.visible = true;
    },

    setVisible: (state, action: PayloadAction<SetVisiblePayload>) => {
      state.visible = action.payload;
    },

    reWriteTime: (state, action: PayloadAction<StopResetTimerPayload>) => {
      state.isStoped = false
      if (
        state.time.hour === 0 &&
        state.time.min === 0 &&
        state.time.sec === 0
      ) {
        state.time = { hour: 0, min: 0, sec: 0 };
        clearInterval(action.payload);
        return;
      }
      state.time.sec -= 1;
      if (state.time.min !== 0 && state.time.sec === -1) {
        state.time.sec = 59;
        state.time.min -= 1;
      }
      if (
        state.time.hour !== 0 &&
        state.time.min === 0 &&
        state.time.sec === -1
      ) {
        state.time.min = 59;
        state.time.sec = 59;
        state.time.hour -= 1;
      }
      if (state.time.sec % 3 === 0) {
        state.message = `last time: ${state.time.hour}h. ${state.time.min}m. and ${state.time.sec}s`;
      }
    },
  },
});

export const {
  setTime,
  setIntervalId,
  setVisible,
  resetTimer,
  stopTimer,
  setMessage,
  reWriteTime,
} = timerSlice.actions;

export default timerSlice.reducer;
