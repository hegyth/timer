export type Time = {
  hour: number;
  min: number;
  sec: number;
};

export type Timer = {
  time: Time;
  interval: number;
  message: string;
  visible: boolean;
  isStoped: boolean;
};

export type SetMessagePayload = string;
export type StopResetTimerPayload = number;
export type SetVisiblePayload = boolean;