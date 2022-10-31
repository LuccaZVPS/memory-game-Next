import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;
