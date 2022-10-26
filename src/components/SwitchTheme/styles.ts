import styled from "styled-components";
type props = {
  display: boolean | undefined;
};
export const container = styled.div`
  position: relative;
  width: 50px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.insideCard};
  border-radius: 50px;
  display: flex;
  align-items: center;
  left: 0;
`;

export const sun = styled.div`
  > svg {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.secundary};
  }
`;
export const moon = styled.div`
  > svg {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.secundary};
  }
`;
export const ball = styled.div<props>`
  width: 18px;
  height: 18px;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 50%;
  position: absolute;
  top: calc(50% - 9px);
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  left: ${({ display }) => (display ? "3px" : "30px")};

  ${sun} {
    display: ${({ display }) => (display ? "flex" : "none")};
  }
  ${moon} {
    display: ${({ display }) => (display ? "none" : "flex")};
  }
`;
