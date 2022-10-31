import styled from "styled-components";
type props = {
  display: boolean;
};
export const Container = styled.div<props>`
  width: 1200px;
  display: flex;
  position: absolute;
  top: 0;
  left: calc(50% - 600px);
  justify-content: space-between;
  padding-top: 25px;
  align-items: center;
  transition: 0.2s;
  z-index: 1;
  @media (max-width: 1200px) {
    width: 100vw;
    left: 0;
    padding-left: 45px;
    padding-right: 45px;
  }

  .menuBurger {
    top: ${({ display }) => (display ? "15px" : "auto")};
    position: absolute;
    display: none;
    right: 15px;
    svg {
      color: ${({ theme }) => theme.colors.secundary};
      font-size: 2rem;
      cursor: pointer;
    }
    @media (max-width: 700px) {
      display: flex;
    }
  }

  @media (max-width: 700px) {
    height: ${({ display }) => (display ? "100vh" : "10vh")};
    flex-direction: ${({ display }) => (display ? "column" : "flex")};
    justify-content: ${({ display }) => (display ? "center" : "space-between")};
    background-color: ${({ display, theme }) =>
      display ? `${theme.colors.card2}` : "transparent"};
    padding-top: 5px;
    padding: 0;
  }
`;
export const btnContainer = styled.div<props>`
  display: flex;
  flex-direction: ${({ display }) => (display ? "column" : "row")};

  gap: 30px;
  button {
    cursor: pointer;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.secundary};
    transition: 0.2s;
  }
  @media (max-width: 700px) {
    display: ${({ display }) => (display ? "flex" : "none")};
  }
`;
export const SwitchContainer = styled.div<props>`
  position: ${({ display }) => (display ? "absolute" : "flex")};
  top: 15px;
  left: 10px;
  margin-left: 10px;
`;
