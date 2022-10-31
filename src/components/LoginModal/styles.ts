import styled from "styled-components";

export const Container = styled.div`
  .btnLogin {
    border: none;
    width: 140px;
    height: 2.5rem;
    background-color: transparent;
    border-radius: 4px;
    box-shadow: 0 0 2px ${({ theme }) => theme.colors.secundary};
    font-weight: 300;
  }
`;
export const Mail = styled.div`
  svg {
    color: ${({ theme }) => theme.colors.secundary};
  }
`;
