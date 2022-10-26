import styled from "styled-components";

export const Container = styled.div`
  width: 1200px;
  display: flex;
  position: absolute;
  left: calc(50% - 600px);
  top: 0;
  padding-top: 25px;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1200px) {
    width: 100vw;
    left: 0;
    padding-left: 20px;
    padding-right: 20px;
  }

  .user-info-container {
    display: flex;
    align-items: center;
    gap: 20px;
    svg {
      font-size: 1.8rem;
      cursor: pointer;
      color: ${({ theme }) => theme.colors.secundary};
    }
    .name {
      padding: 15px 25px 15px 25px;
      background-color: ${({ theme }) => theme.colors.primary};
      border-radius: 10px;
      color: ${({ theme }) => theme.colors.secundary};
      @media (max-width: 350px) {
        padding: 10px 20px 10px 20px;
      }
    }
    @media (max-width: 500px) {
      gap: 7px;
    }
  }
  .settings {
    position: relative;
  }
`;
export const hiddenSettings = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.primary};
  top: 50px;
  text-align: center;
  padding: 10px 0 10px 0;
  color: ${({ theme }) => theme.colors.secundary};
  border-radius: 7px;
  width: 100px;
  left: calc(50% - 50px);
  cursor: pointer;
  :hover {
    color: red;
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
