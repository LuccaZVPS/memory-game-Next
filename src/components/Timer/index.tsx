import { ReactNode } from "react";
import ConvertTImer from "../../services/convertTimer";

import { Container } from "./styles";
import { memo } from "react";

interface TimerProps {
  time: number;
}

function Timer({ time }: TimerProps) {
  return <Container>{ConvertTImer(time)}</Container>;
}
export default memo(Timer);
