import styled from "styled-components";
interface props {
  display: boolean;
}
export const container = styled.div<props>`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  justify-content: space-evenly;

  .menu {
    position: relative;
    width: 80%;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    .option {
      width: 140px;
      height: 80px;
      font-size: 1.6rem;
      display: flex;
      cursor: ${({ display }) => (display ? "not-allowed" : "pointer")};
      background-color: ${({ theme }) => theme.colors.primary};
      align-items: center;
      justify-content: center;
      border-radius: 7px;
      svg {
        font-size: 2rem;
        color: ${({ theme }) => theme.colors.secundary};
      }

      @media (max-width: 700px) {
        svg {
          font-size: 2.2rem;
        }
        width: 80px;
        height: 60px;
      }
      @media (max-width: 350px) {
        svg {
          font-size: 2.2rem;
        }
        width: 60px;
        height: 50px;
      }
    }
    .back {
      cursor: pointer;
      position: absolute;
      left: 0;
      color: ${({ theme }) => theme.colors.secundary};

      svg {
        font-size: 2.5rem;
        @media (max-width: 700px) {
          font-size: 2rem;
        }
        @media (max-width: 400px) {
          font-size: 1.7rem;
        }
      }
    }
    @media (max-width: 700px) {
      width: 99%;
      gap: 5px;
    }
  }

  .card-container {
    width: 80%;
    height: 80vh;
    display: grid;
    column-gap: 20px;
    row-gap: 20px;
    grid-template-columns: repeat(4, 1fr);

    @media (max-width: 800px) {
      width: 95%;
      column-gap: 10px;
      row-gap: 10px;
    }
  }
  @media (max-width: 500px) {
    justify-content: start;
    gap: 15px;
    padding-top: 10px;
  }
`;
