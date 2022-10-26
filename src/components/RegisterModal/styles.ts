import styled from "styled-components";

export const Container = styled.div`
  .btnRegister {
    border: none;
    width: 140px;
    height: 2.5rem;
    background-color: ${({ theme }) => theme.colors.insideCard};
    border-radius: 4px;
    box-shadow: 0 0 2px black;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 300;
  }
`;
export const Mail = styled.div`
  svg {
    color: ${({ theme }) => theme.colors.secundary};
  }
`;
