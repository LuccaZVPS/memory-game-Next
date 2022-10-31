import styled from "styled-components";

export const Container = styled.div`
  margin-top: 3vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};

  gap: 30px;
  .play-again {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    font-size: 1.2rem;

    svg {
      font-size: 4rem;
      color: ${({ theme }) => theme.colors.secundary};
      background-color: ${({ theme }) => theme.colors.primary};

      border-radius: 50%;
      padding: 3%;
      cursor: pointer;
    }
    @media (max-width: 500px) {
      font-size: 1rem;
      svg {
        font-size: 3.5rem;
      }
    }
  }
  .score {
    font-size: 1.1rem;
    @media (max-width: 500px) {
      font-size: 1rem;
    }
  }
`;
export const ModalContainer = styled.div`
  .close {
    display: none;
  }
`;
