import styled from "styled-components";

export const description = styled.div`
  position: absolute;
  transition: 0.3s;
  bottom: 46%;
  background-color: ${(props) => props.theme.colors.primary};
  width: 100px;
  height: 50px;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: calc(50% - 50px);
  opacity: 0;
  @media (max-width: 1200px) {
    display: none;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .btnOptionsContainer {
    height: 100%;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    .btnContainer {
      position: relative;
      :hover {
        ${description} {
          bottom: -70px;
          opacity: 1;
        }
      }
      button {
        width: 100px;
        height: 100px;
        background-color: ${(props) => props.theme.colors.primary};
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          font-size: 2.5rem;
          color: ${(props) => props.theme.colors.secundary};
        }
      }
    }
  }
`;
export const triangle = styled.div`
  border: 10px solid transparent;
  border-bottom: solid ${(props) => props.theme.colors.primary} 10px;
  width: 0;
  position: absolute;
  top: -20px;
  left: calc(50% - 10px);
`;
