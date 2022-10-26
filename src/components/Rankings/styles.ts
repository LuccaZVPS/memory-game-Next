import styled from "styled-components";
interface direction {
  direction: boolean;
}
export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2vh;
  table {
    color: ${(props) => props.theme.colors.secundary};
    width: 100%;
    border-collapse: collapse;
    @media (max-width: 600px) {
      font-size: 0.8rem;
    }
    thead tr {
      background-color: ${(props) => props.theme.colors.primary};
      display: flex;
      padding: 1vh 1vw 1vh 1vw;
      width: 100%;
      border-bottom: 1px solid black;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      color: ${(props) => props.theme.colors.secundary};
    }
    thead tr td {
      width: 33%;
      text-align: left;
      text-align: center;
    }
    tbody tr td {
      width: 33%;
      text-align: left;
      text-align: center;
      @media (max-width: 900px) {
        width: 33%;
      }
    }
    tbody tr {
      background-color: ${(props) => props.theme.colors.primary};
      display: flex;
      gap: 1vw;
      padding: 1vh 1vw 1vh 1vw;
      width: 100%;
    }
  }
`;
export const pagination = styled.div`
  margin-top: 2vh;
  display: flex;
  align-items: center;
  font-size: 1.15rem;
  float: right;
`;

export const triangle = styled.span<direction>`
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
  border: solid 10px transparent;
  ${({ direction, theme }) =>
    direction
      ? `border-right:10px solid ${theme.colors.primary} `
      : `border-left:10px solid ${theme.colors.primary}`};
`;
