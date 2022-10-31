import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  .mode {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 40px;
    gap: 20px;
    button {
      color: ${(props) => props.theme.colors.secundary};
      border-radius: 7px;
      width: 100%;
      height: 40px;
      background-color: ${(props) => props.theme.colors.primary};
      box-shadow: 0 0 2px black;
      transition: 0.2s;
      :hover {
        transform: scale(1.02);
      }
    }
  }
`;
