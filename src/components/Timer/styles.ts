import styled from "styled-components";

export const Container = styled.div`
  width: 140px;
  height: 80px;
  font-size: 1.6rem;
  display: flex;

  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  color: ${({ theme }) => theme.colors.secundary};

  @media (max-width: 700px) {
    width: 80px;
    height: 60px;
    font-size: 1.4rem;
  }
  @media (max-width: 350px) {
    width: 60px;
    height: 50px;
  }
`;
