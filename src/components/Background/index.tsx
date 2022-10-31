import { ReactNode } from "react";

import { Container } from "./styles";

interface BackgroundProps {
  children: ReactNode;
}

export function Background({ children }: BackgroundProps) {
  return <Container>{children}</Container>;
}
