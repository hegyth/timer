import { useAppSelector } from "../../redux/hooks";

export default function TimerMessage() {
  const timer = useAppSelector((state) => state.timer);
  return <div>{timer.message}</div>;
}
