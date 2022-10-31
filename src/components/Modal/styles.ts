import styled from "styled-components";

export const Container = styled.div`
  @keyframes hideBackground {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation: hideBackground 0.2s linear;

  position: absolute;
  top: 0;
  width: 100vw;
  min-height: 100vh;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;
export const Content = styled.div`
    @keyframes modalFall {
      0% {
        opacity: 0;
        transform: scale(0.7);
      }
      50% {
        opacity: 0.7;
      }
      80% {
        opacity: 0.8;
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
    animation: modalFall 0.2s linear;
    position: relative;
    width: 500px;
    box-shadow: 0 0 3px black;
    border-radius: 10px;
    background-color: ${(props) => props.theme.colors.insideCard};
    display: flex;
    padding: 40px 20px 40px 20px;
    flex-direction: column;
    align-items: center;
    h2 {
      font-size: 1.5rem;
      color: ${(props) => props.theme.colors.primary};
      text-shadow: 0 0 1px black;
    }

    .close {
      position: absolute;
      right: 5px;
      top: 5px;
      cursor: pointer;
      svg {
        font-size: 1.5rem;
        color: ${(props) => props.theme.colors.primary};
      }
    }
  }
  @media (max-width: 500px) {
    .content {
      width: 98vw;
      padding: 40px 10px 40px 10px;
    }
  
`;
